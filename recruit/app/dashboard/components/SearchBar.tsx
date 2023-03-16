import { Icon } from "@iconify/react";
import { SyntheticEvent, useEffect } from "react"

interface Props {
    searchStudents: (event: SyntheticEvent) => void
}

export default function SearchBar({
    searchStudents
}: Props) {
    useEffect(() => {
        const focusSearchBar = (event: KeyboardEvent) => {
            if (event.key === '/') {
                const searchBar = document.querySelector('#search_bar') as HTMLInputElement
                searchBar.focus()
            }
        }

        window.addEventListener('keyup', focusSearchBar)

        return () => {
            window.removeEventListener('keyup', focusSearchBar)
        }
    }, []);

    return (
        <div className="flex items-center justify-between border-2 border-slate-500 bg-slate-50 mx-3 rounded-lg px-2">
            <Icon className="text-lg text-slate-500" icon="material-symbols:search-rounded" />

            <input
                onChange={searchStudents}
                id="search_bar" className="w-full p-2 focus:outline-none bg-slate-50" type="text"
                placeholder="Search major, university, name..." />

            <span className="bg-primary text-white px-3 py-1 font-bold rounded-md hidden sm:block">/</span>
        </div>
    )
}