import {Head, router} from '@inertiajs/react';
import StatsBlock from "@/Components/StatsBlock.jsx";
import LiveTicketTable from "@/Components/LiveTicketTable.jsx";
import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import NavLink from "@/Components/NavLink.jsx";
import {useEffect} from "react";

export default function Welcome({ auth, users }) {

    return (
        <DashboardLayout>
            <Head title="Home"/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="px-6 py-3 mt-8 flex justify-between text-xl border border-gray-400 rounded-md shadow bg-gray-200">
                    <div>Welcome {auth?.user?.name ? auth.user.name : 'Guest'}</div>
                    <div>
                        {auth?.user ? <NavLink method="post" href={route('logout')} as="button" className="text-xl">Admin Log Out</NavLink> : <NavLink method="get" href={route('login')} as="button" className="text-xl">Admin Log In</NavLink>}
                    </div>
                </div>
                <div className="mt-4">
                    <h1 className="text-2xl font-bold text-center">Ticketing Platform</h1>
                    <div className="mt-4 mx-6 p-4 border rounded-md bg-gray-200">
                        <StatsBlock />
                    </div>
                    <LiveTicketTable people={users} user={auth?.user} />
                </div>
            </div>
        </DashboardLayout>
    );
}
