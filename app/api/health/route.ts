import { NextResponse } from 'next/server';
import { connectToDatabase, getAuthStorageMode, mapAuthError } from '@/lib/server-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    const mode = getAuthStorageMode();
    const env = {
        MONGODB_URI: Boolean(process.env.MONGODB_URI),
        JWT_SECRET: Boolean(process.env.JWT_SECRET),
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api'
    };

    if (!env.JWT_SECRET) {
        return NextResponse.json(
            {
                ok: false,
                env,
                mode,
                error: 'Missing required environment variables'
            },
            { status: 500 }
        );
    }

    if (!env.MONGODB_URI) {
        return NextResponse.json({ ok: true, env, mode, db: 'memory' });
    }

    try {
        await connectToDatabase();
        return NextResponse.json({ ok: true, env, mode, db: 'connected' });
    } catch (error) {
        const mapped = mapAuthError(error, 'Database health check failed');
        return NextResponse.json(
            {
                ok: false,
                env,
                mode,
                db: 'disconnected',
                error: mapped.error
            },
            { status: mapped.status }
        );
    }
}