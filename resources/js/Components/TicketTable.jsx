import {Link, useForm, usePoll} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {Fragment, useEffect, useState} from "react";
import dayjs from "dayjs";

function ShowPagination(tickets) {

}

export default function TicketTable({ tickets }) {
    const [api_tickets, setTickets] = useState([]);

    usePoll(5000, {
        onStart() {
            console.log('onStart');
            fetch('/api/tickets')
                .then(r => r.json() )
                .then(data => {
                    console.log(data);
                    setTickets(data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    });

    return (
        <div className="px-4 sm:px-6">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">Tickets</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the tickets.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled
                    >
                        Create Ticket
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Creator
                                    </th>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Subject
                                    </th>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Created
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {api_tickets.data?.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {ticket.user.name}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {ticket.subject}
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {dayjs(ticket.created_at).format('MMMM D, YYYY')}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <Link
                                                href={route('ticket.show', [ticket.id])}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                View Ticket
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination tickets={api_tickets}></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
