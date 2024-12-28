import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {usePoll} from "@inertiajs/react";

const stats = [
    { name: 'Total number of tickets', stat: '9999' },
    { name: 'Total number of unprocessed tickets', stat: '999' },
    { name: 'Timestamp of the last ticket processed', stat: '00/00/00 00:00:00' },
]

export default function StatsBlock() {
    // Stats
    const [totalTickets, setTotalTickets] = useState(0);
    const [unprocessedTickets, setUnprocessedTickets] = useState(0);
    const [lastProcessed, setLastProcessed] = useState('No tickets processed');
    const [highestTicketUser, setHighestTicketUser] = useState('Processing - Please Wait ...');

    const fetchStats = () => {
        fetch("/api/stats")
            .then((response) => response.json())
            .then((data) => {
                setTotalTickets(data.total_tickets);
                setUnprocessedTickets(data.unprocessed_tickets);
                if (data.last_ticket_processed) {
                    setLastProcessed(dayjs(data.last_ticket_processed.updated_at).format('DD/MM/YY HH:mm'));
                } else {
                    setLastProcessed('No tickets processed');
                }
                setHighestTicketUser(
                    data.highest_ticket_user.user.name +
                    ' (' + data.highest_ticket_user.user.email + ') with ' +
                    data.highest_ticket_user.total_tickets + ' tickets'
                );
            }).catch(err => {
                console.error(err.toString());
            });
    }

    useEffect(() => {
        const timer = window.setInterval(() => {
            fetchStats();
        }, 1000);
        return () => {
            window.clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="overflow-hidden border rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total number of tickets</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{totalTickets}</dd>
                </div>
                <div className="overflow-hidden border rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total number of unprocessed tickets</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{unprocessedTickets}</dd>
                </div>
                <div className="overflow-hidden border rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Timestamp of the last ticket processed</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{lastProcessed}</dd>
                </div>
            </dl>
            <div className="text-center font-bold text-2xl text-red-700 mt-4 p-4 border rounded-md shadow bg-white">
                {highestTicketUser}
            </div>
        </div>
    )
}
