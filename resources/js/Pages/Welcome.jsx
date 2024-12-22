import {Head} from '@inertiajs/react';
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import DisplayTickets from "@/Components/DisplayTickets.jsx";
import {useEffect, useState} from "react";
import {Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions} from "@headlessui/react";
import Processed from "@/Components/Processed.jsx";
import Unprocessed from "@/Components/Unprocessed.jsx";
import StatsBlock from "@/Components/StatsBlock.jsx";
import dayjs from "dayjs";
import FilteredByUser from "@/Components/FilteredByUser.jsx";

export default function Welcome({ users }) {
    const [people, setPeople] = useState(users);
    const [tickets, setTickets] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('open');
    const [selectedPerson, setSelectedPerson] = useState(people[0]);
    const [btnActive, setBtnActive] = useState('bg-white text-indigo-600 border border-indigo-600');
    const [btnText, setBtnText] = useState('Open Tickets');
    const [query, setQuery] = useState('');

    // Stats
    const [totalTickets, setTotalTickets] = useState(0);
    const [unprocessedTickets, setUnprocessedTickets] = useState(0);
    const [lastProcessed, setLastProcessed] = useState('00/00/00 00:00:00');
    const [highestTicketUser, setHighestTicketUser] = useState('');

    const pageHasChanged = () => {
        const filterParams = new URLSearchParams();
        filterParams.append("page", pageNumber.toString());
        filterParams.append("status_filter", statusFilter);
        filterParams.append('email', selectedPerson.email);

        fetch("/api/tickets?" + filterParams.toString())
            .then((response) => response.json())
            .then((data) => {
                setTickets(data);
                setTotalPages(data?.last_page);
                console.log(data);
            }).catch(err => {
                console.error(err.toString());
            });
    }

    const fetchStats = () => {
        fetch("/api/stats")
            .then((response) => response.json())
            .then((data) => {
                setTotalTickets(data.total_tickets);
                setUnprocessedTickets(data.unprocessed_tickets);
                setLastProcessed(dayjs(data.last_ticket_processed.updated_at).format('DD/MM/YY HH:mm:ss'));
                setHighestTicketUser(
                    data.highest_ticket_user.user.name +
                    ' (' + data.highest_ticket_user.user.email + ') with ' +
                    data.highest_ticket_user.total_tickets + ' tickets'
                );
            }).catch(err => {
                console.error(err.toString());
            });
    }

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    const toggleBtn = () => {
        console.log(statusFilter);
        if (statusFilter === 'open') {
            setStatusFilter('close');
            setBtnText('Close Tickets');
            setBtnActive('bg-indigo-600 text-white border border-indigo-600');
        } else {
            setStatusFilter('open');
            setBtnText('Open Tickets');
            setBtnActive('bg-white text-indigo-600 border border-indigo-600');
        }
    }

    useEffect(() => { pageHasChanged(); fetchStats(); }, [pageNumber]);
    useEffect(() => { pageHasChanged(); fetchStats(); }, [statusFilter]);
    useEffect(() => { pageHasChanged(); fetchStats(); }, [selectedPerson]);
    useEffect(() => { console.log(statusFilter) }, [statusFilter]);


    return (
        <>
            <Head title="Home"/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mt-8">
                    <h1 className="text-2xl font-bold text-center">Ticketing Platform</h1>
                    <div className="mt-4 mx-6 p-4 border rounded-md bg-gray-200">
                        <StatsBlock
                            totalTickets={totalTickets}
                            unprocessedTickets={unprocessedTickets}
                            lastProcessed={lastProcessed}
                            highestTicketUser={highestTicketUser}
                        />
                    </div>
                    <div className="flex justify-between mx-6 mt-4 p-4 border rounded-md">
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={toggleBtn}
                                className={`rounded-md border ${btnActive} px-3 py-1 text-sm font-semibold shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                {btnText}
                            </button>
                        </div>
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
                    <div className="flex items-center gap-4 mx-6 mt-4 p-4 border rounded-md">
                        Filters:&nbsp;
                            {selectedPerson.id > 0 ? (<FilteredByUser user={selectedPerson} /> ) : ''}
                            {statusFilter === 'close' ? ( <Processed></Processed> ) : ( <Unprocessed></Unprocessed> )}
                    </div>
                    <DisplayTickets
                        tickets={tickets}
                        pageNumber={pageNumber}
                        totalPages={totalPages}
                        currentPage={setPageNumber}
                    ></DisplayTickets>

                </div>
            </div>
        </>
    );
}
