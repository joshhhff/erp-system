import RegisterForm from "@/app/components/forms/register-form";
import { Themes } from "@/app/services/utilities";

export default function Register() {

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: Themes.appBackgroundColour, padding: "5rem", color: "black" }}>
            <div style={{ flex: 1, backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "1.5rem", maxWidth: '80%', height: 'fit-content' }}>
                <RegisterForm />
            </div>
        </div>
    )
}