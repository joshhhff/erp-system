import { Themes } from "@/app/services/utilities";
import BlueButton from "../blue-button";

interface AccountFormProps {
    userDetails: {
        data: {
            id: string;
            email: string;
            forename: string;
            surename: string | null;
            role: string;
            createdAt: string;
            updatedAt: string;
            companyid: string;
        };
    }
}

export default function AccountForm({ userDetails }: AccountFormProps) {

    const displayName = ({ forename, surename }: AccountFormProps["userDetails"]['data']) => {
        return forename && surename ? `${forename} ${surename}` : forename || "Unknown User";
    };

    return (
        <div style={{ width: "100%", borderRadius: "8px" }}>
            <h1 style={Themes.formHeader(Themes.buttonAvailable)}>User Details</h1>
            <h2 style={Themes.formSubHeader()}>{displayName(userDetails.data)}</h2>
            <div className="user-details-form" style={{ padding: '1rem' }}>
                <div className="buttons" style={{ marginBottom: '1rem' }}>
                    <BlueButton text='Edit' />
                </div>
                <div className="fields" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <div>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>ID:</label>
                        <p>{userDetails.data.id}</p>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Email:</label>
                        <p>{userDetails.data.email}</p>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Forename:</label>
                        <p>{userDetails.data.forename}</p>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Surename:</label>
                        <p>{userDetails.data.surename || "N/A"}</p>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Role:</label>
                        <p>{userDetails.data.role}</p>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Created At:</label>
                        <p>{new Date(userDetails.data.createdAt).toLocaleString()}</p>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Updated At:</label>
                        <p>{new Date(userDetails.data.updatedAt).toLocaleString()}</p>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Company ID:</label>
                        <p>{userDetails.data.companyid}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}