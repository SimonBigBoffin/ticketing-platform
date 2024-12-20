import {useState} from "react";

export default function TicketStatus({ id, status }) {

    const [message, setMessage] = useState('');

    if (status) {
        setMessage('Ticket Open');
    } else {
        setMessage('Ticket Closed');
    }

    return (
        <>
            <span
                className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
                key={id}
            >
                <svg viewBox="0 0 6 6" aria-hidden="true"
                     className="size-1.5 fill-red-500">
                    <circle r={3} cx={3} cy={3}/>
                </svg>
                { message }
            </span>
        </>
    )
}
