'use server';
import { NextResponse } from 'next/server';
import { deleteSession } from '@/app/services/session_controller';

export async function GET() {
    // Delete the session
    const session = await deleteSession();
    console.log('Deleted Session:', session);

    // Check if the session was deleted successfully
    if (session.success) {
        return NextResponse.json({ message: 'Session deleted successfully' }, { status: 200 });
    } else {
        return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
    }
}