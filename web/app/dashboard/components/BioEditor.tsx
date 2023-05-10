import { appSubmitButtonStyle } from '@/styles/tailwind';
import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import TextLoader from '@/components/ui/TextLoader';
import { User } from '@/types/types';

type Props = {
    bio: User['bio']
}

const MAX_WORD_COUNT = 100

export default function BioEditor({ bio }: Props) {
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const quillRef = useRef<ReactQuill>()

    const [editorValue, setEditorValue] = useState('');
    useEffect(() => {
        if (bio) setEditorValue(bio)
    }, [bio])

    const [wordCount, setWordCount] = useState(0)
    const handleChange = (value: string) => {
        setEditorValue(value)

        const unprivilegedEditor = quillRef.current?.unprivilegedEditor
        const length = unprivilegedEditor?.getLength() as number
        setWordCount(length)
    }

    const handleClick = async () => {
        try {
            setIsLoading(true)

            const unprivilegedEditor = quillRef.current?.unprivilegedEditor

            const { data } = await axios.post('/api/dashboard/bio', { richTextBio: editorValue, text: unprivilegedEditor?.getText() })

            if (data.success) {
                setIsLoading(false)
                setIsEditing(false)
                toast.success('Bio saved successfully!')
            }
        } catch (error: any) {
            setIsLoading(false)
            toast.error(error.response.data.error)
        }
    }

    if (!editorValue && !isEditing) return (
        <button
            className={appSubmitButtonStyle}
            onClick={() => setIsEditing(true)}
        >
            Add bio
        </button>
    )

    if (!isEditing) return (
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

    const isDisabled = editorValue === bio || wordCount > MAX_WORD_COUNT

    return (
        <div className="mx-3 mb-3 bg-white p-3 rounded-lg">
            <ReactQuill
                className='drop-shadow-lg'
                theme="snow"
                value={editorValue}
                onChange={handleChange}
                // @ts-ignore
                ref={quillRef}
            />
            <p
                className={`text-sm text-right mt-1 ${isDisabled && 'text-slate-500'}`}
            >
                {wordCount} / {MAX_WORD_COUNT}
            </p>

            <div className='flex justify-between mt-3'>
                <button
                    type='button'
                    className={appSubmitButtonStyle + " bg-gray-500 text-white"}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    Close
                </button>

                <button
                    className={appSubmitButtonStyle + `${isDisabled ? ' text-slate-500 bg-slate-200' : ' text-blue-800 bg-blue-100'}`}
                    disabled={isDisabled}
                    onClick={handleClick}
                >
                    {isLoading && <TextLoader loadingText='Saving' />}
                    {!isLoading && 'Save'}
                </button>
            </div>
        </div>
    )
}