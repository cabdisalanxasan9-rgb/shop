import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { sql, initDB } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || '9d0ee49f9bf805bd8aab193a2438ab9570be5fed472d983a6e1e675061b0e8607d456b26d11acb2c48b45a8504766082490aa635a7ab32e494bc549fbeee9d59';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

        await initDB();
        const result = await sql`
            SELECT id, name, email, phone, avatar, created_at
            FROM users
            WHERE id = ${decoded.id}
        `;

        if (result.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const user = result[0];

        return NextResponse.json({
            id: String(user.id),
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            createdAt: user.created_at,
        });

    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}