import {Link} from "@inertiajs/react";


export default function Ticket({ ticket }) {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="py-4">
                <Link href={route('welcome')}>Home</Link>
            </div>
            <div className="border divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:px-6">
                    {ticket.subject}
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:p-6">{ticket.content}</div>
            </div>
        </div>
    )
}
