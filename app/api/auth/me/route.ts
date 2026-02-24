import { NextRequest, NextResponse } from 'next/server';
import {
    connectToDatabase,
    User,
    getBearerToken,
    verifyToken,
    sanitizeUser
} from '@/lib/server-auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
    try {
        const token = getBearerToken(req.headers.get('authorization'));
        if (!token) {
            return NextResponse.json({ error: 'Access denied. No token provided.' }, { status: 401 });
        }

        const decoded = verifyToken(token);
        await connectToDatabase();

        const user = await User.findById(decoded.id);
        if (!user) {
            return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
        }

        return NextResponse.json(sanitizeUser(user));
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
    }
}