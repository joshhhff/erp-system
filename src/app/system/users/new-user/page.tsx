import EditUserForm from "@/app/components/forms/edit-user-form";
import AppBar from "@/app/components/global-components/app-bar";
import ReturnToLogin from "@/app/components/return-to-login";
import { ValidateSession } from "@/app/services/session_controller";
import { Themes } from "@/app/services/utilities";

export default async function NewUser() {

    // session user
    const userDetails = await ValidateSession();
    console.log('Session User:', userDetails);

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
                <EditUserForm />
            </div>
        </>
    );
}