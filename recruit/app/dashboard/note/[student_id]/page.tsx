'use client'

import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import useAuth from '@/lib/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TextLoader from '@/components/ui/TextLoader';

export const MAX_WORD_COUNT = 500

type Props = {
    params: {
        student_id: string
    }
}

export default function Note({ params }: Props) {
    useAuth({});

    const router = useRouter()

    const { student_id } = params

    const [note, setNote] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const { data, error } = useQuery({
        queryKey: ["note"],
        queryFn: () => axios.get(`/api/note?student_id=${student_id}`).then((res) => {
            setNote(res.data.success.note || '')
            setWordCount(res.data.success.note.length)

            return res.data.success
        })
    });

    const [editMode, setEditMode] = useState(false)

    const handleSave = async () => {
        try {
            const { data } = await axios.post('/api/note', {
                note, student_id
            })

            if (data.error) throw new Error(data.error)

            toast.success('Save note successfully!')
            setEditMode(false)
        } catch (error: any) {
            toast.error(error.message)
        }
    }


    if (error) return (
        <div className='p-3 pt-5 bg-slate-50 min-h-screen'>
            <button className='rounded-lg text-lg drop-shadow-lg text-white bg-primary p-2 font-semibold' onClick={() => router.back()}>
                {'<'} Back to dashboard
            </button>

            <div className="text-[1.8rem] text-center m-5">
                <h1>Failed to load</h1>
            </div>
        </div>
    );

    if (!data) return (
        <div className='p-3 pt-5 bg-slate-50 min-h-screen'>
            <button className='rounded-lg text-lg drop-shadow-lg text-white bg-primary p-2 font-semibold' onClick={() => router.back()}>
                {'<'} Back to dashboard
            </button>

            <div className="text-[1.8rem] text-center font-bold">
                <TextLoader loadingText="Loading" />
            </div>
        </div>
    )

    const { first_name, middle_name, last_name } = data

    const handleChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLTextAreaElement
        setNote(target.value)
        setWordCount(target.value.length)
    }

    return (
        <div className='p-3 pt-5 bg-slate-50 min-h-screen'>
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: "green",
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "white",
                        },
                    },
                    error: {
                        style: {
                            background: "red",
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "white",
                        },
                    },
                }}
            />

            <button className='rounded-lg text-lg drop-shadow-lg text-white bg-primary p-2 font-semibold' onClick={() => router.back()}>
                {'<'} Back to dashboard
            </button>

            <h1 className='mt-5 font-bold text-center text-lg'>Your note for</h1>
            <h2 className='mt-1 underline font-bold text-center text-xl'>{first_name} {middle_name} {last_name}</h2>
            <p className='text-sm text-center italic mt-1 mb-4'>{'"'}Note is your blank space to note down impressions on the potential candidate.{'"'}</p>

            <div className='mt-3 text-center'>
                <div className="flex justify-between">
                    <p className='text-sm text-left ml-1 mb-1 text-slate-500 underline'>{editMode ? 'Edit mode' : 'Read-only mode'}</p>
                    <p className={`text-sm text-left ml-1 mb-1 ${wordCount > MAX_WORD_COUNT ? 'text-red-500 font-bold' : 'text-slate-500'}`}>{wordCount} / {MAX_WORD_COUNT}</p>
                </div>

                <textarea className={`text-lg p-3 rounded-lg border-2 border-slate-300 w-full ${editMode ? 'bg-white' : 'bg-slate-100'}`}
                    placeholder='Write your note here...'
                    name='note' cols={30} rows={10}
                    value={note}
                    onChange={handleChange}
                    readOnly={!editMode}
                />
            </div>

            {!editMode && <button className='underline mt-3 rounded-lg text-lg drop-shadow-lg text-white bg-primary p-2 font-semibold'
                onClick={() => setEditMode(!editMode)}
            >
                {note.length === 0 ? 'Start writing' : 'Edit'}
            </button>}
            {editMode && (
                <button
                    // disabled={wordCount > MAX_WORD_COUNT}
                    className={`cursor-pointer mt-3 rounded-lg text-lg drop-shadow-lg text-white p-2 font-semibold ${wordCount > MAX_WORD_COUNT ? 'bg-slate-400' : 'bg-primary'}`}
                    onClick={handleSave}
                >
                    Save
                </button>
            )}
        </div>
    )
}