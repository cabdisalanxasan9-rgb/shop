import { NextRequest, NextResponse } from 'next/server';
import {
    createAuthUser,
    findAuthUserByEmail,
    generateToken,
    sanitizeUser,
    validateRegisterInput,
    mapAuthError,
} from '@/lib/server-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const { name, email, password, phone } = await req.json();

        const validationError = validateRegisterInput(name, email, password, phone);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await findAuthUserByEmail(normalizedEmail, false);
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
        }

        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4ade80&color=fff`;

        const user = await createAuthUser({
            name: name.trim(),
            email: normalizedEmail,
            password,
            phone: (phone || '').trim(),
            avatar,
        });

        const token = generateToken(user.id);

        return NextResponse.json({
            message: 'User registered successfully',
            user: sanitizeUser(user),
            token,
        }, { status: 201 });

    } catch (error: any) {
        console.error('Register error:', error);
        const mapped = mapAuthError(error, 'Server error during registration');
        return NextResponse.json({ error: mapped.error }, { status: mapped.status });
    }
}