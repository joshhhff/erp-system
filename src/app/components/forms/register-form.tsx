"use client";
import { Themes } from "@/app/services/utilities";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();
    const [company, setCompany] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    const isFormValid =
        company &&
        companyEmail &&
        phone &&
        addressLine1 &&
        city &&
        country &&
        userEmail &&
        password;

    async function Register(): Promise<void> {
        try {
            const newAccount = await fetch("/api/authentication/new-company", {
                method: "POST",
                body: JSON.stringify({
                    companyDetails: {
                        name: company,
                        email: companyEmail,
                        phone: phone,
                    },
                    loginDetails: {
                        email: userEmail,
                        password: password,
                    },
                    address: {
                        mainaddr1: addressLine1,
                        mainaddr2: addressLine2,
                        city: city,
                        county: state,
                        country: country,
                        postcode: zipCode,
                    },
                }),
            });
            if (!newAccount.ok) {
                throw new Error(`HTTP error! status: ${newAccount.status}`);
            }

            const data = await newAccount.json();

            if (data.response.accountCreated) {
                alert("New account created. You will be redirected to the login page where you can login with your newly provided credentials.");
                router.push("/");
            } else {
                alert("Account creation failed");
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    return (
        <form style={{ display: "grid", gap: "1.5rem", marginTop: "1.5rem" }}>
            {/* Company Information Section */}
            <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#374151", marginBottom: "1rem" }}>Company Information</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                        <label htmlFor="company" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Company Name <span style={{ color: "red", fontWeight: 'bold' }}>*</span></label>
                        <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} required />
                    </div>
                    <div>
                        <label htmlFor="email" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Email <span style={{ color: "red", fontWeight: 'bold' }}>*</span></label>
                        <input type="email" id="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} required />
                    </div>
                    <div>
                        <label htmlFor="phone" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Phone Number <span style={{ color: "red", fontWeight: 'bold' }}>*</span></label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} required />
                    </div>
                </div>
            </div>

            {/* Company Address Section */}
            <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#374151", marginBottom: "1rem" }}>Company Address</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                        <label htmlFor="addressLine1" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Address Line 1 <span style={{ color: "red", fontWeight: 'bold' }}>*</span></label>
                        <input type="text" id="addressLine1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} required />
                    </div>
                    <div>
                        <label htmlFor="addressLine2" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Address Line 2 (Optional)</label>
                        <input type="text" id="addressLine2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} />
                    </div>
                    <div>
                        <label htmlFor="city" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Town/City <span style={{ color: "red", fontWeight: 'bold' }}>*</span></label>
                        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} required />
                    </div>
                    <div>
                        <label htmlFor="state" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>County/State</label>
                        <input type="text" id="city" value={state} onChange={(e) => setState(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} required />
                    </div>
                    <div>
                        <label htmlFor="country" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Country <span style={{ color: "red", fontWeight: 'bold' }}>*</span></label>
                        <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} required />
                    </div>
                    <div>
                        <label htmlFor="postcode" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Post/Zip Code</label>
                        <input type="text" id="postcode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} required />
                    </div>
                </div>
            </div>

            {/* Login Details Section */}
            <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#374151", marginBottom: "1rem" }}>Login Details</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div style={{ gridColumn: "span 2" }}>
                        <label htmlFor="user-email" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Email <span style={{ color: "red", fontWeight: 'bold' }}>*</span></label>
                        <input type="email" id="user-email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} required />
                    </div>
                    <div style={{ gridColumn: "span 2" }}>
                        <label htmlFor="password" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#4b5563", marginBottom: "0.25rem" }}>Password <span style={{ color: "red", fontWeight: 'bold' }}>*</span></label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: "block", width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", fontSize: "0.875rem" }} required />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="button"
                    style={{
                        width: "100%",
                        backgroundColor: isFormValid ? Themes.buttonAvailable : Themes.buttonUnavailable,
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        border: "none",
                        outline: "none"
                    }}
                    disabled={!isFormValid}
                    onMouseOver={(e) => {
                        if (isFormValid) {
                            e.currentTarget.style.backgroundColor = Themes.buttonHover;
                        }
                    }}
                    onMouseOut={(e) => {
                        if (isFormValid) {
                            e.currentTarget.style.backgroundColor = Themes.buttonAvailable;
                        }
                    }}
                    onClick={() => {
                        if (isFormValid) {
                            Register();
                        } else {
                            alert("Please fill out all required fields");
                        }
                    }}
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
}
