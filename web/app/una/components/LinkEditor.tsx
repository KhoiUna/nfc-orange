'use client'

import { appSubmitButtonStyle, inputStyle } from "@/styles/tailwind"
import { Link as LinkType } from "@/types/types"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { SyntheticEvent, useEffect, useState } from "react"
import { Toaster, toast } from "react-hot-toast"

type LinkState = LinkType & { isSaved: boolean, isAdded: boolean }

const linksInitialState: LinkState[] = [
    {
        isSaved: false,
        isAdded: false,
        link_title: '',
        url: ''
    }
]

export default function LinkEditor() {
    const [linkState, setLinkState] = useState<LinkState[]>(JSON.parse(localStorage.getItem('created_link_state')!) || linksInitialState)
    useEffect(() => {
        if (linkState.length > 1) localStorage.setItem('created_link_state', JSON.stringify(linkState))
    }, [linkState])

    const addLink = () => {
        setLinkState(prev => [...prev, { ...linksInitialState[0], isAdded: true }])

        // Scroll to bottom
        const html = document.querySelector('#phone') as HTMLDivElement
        setTimeout(() => {
            html.scrollTo(0, html.scrollHeight)
        });
    }

    const cancelLink = (index: number) => setLinkState((prev) => prev.filter((_, i) => i !== index))

    const deleteLink = async (index: number) => {
        setLinkState((prev) => prev.filter((_, i) => i !== index))
    }

    const saveLink = (link_title: string, url: string) => {
        const newLinkState = [...linkState, { link_title, url, isAdded: false, isSaved: true }].map(item => ({
            ...item, isAdded: false
        }))
        setLinkState(newLinkState)
    }

    return (
        <>
            <button
                className="max-w-[500px] mx-auto w-full font-bold text-sm border-2 border-black drop-shadow-lg p-3 rounded-lg bg-white text-center hover:bg-blue-100"
            >
                My Resume
            </button>

            {
                linkState.map((item, index) => {
                    if (item.isSaved && !item.isAdded) return (
                        <button
                            key={index}
                            className="max-w-[500px] mx-auto flex justify-between items-center w-full font-bold mt-5 border-2 border-black drop-shadow-lg p-2 rounded-lg bg-white text-center hover:bg-blue-100"
                        >
                            <Link href={item.url} target="_blank" rel="noreferrer" className="flex w-full justify-center underline text-sm">
                                {item.link_title}
                                <Icon icon="material-symbols:arrow-outward-rounded" />
                            </Link>

                            <span
                                className="bg-red-100 ml-3 p-3 rounded-lg hover:bg-red-200"
                                onClick={() => deleteLink(index)}
                            >
                                <Icon className="text-md text-red-700" icon="material-symbols:delete-outline" />
                            </span>
                        </button>
                    )

                    return item.isAdded ? <AddLinkForm key={index} index={index} removeLink={cancelLink} saveLink={saveLink} link_title={item.link_title} url={item.url} /> : null
                })
            }

            {/* Only show `Add link` button when there's no current <AddLinkForm />  */}
            {linkState.every(item => item.isAdded === false) &&
                <button
                    className="bg-slate-100 text-slate-500 text-sm h-[59.2px] rounded-lg mt-5 border-2 border-slate-500 border-dashed p-3 block m-auto w-full max-w-[500px] hover:drop-shadow-lg hover:bg-blue-100"
                    onClick={addLink}
                >
                    + Add link
                </button>
            }
        </>
    )
}

type Props = {
    index: number
    link_title: string
    url: string
    removeLink: (index: number) => void
    saveLink: (link_title: string, url: string) => void
}

const formInitialState = {
    url: '',
    link_title: ''
}

function AddLinkForm({ index, removeLink, saveLink, link_title, url }: Props) {
    const [form, setForm] = useState(formInitialState)

    const handleChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        setForm(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault()
        try {
            // Validate URL
            new URL(form.url)

            saveLink(form.link_title, form.url)
            setForm(formInitialState)
            toast.success('Link added successfully')
        } catch (error) {
            toast.error('Invalid URL')
        }

    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg mt-5 border-2 border-slate-500 border-dashed max-w-[500px] p-3 mx-auto drop-shadow-lg">
            <div className="mb-2">
                <label htmlFor="link_title" className="font-bold text-sm">
                    Link title:
                </label>
                <input
                    type="text"
                    id="link_title"
                    name='link_title'
                    value={link_title || form.link_title}
                    onChange={handleChange}
                    className={inputStyle + ' text-sm mt-1'}
                    placeholder="Enter link title"
                    required
                />
            </div>

            <div className="mb-2">
                <label htmlFor="url" className="font-bold text-sm">
                    URL: (https://...)
                </label>
                <input
                    type="text"
                    id="url"
                    name='url'
                    value={url || form.url}
                    onChange={handleChange}
                    className={inputStyle + ' text-sm mt-1'}
                    placeholder="Enter URL"
                    required
                />
            </div>

            <div className='flex flex-row'>
                <button
                    type='button'
                    className={appSubmitButtonStyle + " bg-gray-500 text-white text-sm"}
                    onClick={() => removeLink(index)}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={appSubmitButtonStyle + ' text-sm'}
                >
                    Add
                </button>
            </div>
        </form>
    );
};