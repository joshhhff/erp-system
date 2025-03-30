import AppBar from "@/app/components/global-components/app-bar";
import { Themes } from "@/app/services/utilities";
import { ValidateSession } from "@/app/services/session_controller";
import ReturnToLogin from "@/app/components/return-to-login";

export default async function HomePage() {

    const userDetails = await ValidateSession();

    if (!userDetails.success) {
        return (
            <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: Themes.appBackgroundColour, padding: "5rem", color: "black" }}>
                <h1>{userDetails.data}</h1>
                <ReturnToLogin />
            </div>
        );
    }

    return (
        <>
            <AppBar userData={userDetails.data} activeTab="home" />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: Themes.appBackgroundColour, padding: "5rem", color: "black" }}>
                <h1>Hello, World!</h1>
            </div>
        </>
    );
}
