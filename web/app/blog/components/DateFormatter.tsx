import { parseISO, format } from 'date-fns'

type Props = {
    dateString: string
}

export default function DateFormatter({ dateString }: Props) {
    const date = parseISO(dateString)
    return <time className="text-slate-400" dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
