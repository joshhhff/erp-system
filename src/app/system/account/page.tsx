import AppBar from "@/app/components/global-components/app-bar";
import { Themes } from "@/app/services/utilities";
import { ValidateSession } from "@/app/services/session_controller";
import ReturnToLogin from "@/app/components/return-to-login";
import EditButton from "@/app/components/blue-button";
import AccountForm from "@/app/components/forms/account-form";

export default async function Account() {

    const userDetails = await ValidateSession();

    if (!userDetails.success) {
        return (
            <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: Themes.appBackgroundColour, padding: "5rem", color: "black" }}>
                <h1>{userDetails.data}</h1>
                <ReturnToLogin />
            </div>
        )
    }

    return (
        <>
            <AppBar userData={userDetails.data} activeTab="settings" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", minHeight: "100vh", backgroundColor: Themes.appBackgroundColour, color: "black" }}>
                <AccountForm userDetails={userDetails} />
            </div>
        </>
    );
}
