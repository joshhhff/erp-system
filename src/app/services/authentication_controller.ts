'use server';
import { prisma } from "../../../lib/prisma";
import { cookies } from "next/headers";
import Result from '@/app/models/result';
import { Tools, PasswordManager } from "./utilities";

// Create new company account
export async function createNewCompanyAccount(
    companyDetails: { name: string; email: string; phone: string; },
    addressDetails: { mainaddr1: string; mainaddr2: string; city: string; county: string; country: string; postcode: string; },
    loginDetails: { email: string; password: string }
): Promise<Result> {
    try {
        const newCompanyNumber = await Tools.generateCompanyNumber();
        console.log('New Company Number', newCompanyNumber);

        const createCompany = await prisma.company.create({
            data: {
                name: companyDetails.name,
                email: companyDetails.email,
                phone: companyDetails.phone,
                companyid: newCompanyNumber,
                mainaddr1: addressDetails.mainaddr1,
                mainaddr2: addressDetails.mainaddr2,
                city: addressDetails.city,
                county: addressDetails.county,
                country: addressDetails.country,
                postcode: addressDetails.postcode
            }
        });

        console.log('Company Created', createCompany);

        const { email, password } = loginDetails;
        const newUser = await createUser(email, password, newCompanyNumber, companyDetails.name, 1); // Default to admin role

        const success = createCompany && newUser.success && newUser.data;

        return new Result(true, { accountCreated: success, companyNumber: newCompanyNumber });
    } catch (error) {
        return new Result(false, error);
    }
}

// Check if company number is valid
export async function checkCompanyNumberIsValid(companyNumber: number): Promise<boolean> {
    const numberExists = await prisma.company.findUnique({
        where: { companyid: companyNumber },
    });
    return numberExists === null;
}

// Create user
export async function createUser(email: string, password: string, companyNumber: number, forename: string, role: number): Promise<Result> {
    try {
        const hashedPassword = await PasswordManager.hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                companyid: companyNumber,
                forename,
                role
            }
        });

        return new Result(true, newUser);
    } catch (error) {
        return new Result(false, error);
    }
}

// Verify user
export async function verifyUser(email: string, password: string): Promise<Result> {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (user) {
            const verifyPassword = await PasswordManager.verifyPassword(password, user.password);
            if ('password' in user) {
                delete (user as { password?: string }).password; // Remove password from user object
            }
            return new Result(true, [user, verifyPassword]);
        }

        return new Result(true, 'User not found');
    } catch (error) {
        return new Result(false, error);
    }
}

export async function verifyUserById(userId: number, companyId: number): Promise<Result> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId, companyid: companyId }
        });

        if (user) {
            if ('password' in user) {
                delete (user as { password?: string }).password; // Remove password from user object
            }
            return new Result(true, user);
        }

        return new Result(false, 'User not found');
    } catch (error) {
        return new Result(false, error);
    }
}