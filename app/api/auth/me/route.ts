import { NextRequest, NextResponse } from 'next/server';
import { findAuthUserById, mapAuthError, sanitizeUser, verifyToken } from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('Authorization');
        const bearerToken = authHeader?.replace('Bearer ', '');
        const cookieToken = req.cookies.get('token')?.value;
        const token = bearerToken || cookieToken;

        if (!token) {
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        }

        const decoded = verifyToken(token);

        const user = await findAuthUserById(decoded.id);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(sanitizeUser(user));

    } catch (error: any) {
        if (error?.name === 'JsonWebTokenError' || error?.name === 'TokenExpiredError') {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const mapped = mapAuthError(error, 'Failed to fetch current user');
        return NextResponse.json({ error: mapped.error }, { status: mapped.status });
    }
}