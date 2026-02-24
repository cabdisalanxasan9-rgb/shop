import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase, User, generateToken, validateLoginInput, sanitizeUser, mapAuthError } from '@/lib/server-auth';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const validationError = validateLoginInput(email, password);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const token = generateToken(user._id.toString());

        return NextResponse.json({ message: 'Login successful', user: sanitizeUser(user), token });

    } catch (error: any) {
        console.error('Login error:', error);
        const { status, error: msg } = mapAuthError(error, 'Server error during login');
        return NextResponse.json({ error: msg }, { status });
    }
}