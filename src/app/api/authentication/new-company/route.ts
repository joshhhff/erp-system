/* 
    @URL: /api/authentication/new-company
    @METHOD: POST
*/

import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { createNewCompanyAccount } from '@/app/services/authentication_controller';

export async function POST(request: Request) {

    const body = await request.json();
    console.log('Request Body', body);

    const companyDetails = body.companyDetails;
    const loginDetails = body.loginDetails;
    const addressDetails = body.address;

    const newCompanyAccount = await createNewCompanyAccount(
        companyDetails,
        addressDetails,
        loginDetails
    );
    console.log('New Company Account', newCompanyAccount);

    return NextResponse.json({ response: newCompanyAccount.data }, { status: newCompanyAccount.success ? 200 : 500 });
}