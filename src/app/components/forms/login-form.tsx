"use client";
import { useState } from "react";
import { Themes } from "../../services/utilities";
import { useRouter } from "next/navigation";

/* 
TEST LOGINS

- Company - Test Company 2
  User - joshtest@gmail.com
  Password - AdminPassword123

- Company - Apple
  User - josh@apple.com
  Password - AdminPassword123

- Company - Amazon
  User - josh@amazon.com
  Password - AdminPassword123

*/



export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidLogin, setInvalidLogin] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        try {
            // Reset invalid login state
            if (invalidLogin) setInvalidLogin('');
            setLoading(true);
            const response = await fetch("/api/authentication/check-user-exists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                setInvalidLogin('An unexpected error occurred');
                setLoading(false);
                throw new Error(`HTTP error! status: ${JSON.stringify(response)}`);
            }
            const data = await response.json();
            console.log("Login response:", data);
            setLoading(false);

            if (typeof data.validUser === 'string') {
                setInvalidLogin(data.validUser);
                return;
            } else {
                if (data.validUser[1]) {
                    router.push("/system/home");
                } else {
                    setInvalidLogin('Incorrect password');
                    return;
                }
            }

        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    return (
        <div style={{ flex: 1, backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "1.5rem", maxWidth: '30%', height: 'fit-content' }}>
            <img src="/CloudOpsLogo.png" alt="CloudOps Logo" width={400} style={{ display: "block" }} />
            <h1 style={Themes.h1('black')}>Login</h1>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                    <label htmlFor="email" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", fontSize: "0.875rem", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s" }} required />
                </div>
                <div>
                    <label htmlFor="password" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", fontSize: "0.875rem", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s" }} required />
                </div>
                <button type="submit" style={{ width: "100%", backgroundColor: email !== '' ? Themes.buttonAvailable : Themes.buttonUnavailable, color: "white", padding: "0.5rem 1rem", borderRadius: "0.375rem", fontSize: "1rem", fontWeight: "500", cursor: "pointer", transition: "background-color 0.2s", border: "none", outline: "none" }} onMouseOver={(e) => { if (email !== '') e.currentTarget.style.backgroundColor = "#1d4ed8" }} onMouseOut={(e) => { if (email !== '') e.currentTarget.style.backgroundColor = "#2563eb" }}>Login</button>
                <p style={{ fontWeight: 'bold', textAlign: 'left' }}>Forgot Password?</p>
                {invalidLogin && <h3 style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{invalidLogin}</h3>}
                {loading && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "0.5rem" }}>
                        <div style={{
                            width: "24px",
                            height: "24px",
                            border: "3px solid #d1d5db",
                            borderTop: "3px solid #2563eb",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite"
                        }} />
                        <style jsx>{`
                            @keyframes spin {
                                0% {
                                    transform: rotate(0deg);
                                }
                                100% {
                                    transform: rotate(360deg);
                                }
                            }
                        `}</style>
                    </div>
                )}
                {/* Loading symbol */}
            </form>
        </div>
    );
}