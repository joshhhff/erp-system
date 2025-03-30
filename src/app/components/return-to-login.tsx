'use client';
import Link from "next/link";
import { Themes } from "../services/utilities";

export default function ReturnToLogin() {
    return (
        <Link href='/'><button style={{ width: "fit-content", backgroundColor: Themes.buttonAvailable, color: "white", padding: "0.5rem 1rem", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: "500", cursor: "pointer", transition: "background-color 0.2s", border: "none", outline: "none" }} onMouseOver={(e) => { e.currentTarget.style.backgroundColor = Themes.buttonHover }} onMouseOut={(e) => { e.currentTarget.style.backgroundColor = Themes.buttonAvailable }}>Return to Login</button></Link>
    );
}