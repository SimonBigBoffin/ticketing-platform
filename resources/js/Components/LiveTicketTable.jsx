import {useEffect, useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Processed from "@/Components/Processed.jsx";
import Unprocessed from "@/Components/Unprocessed.jsx";
import dayjs from "dayjs";
import {Link, router} from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown.jsx";
import {
    Button,
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions, Field, Label,
    Switch
} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid/index.js";

export default function LiveTicketTable({ user, people }) {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [status, setStatus] = useState('open');
    const [query, setQuery] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(people[0]);
    const [enabled, setEnabled] = useState(false)

    const fetchLiveTicketData = () => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('status_filter', status.toString());
        params.append('email', selectedPerson.email);

        fetch("/api/tickets?" + params.toString())
            .then((response) => response.json())
            .then((data) => {
                setTickets(data.data);
                setTotalPages(data.last_page);
            }).catch(err => {
                console.error(err.toString());
            });
    }

    useEffect(() => {
        const liveTicketCounter = window.setInterval(() => {
            fetchLiveTicketData();
        }, 1000);

        return () => {
            window.clearInterval(liveTicketCounter);
        };

    }, [tickets, page, status, enabled, selectedPerson]);

    useEffect(() => {
        if (enabled) {
            setStatus('close');
            setTickets([]);
        } else {
            setStatus('open');
            setTickets([]);
        }
    }, [enabled]);


    const nextPage = (e) => {
        e.preventDefault();
        if (page < totalPages) {
            setPage(() => {
                return page + 1;
            });
            setTickets([])
        }
    }

    const prevPage = (e) => {
        e.preventDefault();
        if(page > 1) {
            setPage(() => {
                return page - 1;
            });
            setTickets([]);
        }
    }

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className="mx-6 mt-4 py-4">
            <div className="flex space-x-3 items-center justify-between">
                <Field className="flex items-center space-x-2">
                    <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                    >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                    </Switch>
                    <Label className="pr-4">Show Unprocessed / Processed Tickets</Label>
                </Field>

                <Combobox
                    as="div"
                    value={selectedPerson}
                    onChange={(person) => {
                        setQuery('')
                        setSelectedPerson(person)
                    }}
                >
                    <div className="relative">
                        <ComboboxInput
                            className="block w-full rounded-md bg-white py-1.5 pl-3 pr-12 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            onChange={(event) => setQuery(event.target.value)}
                            onBlur={() => setQuery('')}
                            displayValue={(person) => person?.name}
                        />
                        <ComboboxButton
                            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
                        >
                            <ChevronUpDownIcon className="size-5 text-gray-400" aria-hidden="true"/>
                        </ComboboxButton>

                        {filteredPeople.length > 0 && (
                            <ComboboxOptions
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                            >
                                {filteredPeople.map((person) => (
                                    <ComboboxOption
                                        key={person.id}
                                        value={person}
                                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                                    >
                                                <span
                                                    className="block truncate group-data-[selected]:font-semibold"
                                                >
                                                    {person.name}
                                                </span>

                                        <span
                                            className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white"
                                        >
                                                    <CheckIcon className="size-5" aria-hidden="true"/>
                                                </span>
                                    </ComboboxOption>
                                ))}
                            </ComboboxOptions>
                        )}
                    </div>
                </Combobox>
            </div>

            <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6">
                        <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Owner
                                    </th>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Subject
                                    </th>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Ticket Created
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {tickets?.map((ticket) => (
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
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex justify-between">
                                            <Link
                                                href={route('ticket.show', [ticket.id])}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                View
                                            </Link>
                                            {user && user?.is_admin && ticket.status === 0 && (
                                                <Link
                                                    href={route('ticket.close', [ticket.id])}
                                                    className="text-red-600 hover:text-red-900 font-bold "
                                                >Close</Link>
                                            )}
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
                                    Page: {page} of {totalPages}
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
