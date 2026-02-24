import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sql, initDB } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'jannofresh-secret-key-2024';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Init table if needed
        await initDB();

        // Find user
        const result = await sql`
            SELECT id, name, email, password, phone, avatar, created_at
            FROM users
            WHERE email = ${email.toLowerCase()}
        `;

        if (result.length === 0) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const user = result[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: String(user.id),
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                createdAt: user.created_at,
            },
            token,
        });

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Server error during login', detail: error?.message }, { status: 500 });
    }
}