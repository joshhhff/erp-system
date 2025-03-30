"use client";
import { Themes } from '../services/utilities';
import Link from 'next/link';

export default function LoginBanner() {

    return (
        <div style={{ flex: 1, backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "1.5rem", maxWidth: '70%' }}>
            {/* Latest News Section */}
            <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "left", color: "black" }}>Latest News</h1>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ padding: "1rem", backgroundColor: Themes.appBackgroundColour, borderRadius: "0.375rem", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#111827", marginBottom: "0.5rem" }}>Inventory Management made easier</h3>
                        <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>With the latest additions to Advanced Inventory Management, you can easily manage where your stock is, easily transfer to different locations, and update status of stock with just the click of a button. Reach out to your CloudOps Administrator to request a preview.</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "left", color: "black" }}>Get started with CloudOps today!</h1>
                <Link href='/system/register'><p style={{ color: Themes.buttonAvailable, fontWeight: 'bold' }}>Create Account</p></Link>
            </div>
            <p>Get access to innovating features as soon as you create your account. Standard features include</p>

            <div className="featured-icons" style={{ display: "flex", gap: "2rem", width: '100%', justifyContent: 'space-around', marginTop: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5rem", border: "1px solid #2563eb" }}>
                        <img src="/OrderManagementIcon.png" alt="Order Management" width={60} />
                    </div>
                    <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>Order Management</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5rem", border: "1px solid #2563eb" }}>
                        <img src="/InventoryManagementIcon.png" alt="Inventory Management" width={80} />
                    </div>
                    <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>Inventory Management</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5rem", border: "1px solid #2563eb" }}>
                        <img src="/ShippingVanIcon.png" alt="Feature 3" width={80} />
                    </div>
                    <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>Shipping</p>
                </div>
            </div>
        </div>
    );
}