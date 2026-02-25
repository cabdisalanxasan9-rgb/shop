import { NextRequest, NextResponse } from 'next/server';
import {
    comparePassword,
    connectToDatabase,
    generateToken,
    mapAuthError,
    sanitizeUser,
    User,
    validateLoginInput,
} from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const validationError = validateLoginInput(email, password);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        await connectToDatabase();
        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail }).select('+password name email phone avatar createdAt');

        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const isMatch = await comparePassword(password, (user as any).password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const token = generateToken((user as any)._id.toString());

        return NextResponse.json({
            message: 'Login successful',
            user: sanitizeUser(user),
            token,
        });

    } catch (error: any) {
        console.error('Login error:', error);
        const mapped = mapAuthError(error, 'Server error during login');
        return NextResponse.json({ error: mapped.error }, { status: mapped.status });
    }
}