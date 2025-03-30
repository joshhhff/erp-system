import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function GET(request: Request) {

    const people = await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc',
        },
    });
    
    return NextResponse.json({ users: people }, { status: 200 });
}