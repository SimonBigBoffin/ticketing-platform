import {usePoll} from "@inertiajs/react";
import {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function DashboardLayout({ children }) {
    return (
        <div className="w-full max-w-7xl mx-auto">
            {children}
        </div>
    );
}
