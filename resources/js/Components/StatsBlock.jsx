import dayjs from "dayjs";
import {useEffect, useState} from "react";

const stats = [
    { name: 'Total number of tickets', stat: '9999' },
    { name: 'Total number of unprocessed tickets', stat: '999' },
    { name: 'Timestamp of the last ticket processed', stat: '00/00/00 00:00:00' },
]

export default function StatsBlock({totalTickets, unprocessedTickets, lastProcessed}) {

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
            <div className="mt-4 p-4 border rounded-md shadow bg-white">
                Name & Email of the user with the highest number of submitted tickets
            </div>
        </div>
    )
}
