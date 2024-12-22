import {useState} from "react";
import dayjs from "dayjs";
import {Link} from "@inertiajs/react";
import TicketStatus from "@/Components/TicketStatus.jsx";
import Unprocessed from "@/Components/Unprocessed.jsx";
import Processed from "@/Components/Processed.jsx";


export default function DisplayTickets({ tickets, pageNumber, totalPages, currentPage }) {

    const nextPage = (e) => {
        e.preventDefault();
        if (pageNumber < totalPages) {
            pageNumber++;
        }
        currentPage(pageNumber);
    }

    const prevPage = (e) => {
        e.preventDefault();
        if(pageNumber > 1) {
            pageNumber--;
        }
        currentPage(pageNumber);
    }

    return (
        <div className="sm:px-6">
            <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6">
                        <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            &nbsp;
                                        </th>
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
                                {tickets.data?.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {ticket.status ? ( <Processed></Processed> ) : ( <Unprocessed></Unprocessed> )}
                                        </td>
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
                            <nav
                                aria-label="Pagination"
                                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                            >
                                <div className="hidden sm:block">
                                    Page: {pageNumber} of {totalPages}
                                </div>
                                <div className="flex flex-1 justify-between sm:justify-end">
                                    <button
                                        onClick={prevPage}
                                        type="button"
                                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={nextPage}
                                        type="button"
                                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                                    >
                                        Next
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
