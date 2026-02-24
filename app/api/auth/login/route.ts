import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sql, initDB } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || '9d0ee49f9bf805bd8aab193a2438ab9570be5fed472d983a6e1e675061b0e8607d456b26d11acb2c48b45a8504766082490aa635a7ab32e494bc549fbeee9d59';

export const dynamic = 'force-dynamic';

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
        return NextResponse.json({
            error: 'Server error during login',
            detail: error?.message || String(error)
        }, { status: 500 });
    }
}