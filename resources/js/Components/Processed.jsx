
export default function Processed() {

    return (
        <span
            className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
        >
            <svg viewBox="0 0 6 6" aria-hidden="true"
                 className="size-1.5 fill-green-500">
                <circle r={3} cx={3} cy={3}/>
            </svg>
            Processed
        </span>
    )
}
