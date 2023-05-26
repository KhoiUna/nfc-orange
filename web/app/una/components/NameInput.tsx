'use client'

import { inputStyle } from "@/styles/tailwind";
import { useEffect, useState } from "react";

export default function NameInput() {
    const [name, setName] = useState(localStorage.getItem('create_card_name') || '')

    useEffect(() => {
        if (name) localStorage.setItem('create_card_name', name)
    }, [name])

    return <input value={name} onChange={({ target }) => setName(target.value)} className={inputStyle + ' text-sm'} type="text" placeholder="Please type your full name" />
}