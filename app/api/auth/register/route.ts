import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sql, initDB } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'jannofresh-secret-key-2024';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { name, email, password, phone } = await req.json();

        // Validate inputs
        if (!name || name.trim().length < 2) {
            return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 });
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Please provide a valid email' }, { status: 400 });
        }
        if (!password || password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
        }

        // Init table if needed
        await initDB();

        // Check if user exists
        const existing = await sql`SELECT id FROM users WHERE email = ${email.toLowerCase()}`;
        if (existing.length > 0) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4ade80&color=fff`;

        // Insert user
        const result = await sql`
            INSERT INTO users (name, email, password, phone, avatar)
            VALUES (${name.trim()}, ${email.toLowerCase()}, ${hashedPassword}, ${phone || ''}, ${avatar})
            RETURNING id, name, email, phone, avatar, created_at
        `;

        const user = result[0];
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({
            message: 'User registered successfully',
            user: {
                id: String(user.id),
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                createdAt: user.created_at,
            },
            token,
        }, { status: 201 });

    } catch (error: any) {
        console.error('Register error:', error);
        return NextResponse.json({ error: 'Server error during registration', detail: error?.message }, { status: 500 });
    }
}