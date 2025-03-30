import { Themes } from "@/app/services/utilities";
import BlueButton from "../blue-button";

interface EditUserFormProps {
    userDetails?: {
        id: string;
        email: string;
        forename: string;
        surename: string | null;
        role: string;
        createdAt: string;
        updatedAt: string;
        companyid: string;
    }
}

export default function EditUserForm({ userDetails }: EditUserFormProps) {

    const displayName = (userDetails: EditUserFormProps["userDetails"]) => {
        const { forename, surename } = userDetails || {};
        return forename && surename ? `${forename} ${surename}` : forename || "Unknown User";
    }

    return (
        <div style={{ width: "100%", borderRadius: "8px" }}>
            <h1 style={Themes.formHeader(Themes.buttonAvailable)}>User Details</h1>
            {userDetails && (<h2 style={Themes.formSubHeader()}>{displayName(userDetails)}</h2>)}
            <form className="user-details-form" style={{ padding: '1rem' }}>
                <div className="buttons" style={{ marginBottom: '1rem' }}>
                    <BlueButton text='Save' />
                </div>
                <div className="fields" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <div>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Email:</label>
                        <input style={Themes.inputField()} />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Forename:</label>
                        <input style={Themes.inputField()} />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Surename:</label>
                        <input style={Themes.inputField()} />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Role:</label>
                        <select style={Themes.inputField()}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="guest">Guest</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )
}