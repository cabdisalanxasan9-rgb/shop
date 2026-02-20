const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('validator');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] 
        : ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/veggiefresh', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((err) => {
    console.log('MongoDB connection failed, using in-memory storage:', err.message);
    // Continue without MongoDB for demo purposes
});

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    avatar: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

// In-memory storage fallback
let inMemoryUsers = [];

// Helper function to check if MongoDB is connected
const isMongoConnected = () => {
    return mongoose.connection.readyState === 1;
};

// Clear in-memory storage (for development)
const clearInMemoryStorage = () => {
    inMemoryUsers = [];
    console.log('In-memory storage cleared');
};

// Auto-clear in-memory storage every 5 minutes in development
if (process.env.NODE_ENV === 'development') {
    setInterval(clearInMemoryStorage, 5 * 60 * 1000);
}

// JWT generation
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

// Validation middleware
const validateInput = (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (req.path === '/api/auth/register') {
        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Name is required' });
        }
        if (name.length < 2 || name.length > 50) {
            return res.status(400).json({ error: 'Name must be between 2 and 50 characters' });
        }
    }
    
    if (!email || !email.trim()) {
        return res.status(400).json({ error: 'Email is required' });
    }
    
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Please provide a valid email' });
    }
    
    if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    next();
};

// Authentication middleware
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid token.' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

// Routes
// Register
app.post('/api/auth/register', validateInput, async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        
        if (isMongoConnected()) {
            // Use MongoDB
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }
            
            const user = new User({
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password,
                phone: phone ? phone.trim() : '',
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
            });
            
            await user.save();
            
            const token = generateToken(user._id);
            const userResponse = user.toObject();
            delete userResponse.password;
            
            res.status(201).json({
                message: 'User registered successfully',
                user: userResponse,
                token
            });
        } else {
            // Use in-memory storage
            console.log('Using in-memory storage for registration');
            console.log('Current users:', inMemoryUsers.map(u => ({ email: u.email, name: u.name })));
            
            const existingUser = inMemoryUsers.find(u => u.email === email.toLowerCase());
            if (existingUser) {
                console.log('User already exists:', existingUser.email);
                return res.status(400).json({ error: 'User with this email already exists' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = {
                id: Date.now().toString(),
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                phone: phone ? phone.trim() : '',
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
                createdAt: new Date().toISOString()
            };
            
            inMemoryUsers.push(newUser);
            console.log('New user added:', { email: newUser.email, name: newUser.name });
            
            const token = generateToken(newUser.id);
            const userResponse = { ...newUser };
            delete userResponse.password;
            
            res.status(201).json({
                message: 'User registered successfully',
                user: userResponse,
                token
            });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// Login
app.post('/api/auth/login', validateInput, async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (isMongoConnected()) {
            // Use MongoDB
            const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            
            const token = generateToken(user._id);
            const userResponse = user.toObject();
            delete userResponse.password;
            
            res.json({
                message: 'Login successful',
                user: userResponse,
                token
            });
        } else {
            // Use in-memory storage
            const user = inMemoryUsers.find(u => u.email === email.toLowerCase());
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            
            const token = generateToken(user.id);
            const userResponse = { ...user };
            delete userResponse.password;
            
            res.json({
                message: 'Login successful',
                user: userResponse,
                token
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Get current user
app.get('/api/auth/me', authenticate, async (req, res) => {
    res.json(req.user);
});

// Debug route to clear in-memory storage (development only)
if (process.env.NODE_ENV === 'development') {
    app.post('/api/debug/clear-users', (req, res) => {
        clearInMemoryStorage();
        res.json({ message: 'In-memory storage cleared' });
    });
}

// Logout (client-side token removal)
app.post('/api/auth/logout', authenticate, (req, res) => {
    res.json({ message: 'Logout successful' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
