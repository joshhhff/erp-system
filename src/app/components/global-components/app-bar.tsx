"use client";
import { Themes } from "@/app/services/utilities";
import { Home, UsersRound, EllipsisVertical, LogOut, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AppBarProps {
    userData: {
        id: number;
        email: string;
        forename: string;
        surename: string;
        role: number;
        companyid: number;
    }
    activeTab: string;
    subActiveTab?: string;
}

export default function AppBar({ activeTab, userData, subActiveTab }: AppBarProps) {
    const router = useRouter();
    const [isTransactionDropdownVisible, setTransactionDropdownVisible] = useState(false);
    const [isAccountDropdownVisible, setAccountDropdownVisible] = useState(false);
    const [isSetupDropdownVisible, setSetupDropdownVisible] = useState(false);

    const [isSalesSubDropdownVisible, setSalesSubDropdownVisible] = useState(false);

    async function LogOutUser() {
        const repsonse = await fetch("/api/authentication/log-out", {
            method: "GET",

        });
        if (!repsonse.ok) {
            console.error('Error logging out:', repsonse);
            return;
        }
        router.push("/");
    }

    const displayName = ({ forename, surename }: AppBarProps["userData"]) => {
        return forename && surename ? `${forename} ${surename}` : forename || "Unknown User";
    };

    return (
        <nav style={{ position: "sticky", top: 0, width: "100%", backgroundColor: Themes.appPrimaryColour, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", backgroundColor: Themes.appBackgroundColour, justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <img src="/CloudOpsLogo.png" alt="App Logo" style={{ height: "40px", marginRight: "1rem" }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{
                            width: "50%",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid rgba(0, 0, 0, 0.2)",
                            outline: "none",
                            color: "grey",
                        }}
                    />
                </div>
                <div
                    className="nav-account"
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: '1rem 1rem', borderRadius: "4px", position: "relative", cursor: "pointer", color: 'black' }}
                    onMouseEnter={() => setAccountDropdownVisible(true)}
                    onMouseLeave={() => setAccountDropdownVisible(false)}
                >
                    <UsersRound size={24} />
                    <span>{displayName(userData)}</span>
                    {isAccountDropdownVisible && (
                        <ul style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            backgroundColor: "white",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            listStyle: "none",
                            width: '200%',
                            margin: 0,
                            zIndex: 10,
                            borderRadius: "4px",
                        }}>
                            <li
                                style={{
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    textAlign: "left",
                                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                                }}
                                onClick={() => LogOutUser()}
                            >Log Out <span style={{ float: 'right' }}><LogOut /></span></li>
                            <li
                                style={{
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    textAlign: "left",
                                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                                }}
                                onClick={() => router.push("/system/account")}
                            >User Details <span style={{ float: 'right' }}><UserRoundPen /></span></li>
                            <li className="ignore-hover"
                                style={{
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    textAlign: "left",
                                    fontWeight: "bold",
                                }}
                            >My Roles</li>
                            <li className="ignore-hover"
                                style={{
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    textAlign: "left",
                                }}
                            >Administrator</li>
                            <li className="ignore-hover"
                                style={{
                                    padding: "0.5rem 1rem",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    textAlign: "left",
                                }}
                            >Sales Manager</li>
                        </ul>
                    )}
                </div>
            </div>
            <ul className="app-bar" style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, fontWeight: "bold" }}>
                <li style={{ margin: 0, padding: "1rem 1.5rem", backgroundColor: activeTab === "settings" ? 'grey' : '' }}>
                    <EllipsisVertical size={24} color='black' />
                </li>
                <Link href='/system/home'><li style={{ margin: 0, padding: "1rem 1.5rem", backgroundColor: activeTab === "home" ? 'grey' : '' }}>
                    <Home size={24} color='black' />
                </li></Link>
                <li
                    style={{ margin: 0, padding: "1rem 1.5rem", position: "relative" }}
                    onMouseEnter={() => setTransactionDropdownVisible(true)}
                    onMouseLeave={() => setTransactionDropdownVisible(false)}
                >
                    <a style={{ textDecoration: "none", color: "black" }}>Transactions</a>
                    {isTransactionDropdownVisible && (
                        <ul style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            width: "150%",
                            backgroundColor: "white",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            listStyle: "none",
                            color: "black",
                            margin: 0,
                            padding: 0,
                            zIndex: 10,
                        }}>
                            <li
                                style={{ padding: "1rem 1.5rem", cursor: "pointer", position: "relative" }}
                                onMouseEnter={() => setSalesSubDropdownVisible(true)}
                                onMouseLeave={() => setSalesSubDropdownVisible(false)}
                            >
                                Sales <span style={{ float: 'right' }}>&gt;</span>
                                {isSalesSubDropdownVisible && (
                                    <ul style={{
                                        position: "absolute",
                                        top: 0,
                                        left: "100%",
                                        width: "150%",
                                        backgroundColor: "white",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        listStyle: "none",
                                        color: "black",
                                        margin: 0,
                                        padding: 0,
                                        zIndex: 10,
                                    }}>
                                        <li style={{ padding: "1rem 1.5rem", cursor: "pointer" }}>Orders</li>
                                        <li style={{ padding: "1rem 1.5rem", cursor: "pointer" }}>Quotes</li>
                                        <li style={{ padding: "1rem 1.5rem", cursor: "pointer" }}>Fulfillments</li>
                                    </ul>
                                )}
                            </li>
                            <li style={{ padding: "1rem 1.5rem", cursor: "pointer" }}>Purchases <span style={{ float: 'right' }}>&gt;</span></li>
                            <li style={{ padding: "1rem 1.5rem", cursor: "pointer" }}>Order Management <span style={{ float: 'right' }}>&gt;</span></li>
                        </ul>
                    )}
                </li>
                <li style={{ margin: 0, padding: "1rem 1.5rem" }}>
                    <a style={{ textDecoration: "none", color: "black" }}>Products</a>
                </li>
                <li style={{ margin: 0, padding: "1rem 1.5rem" }}>
                    <a style={{ textDecoration: "none", color: "black" }}>Inventory</a>
                </li>
                <li style={{ margin: 0, padding: "1rem 1.5rem" }}>
                    <a style={{ textDecoration: "none", color: "black" }}>Customers</a>
                </li>
                <li style={{ margin: 0, padding: "1rem 1.5rem", position: "relative", backgroundColor: activeTab === "setup" ? 'grey' : '' }}
                    onMouseEnter={() => setSetupDropdownVisible(true)}
                    onMouseLeave={() => setSetupDropdownVisible(false)}
                >
                    <a style={{ textDecoration: "none", color: "black" }}>Setup</a>

                    {isSetupDropdownVisible && (
                        <ul style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            width: "150%", // Set a minimum width for the dropdown
                            backgroundColor: "white",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                            color: "black",
                            zIndex: 10,
                            borderRadius: "4px", // Optional: Add some rounding for better visuals
                        }}>
                            <li style={{ padding: "1rem 1.5rem", cursor: "pointer" }}>Company <span style={{ float: 'right' }}>&gt;</span></li>
                            <Link href='/system/users'><li style={{ padding: "1rem 1.5rem", cursor: "pointer", backgroundColor: subActiveTab === "users" ? 'lightgrey' : '' }}>Users <span style={{ float: 'right' }}>&gt;</span></li></Link>
                            <li style={{ padding: "1rem 1.5rem", cursor: "pointer" }}>Roles <span style={{ float: 'right' }}>&gt;</span></li>

                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}