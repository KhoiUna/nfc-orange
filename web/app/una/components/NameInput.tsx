'use client'

import { inputStyle } from "@/styles/tailwind";
import { useEffect, useRef, useState } from "react";

export default function NameInput() {
    const [name, setName] = useState('')
    const firstLoad = useRef(true)

    useEffect(() => {
        if (firstLoad.current && localStorage.getItem('create_card_name')) setName(localStorage.getItem('create_card_name')!)

        return () => {
            firstLoad.current = false
        }
    }, [])

    useEffect(() => {
        if (!firstLoad.current) localStorage.setItem('create_card_name', name)
    }, [name])

    return <input autoComplete="off" value={name} onChange={({ target }) => setName(target.value)} className={inputStyle + ' text-sm'} type="text" placeholder="Please type your full name" />
}