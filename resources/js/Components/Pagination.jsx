import {Link} from "@inertiajs/react";

function prevPage() {
    console.log('Prev Page');
}
function nextPage() {
    console.log('Next Page');
}

export default function Pagination({ tickets }) {
    if (tickets.data?.length > 0) {
        return (
            <nav
                aria-label="Pagination"
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
            >
                <div className="hidden sm:block">

                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                    <Link
                       onClick={prevPage}
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                        Previous
                    </Link>
                    <Link
                        onClick={nextPage}
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                        Next
                    </Link>
                </div>
            </nav>
        )
    } else {
        return '';
    }
}
