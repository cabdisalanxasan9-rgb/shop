import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB, User } from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

        await connectDB();
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 401 });
        }

        return NextResponse.json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            createdAt: user.createdAt,
        });

    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}

export async function POST(req: NextRequest) {
    // Logout is handled client-side (token removal)
    return NextResponse.json({ message: 'Logout successful' });
}