'use client';
import { Themes } from "../services/utilities";

interface EditButtonProps {
    onClick?: () => void;
    text: string;
}

export default function BlueButton({ onClick, text }: EditButtonProps) {
    return (
        <button
            onClick={onClick}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = Themes.buttonHover;
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = Themes.buttonAvailable;
            }}
            style={{
                backgroundColor: Themes.buttonAvailable,
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            {text}
        </button>
    );
}