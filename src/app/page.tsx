import LoginForm from "./components/forms/login-form";
import { Themes } from "./services/utilities";
import LoginBanner from "./components/login-banner";

export default function Login() {

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: Themes.appBackgroundColour, padding: "5rem", color: "black" }}>
            <div style={{ display: "flex", gap: "2rem", width: "100%", flexWrap: "wrap" }}>
                <LoginForm />
                <LoginBanner />
            </div>
        </div>
    );
}