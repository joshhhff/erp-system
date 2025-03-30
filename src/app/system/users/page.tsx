import AppBar from "@/app/components/global-components/app-bar";
import ReturnToLogin from "@/app/components/return-to-login";
import { ValidateSession } from "@/app/services/session_controller";
import { Themes } from "@/app/services/utilities";
import { GetAllUsers } from "@/app/services/database_controller";
import BlueButton from "@/app/components/blue-button";

export default async function Users() {

    const userDetails = await ValidateSession();

    if (!userDetails.success) {
        return (
            <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: Themes.appBackgroundColour, padding: "5rem", color: "black" }}>
                <h1>{userDetails.data}</h1>
                <ReturnToLogin />
            </div>
        );
    }

    const users = await GetAllUsers(userDetails.data.companyid);

    return (
        <>
            <AppBar userData={userDetails.data} activeTab="setup" subActiveTab="users" />
            <div style={{ minHeight: "100vh", backgroundColor: "#f0f0f0", color: "black" }}>
                {!users.success ? (
                    <h1 style={Themes.h1(Themes.buttonAvailable)}></h1>
                ) : (
                    <div style={{ width: "100%", borderRadius: "8px" }}>
                        <h1 style={Themes.formHeader(Themes.buttonAvailable)}>Users</h1>
                        <div className="new-user-button" style={{ margin: '1rem 0 1rem 1rem' }}>
                            <BlueButton text='New User' />
                        </div>
                        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" }}>
                            <thead>
                                <tr style={{ backgroundColor: Themes.appPrimaryColour }}>
                                    <th style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "center", width: '13rem' }}>EDIT | VIEW</th>
                                    <th style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>INTERNAL ID</th>
                                    <th style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>EMAIL</th>
                                    <th style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>FORENAME</th>
                                    <th style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>SURNAME</th>
                                    <th style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "left" }}>ROLE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((user: any) => (
                                    <tr key={user.id}>
                                        <td style={{ border: "1px solid #ccc", padding: "0.5rem", textAlign: "center" }}>
                                            <div className="edit-view-buttons" style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                                                <BlueButton text='Edit' />
                                                <BlueButton text='View' />
                                            </div>
                                        </td>
                                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{user.id}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{user.email}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{user.forename}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{user.surname}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>
        </>
    );
}