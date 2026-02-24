import { NextRequest, NextResponse } from 'next/server';
import {
    connectToDatabase,
    User,
    generateToken,
    sanitizeUser,
    validateRegisterInput
} from '@/lib/server-auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const name = body?.name;
        const email = body?.email;
        const password = body?.password;
        const phone = body?.phone;

        const validationError = validateRegisterInput(name, email, password, phone);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        await connectToDatabase();

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
        }

        const user = new User({
            name: name.trim(),
            email: normalizedEmail,
            password,
            phone: phone ? phone.trim() : '',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        });

        await user.save();

        const token = generateToken(user._id.toString());

        return NextResponse.json({
            message: 'User registered successfully',
            user: sanitizeUser(user),
            token
        }, { status: 201 });
    } catch (error) {
        console.error('Register route error:', error);
        return NextResponse.json({ error: 'Server error during registration' }, { status: 500 });
    }
}