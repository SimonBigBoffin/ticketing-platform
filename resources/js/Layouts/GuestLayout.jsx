import {usePoll} from "@inertiajs/react";
import {useState} from "react";

export default function Guest({ children }) {
    return (
        <div className="w-full max-w-md mx-auto pt-14">
            <h1 className="text-2xl font-bold text-center pb-4">Admin Login</h1>
            <div className="border border-gray-400 rounded-md shadow p-6 bg-gray-200">
                {children}
            </div>
        </div>
    );
}
