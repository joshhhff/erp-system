'use server';
import { prisma } from "../../../lib/prisma";
import Result from "../models/result";

export async function GetAllUsers(companyId: number): Promise<Result> {
    try {
        const users = await prisma.user.findMany({
            where: { companyid: companyId },
            select: {
                id: true,
                email: true,
                forename: true,
                surename: true,
                role: true,
            },
        });

        return new Result(true, users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Result(false, error)
    }
}