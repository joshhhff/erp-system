'use server';
import { cookies } from "next/headers";
import Result from '@/app/models/result';
import { verifyUserById } from "./authentication_controller";

let sessionCookies: any = null;

// Create a new session
export async function newSession(userId: number, roleId: number): Promise<Result> {
    try {
        const cookieStore = await cookies();
        sessionCookies = cookieStore;
        console.log('Creating new session for user:', JSON.stringify({ user: userId, role: roleId }));
        cookieStore.set('session-cookies', JSON.stringify({ user: userId, role: roleId }), { httpOnly: true, path: '/' });

        const newSessionDetails = cookieStore.get('session-cookies');
        console.log('New Session Details:', newSessionDetails);

        return new Result(true, { sessionSet: true });
    } catch (error) {
        return new Result(false, error);
    }
}

// Get session
export async function getSession(): Promise<Result> {
    try {
        if (sessionCookies === null) {
            return new Result(true, null);
        }
        const session = sessionCookies.get('session-cookies');
        console.log('Session Details:', session);

        return new Result(true, session);
    } catch (error) {
        return new Result(false, error);
    }
}

// Delete session
export async function deleteSession(): Promise<Result> {
    try {
        if (sessionCookies === null) {
            return new Result(true, null);
        }

        sessionCookies.delete('session-cookies', { path: '/' });
        console.log('Session deleted');

        return new Result(true, sessionCookies);
    } catch (error) {
        return new Result(false, error);
    }
}

export async function ValidateSession(): Promise<Result> {
    try {
        const session = await getSession();
        console.log('Session:', session);

        if (!session.success || !session.data) {
            return new Result(false, 'Invalid session');
        }

        // if all is well, get user data and then pass to appbar
        if (session.data.name === 'session-cookies' && session.data.value) {
            const userID = JSON.parse(session.data.value).user;
            console.log('User ID:', userID);

            const userDetails = await verifyUserById(userID);
            console.log('User Details:', userDetails);

            if (!userDetails.success || !userDetails.data) {
                return new Result(false, 'Error fetching user details');

            }

            return new Result(true, userDetails.data);
        } else {
            return new Result(false, 'Invalid session');
        }
    } catch (error) {
        return new Result(false, error);
    }
}