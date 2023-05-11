'use client'

import { appSubmitButtonStyle } from '@/styles/tailwind';
import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import TextLoader from '@/components/ui/TextLoader';
import { User } from '@/types/types';
import sanitizeHtml from 'sanitize-html';

type Props = {
    bio: User['bio']
}

const MAX_WORD_COUNT = 100

export default function BioEditor({ bio }: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const quillRef = useRef<ReactQuill>()

    const [editorValue, setEditorValue] = useState('');
    const updatedEditorValue = useRef('')
    useEffect(() => {
        if (bio) setEditorValue(bio)
    }, [bio])

    const [wordCount, setWordCount] = useState(0)
    const handleChange = (value: string) => {
        const unprivilegedEditor = quillRef.current?.unprivilegedEditor
        const length = unprivilegedEditor?.getLength()

        if (value === '<p><br></p>') {
            setEditorValue('')
            return setWordCount(0)
        }

        setEditorValue(value)
        setWordCount(length ? length - 1 : 0)
    }

    const handleClick = async () => {
        try {
            setIsLoading(true)

            const unprivilegedEditor = quillRef.current?.unprivilegedEditor
            const text = unprivilegedEditor?.getText()

            const { data } = await axios.post('/api/dashboard/bio', { richTextBio: editorValue, text })

            if (data.success) {
                updatedEditorValue.current = sanitizeHtml(editorValue)
                setEditorValue(sanitizeHtml(editorValue))
                setIsLoading(false)
                setIsEditing(false)
                toast.success('Bio saved successfully!')
            }
        } catch (error: any) {
            setIsLoading(false)
            toast.error(error.response.data.error)
        }
    }

    const handleOpen = () => setIsEditing(true)

    if (!editorValue || !bio) return (
        <div className='text-center mb-3 bg-white p-3 mx-3 rounded-lg leading-6'>
            <TextLoader loadingText='Loading' />
        </div>
    )

    if (!editorValue && !isEditing) return (
        <button
            className={appSubmitButtonStyle}
            onClick={handleOpen}
        >
            Add bio
        </button>
    )

    if (editorValue && !isEditing) return (
        <div
            id='bio'
            className='text-center mb-3 bg-white p-3 mx-3 rounded-lg leading-6'
        >
            <p dangerouslySetInnerHTML={{ __html: editorValue }} />
            <button
                className={appSubmitButtonStyle + ' mb-0 mt-3'}
                onClick={() => setIsEditing(!isEditing)}
            >
                Edit bio
            </button>
        </div>
    )

    const handleClose = () => {
        setEditorValue(updatedEditorValue.current || (bio || ''))
        setIsEditing(!isEditing)
    }

    const buttonDisabled = editorValue === bio || editorValue === updatedEditorValue.current || wordCount > MAX_WORD_COUNT

    return (
        <div className="mx-3 mb-4 bg-white p-3 rounded-lg drop-shadow-lg">
            <ReactQuill
                theme="snow"
                value={editorValue}
                onChange={handleChange}
                // @ts-ignore
                ref={quillRef}
            />
            <p
                className={`text-sm text-right mt-1 ${buttonDisabled && 'text-slate-500'}`}
            >
                {wordCount} / {MAX_WORD_COUNT}
            </p>

            <div className='flex justify-between mt-3'>
                <button
                    type='button'
                    className={appSubmitButtonStyle + " bg-gray-500 text-white"}
                    onClick={handleClose}
                >
                    Close
                </button>

                <button
                    className={appSubmitButtonStyle + `${buttonDisabled ? ' text-slate-500 bg-slate-200' : ' text-blue-800 bg-blue-100'}`}
                    disabled={buttonDisabled}
                    onClick={handleClick}
                >
                    {isLoading && <TextLoader loadingText='Saving' />}
                    {!isLoading && 'Save'}
                </button>
            </div>
        </div >
    )
}