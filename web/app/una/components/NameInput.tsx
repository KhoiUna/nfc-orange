'use client'

import { inputStyle } from "@/styles/tailwind";
import { useEffect, useState } from "react";

export default function NameInput() {
    const [name, setName] = useState('')

    useEffect(() => {
        if (name) return localStorage.setItem('create_card_name', name)
        if (localStorage.getItem('create_card_name')) return setName(localStorage.getItem('create_card_name')!)
    }, [name])

    return <input autoComplete="off" value={name} onChange={({ target }) => setName(target.value)} className={inputStyle + ' text-sm'} type="text" placeholder="Please type your full name" />
}