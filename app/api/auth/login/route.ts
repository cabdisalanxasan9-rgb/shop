import { NextRequest, NextResponse } from 'next/server';
import {
    connectToDatabase,
    User,
    comparePassword,
    generateToken,
    sanitizeUser,
    validateLoginInput,
    mapAuthError
} from '@/lib/server-auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const email = body?.email;
        const password = body?.password;

        const validationError = validateLoginInput(email, password);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        await connectToDatabase();

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail }).select('+password');
        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const token = generateToken(user._id.toString());

        return NextResponse.json({
            message: 'Login successful',
            user: sanitizeUser(user),
            token
        });
    } catch (error) {
        console.error('Login route error:', error);
        const mapped = mapAuthError(error, 'Server error during login');
        return NextResponse.json({ error: mapped.error }, { status: mapped.status });
    }
}