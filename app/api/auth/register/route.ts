import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase, User, generateToken, validateRegisterInput, sanitizeUser, mapAuthError } from '@/lib/server-auth';

export async function POST(req: NextRequest) {
    try {
        const { name, email, password, phone } = await req.json();

        const validationError = validateRegisterInput(name, email, password, phone);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        await connectToDatabase();

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            phone: phone ? phone.trim() : '',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4ade80&color=fff`,
        });

        const token = generateToken(user._id.toString());

        return NextResponse.json(
            { message: 'User registered successfully', user: sanitizeUser(user), token },
            { status: 201 }
        );

    } catch (error: any) {
        console.error('Register error:', error);
        const { status, error: msg } = mapAuthError(error, 'Server error during registration');
        // Include raw error in dev/debugging — remove after fix
        const detail = error?.message || error?.name || String(error);
        return NextResponse.json({ error: msg, detail }, { status });
    }
}