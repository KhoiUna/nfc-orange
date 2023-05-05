'use client'

import TextLoader from '@/components/ui/TextLoader';
import { appSubmitButtonStyle, inputStyle } from '@/styles/tailwind';
import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { toast } from "react-hot-toast";

type Props = {
    index: number,
    link_title: string
    url: string
    removeLink: (index: number) => void
    saveLink: (link_title: string, url: string) => void
}

const formInitialState = {
    url: '',
    link_title: ''
}

export default function AddLinkForm({ index, removeLink, saveLink, link_title, url }: Props) {
    const [form, setForm] = useState(formInitialState)

    const handleChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        setForm(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (event: SyntheticEvent) => {
        try {
            event.preventDefault()
            setIsLoading(true)

            const { data } = await axios.post('/api/dashboard/link', form)

            if (data.success) {
                saveLink(form.link_title, form.url)
                setIsLoading(false)
                setForm(formInitialState)
                toast.success('Link added successfully!')
            }
        } catch (error: any) {
            console.error(error.response.data.error);
            toast.error(error.response.data.error)
            setIsLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg mt-5 border-2 border-slate-500 border-dashed max-w-[500px] p-3 mx-auto drop-shadow-lg">
            <div className="mb-4">
                <label htmlFor="link_title" className="font-bold">
                    Link title:
                </label>
                <input
                    type="text"
                    id="link_title"
                    name='link_title'
                    value={link_title || form.link_title}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Enter link title"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="url" className="font-bold">
                    URL:
                </label>
                <input
                    type="text"
                    id="url"
                    name='url'
                    value={url || form.url}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder="Enter URL"
                    required
                />
            </div>

            <div className='flex flex-row'>
                <button
                    type='button'
                    className={appSubmitButtonStyle + " bg-gray-500 text-white"}
                    onClick={() => removeLink(index)}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={appSubmitButtonStyle}
                >
                    {!isLoading && "Add"}
                    {isLoading && <TextLoader loadingText="Adding" />}
                </button>
            </div>
        </form>
    );
};
