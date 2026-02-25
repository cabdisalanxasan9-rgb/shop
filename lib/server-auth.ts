import mongoose, { Schema, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

type MongoCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

type InMemoryAuthUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
    createdAt: Date;
};

type AuthUserRecord = {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    createdAt: Date;
    password?: string;
};

declare global {
    var mongooseCache: MongoCache | undefined;
    var authMemoryUsers: InMemoryAuthUser[] | undefined;
}

const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

const cache: MongoCache = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = cache;

function getMemoryUsers() {
    if (!global.authMemoryUsers) {
        global.authMemoryUsers = [];
    }
    return global.authMemoryUsers;
}

function normalizeAuthUser(user: any, includePassword = false): AuthUserRecord {
    const userObject = user?.toObject ? user.toObject() : user;
    return {
        id: userObject._id?.toString() || userObject.id,
        name: userObject.name,
        email: userObject.email,
        phone: userObject.phone || '',
        avatar: userObject.avatar || '',
        createdAt: userObject.createdAt || new Date(),
        ...(includePassword ? { password: userObject.password } : {}),
    };
}

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

export function getAuthStorageMode(): 'mongo' | 'memory' {
    return mongoUri ? 'mongo' : 'memory';
}

export async function findAuthUserByEmail(email: string, includePassword = false): Promise<AuthUserRecord | null> {
    const normalizedEmail = email.toLowerCase().trim();

    if (mongoUri) {
        try {
            await connectToDatabase();
            const query = User.findOne({ email: normalizedEmail });
            if (includePassword) {
                query.select('+password name email phone avatar createdAt');
            } else {
                query.select('name email phone avatar createdAt');
            }
            const user = await query;
            if (!user) return null;
            return normalizeAuthUser(user, includePassword);
        } catch (error) {
            if (!canFallbackToMemory(error)) {
                throw error;
            }
        }
    }

    const memoryUser = getMemoryUsers().find((item) => item.email === normalizedEmail);
    if (!memoryUser) return null;

    return {
        id: memoryUser.id,
        name: memoryUser.name,
        email: memoryUser.email,
        phone: memoryUser.phone,
        avatar: memoryUser.avatar,
        createdAt: memoryUser.createdAt,
        ...(includePassword ? { password: memoryUser.password } : {}),
    };
}

export async function findAuthUserById(id: string): Promise<AuthUserRecord | null> {
    if (mongoUri) {
        try {
            await connectToDatabase();
            const user = await User.findById(id).select('name email phone avatar createdAt');
            if (!user) return null;
            return normalizeAuthUser(user, false);
        } catch (error) {
            if (!canFallbackToMemory(error)) {
                throw error;
            }
        }
    }

    const memoryUser = getMemoryUsers().find((item) => item.id === id);
    if (!memoryUser) return null;

    return {
        id: memoryUser.id,
        name: memoryUser.name,
        email: memoryUser.email,
        phone: memoryUser.phone,
        avatar: memoryUser.avatar,
        createdAt: memoryUser.createdAt,
    };
}

export async function createAuthUser(input: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
}): Promise<AuthUserRecord> {
    const normalizedEmail = input.email.toLowerCase().trim();

    if (mongoUri) {
        try {
            await connectToDatabase();
            const user = await User.create({
                name: input.name.trim(),
                email: normalizedEmail,
                password: input.password,
                phone: (input.phone || '').trim(),
                avatar: input.avatar || '',
            });
            return normalizeAuthUser(user, false);
        } catch (error) {
            if (!canFallbackToMemory(error)) {
                throw error;
            }
        }
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const memoryUser: InMemoryAuthUser = {
        id: `mem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        name: input.name.trim(),
        email: normalizedEmail,
        password: passwordHash,
        phone: (input.phone || '').trim(),
        avatar: input.avatar || '',
        createdAt: new Date(),
    };

    getMemoryUsers().push(memoryUser);

    return {
        id: memoryUser.id,
        name: memoryUser.name,
        email: memoryUser.email,
        phone: memoryUser.phone,
        avatar: memoryUser.avatar,
        createdAt: memoryUser.createdAt,
    };
}

export function generateToken(id: string) {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: '7d'
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

export function mapAuthError(error: any, fallback: string) {
    const rawMessage = typeof error?.message === 'string' ? error.message : '';
    const isProduction = process.env.NODE_ENV === 'production';

    if (error?.code === 11000) {
        return { status: 400, error: 'User with this email already exists' };
    }

    if (error?.name === 'ValidationError') {
        const validationMessage = (Object.values(error.errors || {}) as any[])[0]?.message;
        return { status: 400, error: validationMessage || 'Invalid input data' };
    }

    if (rawMessage.includes('MONGODB_URI is not set')) {
        return {
            status: 500,
            error: 'Database is not configured for persistent mode. Add MONGODB_URI to enable persistent accounts.'
        };
    }

    if (error?.name === 'MongoParseError' || /Invalid scheme|Invalid connection string|URI malformed/i.test(rawMessage)) {
        return {
            status: 500,
            error: 'Invalid MONGODB_URI format. Verify the MongoDB connection string in Vercel environment variables.'
        };
    }

    if (/auth failed|Authentication failed|bad auth|password|SCRAM/i.test(rawMessage)) {
        return {
            status: 503,
            error: 'MongoDB authentication failed. Check MongoDB username/password in MONGODB_URI.'
        };
    }

    if (/querySrv ENOTFOUND|getaddrinfo ENOTFOUND|DNS/i.test(rawMessage)) {
        return {
            status: 503,
            error: 'MongoDB host not found. Check cluster hostname in MONGODB_URI.'
        };
    }

    if (
        error?.name === 'MongoServerSelectionError' ||
        /ECONNREFUSED|ENOTFOUND|timed out|failed to connect/i.test(rawMessage)
    ) {
        return {
            status: 503,
            error: 'Database connection failed. Check MONGODB_URI and MongoDB Atlas Network Access.'
        };
    }

    if (!isProduction && rawMessage) {
        return {
            status: 500,
            error: `${fallback}: ${rawMessage}`
        };
    }

    return { status: 500, error: fallback };
}

function canFallbackToMemory(error: any) {
    const rawMessage = typeof error?.message === 'string' ? error.message : '';
    if (!rawMessage) return false;

    return (
        error?.name === 'MongoServerSelectionError' ||
        error?.name === 'MongoParseError' ||
        /MONGODB_URI is not set/i.test(rawMessage) ||
        /Invalid scheme|Invalid connection string|URI malformed/i.test(rawMessage) ||
        /auth failed|Authentication failed|bad auth|password|SCRAM/i.test(rawMessage) ||
        /querySrv ENOTFOUND|getaddrinfo ENOTFOUND|DNS/i.test(rawMessage) ||
        /ECONNREFUSED|timed out|failed to connect/i.test(rawMessage)
    );
}