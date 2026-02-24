import mongoose, { Schema, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

type MongoCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

declare global {
    var mongooseCache: MongoCache | undefined;
}

const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

const cache: MongoCache = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = cache;

const userSchema = new Schema({
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
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export const User = models.User || model('User', userSchema);

export async function connectToDatabase() {
    if (!mongoUri) {
        throw new Error('MONGODB_URI is not set');
    }

    if (cache.conn) return cache.conn;

    if (!cache.promise) {
        cache.promise = mongoose.connect(mongoUri, {
            bufferCommands: false,
        });
    }

    cache.conn = await cache.promise;
    return cache.conn;
}

export function generateToken(id: string) {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
}

export function verifyToken(token: string): { id: string } {
    return jwt.verify(token, jwtSecret) as { id: string };
}

export async function comparePassword(plain: string, hashed: string) {
    return bcrypt.compare(plain, hashed);
}

export function validateRegisterInput(name: string, email: string, password: string, phone?: string) {
    if (!name || !name.trim()) return 'Name is required';
    if (name.trim().length < 2 || name.trim().length > 50) return 'Name must be between 2 and 50 characters';
    if (!email || !email.trim()) return 'Email is required';
    if (!validator.isEmail(email)) return 'Please provide a valid email';
    if (!password || password.length < 6) return 'Password must be at least 6 characters';
    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) return 'Please enter a valid phone number';
    return null;
}

export function validateLoginInput(email: string, password: string) {
    if (!email || !email.trim()) return 'Email is required';
    if (!validator.isEmail(email)) return 'Please provide a valid email';
    if (!password || password.length < 6) return 'Password must be at least 6 characters';
    return null;
}

export function sanitizeUser(user: any) {
    const userObject = user.toObject ? user.toObject() : user;
    return {
        id: userObject._id?.toString() || userObject.id,
        name: userObject.name,
        email: userObject.email,
        phone: userObject.phone || '',
        avatar: userObject.avatar || '',
        createdAt: userObject.createdAt
    };
}

export function getBearerToken(authHeader: string | null) {
    if (!authHeader?.startsWith('Bearer ')) return null;
    return authHeader.slice(7);
}