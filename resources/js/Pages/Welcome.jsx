import { Link, Head } from '@inertiajs/react';
import TicketTable from "@/Components/TicketTable.jsx";

export default function Welcome({ auth, tickets }) {
    return (
        <>
            <Head title="Home" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mt-8">

                    <TicketTable tickets={tickets} />
                </div>
            </div>
        </>
    );
}
