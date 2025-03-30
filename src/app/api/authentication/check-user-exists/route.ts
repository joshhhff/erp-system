/* 
This API can be used to verify if a user exists. This can be done via 2 methods
1. By providing an email and password
2. By providing a user ID

When verifiying via user ID, it will assume that there is a current active session, to only retrieve users relating
to the company that the user is associated with. If there is no active session, this will fail, as it does this by
checking the user session data to retrieve the company ID.

*/

'use server';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { verifyUser, verifyUserById } from '@/app/services/authentication_controller';
import { newSession } from '@/app/services/session_controller';

// This API can be used for verifying a user by either email and password, or by user ID.
export async function POST(request: Request) {
    console.log('Checking user exists');
    const body = await request.json();
    console.log('Request Body', body);

    if (!body.email || !body.password || body.email === '' || body.password === '') {
        console.log('Invalid request body');
        return NextResponse.json({ error: 'You can verify a user by either providing Email and Password, or by User ID' }, { status: 400 });
    }

    if (body.email && body.password && body.userId) {
        return NextResponse.json({ error: 'You can only verify a user by one method, either Email and Password, or by User ID. Not both' }, { status: 400 });
    }

    if (body.email && body.password) {
        console.log('Verifying user by email and password');
        const { email, password } = body;

        const validUser = await verifyUser(email, password);
        console.log('Valid User:', validUser);

        if (validUser.success) {
            const user = validUser.data[0].id;
            const role = validUser.data[0].role;

            if (validUser.data[1]) newSession(user, role);
            return NextResponse.json({ validUser: validUser.data }, { status: 200 });
        } else {
            return NextResponse.json({ validUser: false }, { status: 400 });
        }
    } else if (body.userId) {
        /* const { userId } = body;

        const validUser = await verifyUserById(userId);
        console.log('Valid User:', validUser);

        if (validUser.success && validUser.data) {

            return NextResponse.json({ userDetails: validUser.data }, { status: 200 });
        } */
    }

    if (!body.userId) {
        return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
    }
}