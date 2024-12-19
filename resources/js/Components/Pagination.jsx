import {Link} from "@inertiajs/react";

export default function Pagination({ tickets }) {
    return (
        <nav
            aria-label="Pagination"
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
        >
            <div className="hidden sm:block">

            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <Link
                    href={ tickets.prev_page_url }
                    className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                    Previous
                </Link>
                <Link
                    href={ tickets.next_page_url }
                    className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                    Next
                </Link>
            </div>
        </nav>
    )
}
