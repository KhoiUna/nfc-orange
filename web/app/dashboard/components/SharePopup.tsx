'use client'

import { LegacyRef, useEffect, useRef, useState } from "react"
import { Icon } from '@iconify/react';
import { toast } from "react-hot-toast";

type Props = {
    url: string
    togglePopup: () => void
}

export default function SharePopup({ url, togglePopup }: Props) {
    const urlRef = useRef<HTMLParagraphElement>()

    useEffect(() => {
        (document.querySelector('html') as HTMLHtmlElement).style.overflow = 'hidden'

        return () => {
            (document.querySelector('html') as HTMLHtmlElement).style.overflow = 'visible'
        }
    })

    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
        const copyContent = async (content: string) => {
            try {
                await navigator.clipboard.writeText(content);
            } catch (err) {
                toast.error('Failed to copy')
            }
        }

        const content = urlRef.current!.innerText
        copyContent(content)
        setCopied(true)
    }

    return (
        <>
            <div
                className="fixed bg-black opacity-[0.2] w-screen h-screen top-0 cursor-pointer"
                onClick={() => togglePopup()}
            />

            <div className="fixed z-10 rounded-lg bg-white max-w-[500px] m-auto sm:w-screen top-[40vh] left-0 right-0 p-4">
                <p className="font-bold text-center pb-3">Share your profile</p>

                <div className="flex justify-center items-center">
                    <div
                        className="bg-gray-200 max-w-full overflow-hidden whitespace-nowrap p-2 rounded-lg rounded-r-none text-ellipsis"
                    >
                        <p
                            ref={urlRef as LegacyRef<HTMLParagraphElement>}
                        >
                            {url}
                        </p>
                    </div>

                    <button
                        className="flex justify-center items-center border-2 border-slate-200 p-2 rounded-lg rounded-l-none"
                        onClick={handleCopy}
                    >
                        {!copied && <Icon icon="ph:copy" className="text-xl" />}
                        {copied && <Icon icon="material-symbols:check-small-rounded" className="text-xl text-green-600" />}
                    </button>
                </div>
            </div>
        </>
    )
}