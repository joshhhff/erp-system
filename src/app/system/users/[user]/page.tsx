import AppBar from "@/app/components/global-components/app-bar";
import { Themes } from "@/app/services/utilities";
import { ValidateSession } from "@/app/services/session_controller";
import ReturnToLogin from "@/app/components/return-to-login";
import AccountForm from "@/app/components/forms/account-form";
import { verifyUserById } from "@/app/services/authentication_controller";

export default async function User({ params }: { params: { user: string } }) {

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

    const { user } = await params;
    const companyId = userDetails.data.companyid;
    // details of user being viwed
    const userData = await verifyUserById(Number(user), companyId);
    console.log('User Details of user being viewed:', userData);

    if (!userData.success) {
        return (
            <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: Themes.appBackgroundColour, padding: "5rem", color: "black" }}>
                <h1>{userData.data}</h1>
                <ReturnToLogin />
            </div>
        )
    }

    const passDatatoForm = {
        data: userData.data,
    }

    return (
        <>
            <AppBar userData={userDetails.data} activeTab="settings" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", minHeight: "100vh", backgroundColor: Themes.appBackgroundColour, color: "black" }}>
                <AccountForm userDetails={passDatatoForm} />
            </div>
        </>
    );
}
