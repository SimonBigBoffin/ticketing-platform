import {Head, Link} from "@inertiajs/react";
import dayjs from "dayjs";


export default function Ticket({ ticket }) {
    return (
        <>
            <Head title="Ticket" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="py-4">
                    <Link href={route('welcome')}>Return</Link>
                </div>
                <div className="border divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6 font-bold text-center">
                        {ticket.subject}
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:p-6">{ticket.content}</div>
                    <div className="text-right px-4 py-5 sm:px-6">
                        Created on {dayjs(ticket.created_at).format('MMMM D, YYYY')} by {ticket.user.name}
                    </div>
                </div>
            </div>
        </>
    )
}
