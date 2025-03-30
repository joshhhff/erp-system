import bcrypt from "bcryptjs";
import { checkCompanyNumberIsValid } from "./authentication_controller";

export abstract class Tools {
    static async generateCompanyNumber(): Promise<number> {
        let companyNumber: number = 0;
        let validNumber: boolean = false;

        while (!validNumber) {
            companyNumber = Math.floor(Math.random() * 1000000) + 1;
            validNumber = await checkCompanyNumberIsValid(companyNumber);
        }

        return companyNumber;
    }
}

export abstract class Themes {
    static appBackgroundColour: string = '#f3f4f6';
    static appPrimaryColour: string = '#CCCCCC';
    static appSecondaryColour: string = '#2563eb';
    static buttonAvailable: string = '#2563eb';
    static buttonUnavailable: string = '#6b7280';
    static buttonHover: string = '#1d4ed8';
    static h1 = function (colour: string): object {

        return {
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "left",
            marginTop: '1.5rem',
            marginBottom: "1.5rem",
            color: colour
        }
    };
    static formHeader = function (colour: string): object {
        return {
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "left",
            color: colour,
            padding: '1rem 1rem 0 1rem'
        }
    }
    static formSubHeader = function (): object {
        return {
            fontSize: "1.25rem",
            fontWeight: "bold",
            textAlign: "left",
            color: 'grey',
            padding: '0 1rem 0 1rem'
        }
    }
    static inputField = function (): object {
        return {
            display: "block",
            width: "100%",
            padding: "0.5rem 0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            fontSize: "0.875rem",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            appearance: "none", // Ensures consistent styling for select elements
            backgroundColor: "white", // Matches input background
            backgroundImage: "none", // Removes default dropdown arrow styling
        }
    }
}

export abstract class PasswordManager {
    private static saltRounds = 10;

    /**
     * Hashes a password before storing in the database.
     * @param password - The plain text password.
     * @returns A hashed password string.
     */
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }

    /**
     * Verifies if the provided password matches the stored hash.
     * @param password - The plain text password.
     * @param hash - The stored hashed password.
     * @returns True if passwords match, otherwise false.
     */
    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}