'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import useAuth from '@/lib/useAuth';

export default function Note({ params }) {
    useAuth({});

    const router = useRouter()

    const { student_id } = params

    const [editMode, setEditMode] = useState(false)

    const [note, setNote] = useState('')
    const handleSave = async () => {
        try {
            console.log(student_id, note)

            // TODO: POST to api
            //

            toast.success('Save note successfully!')
            setEditMode(false)
        } catch (error) {
            toast.error('Error saving note')
            return false
        }
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

            <h1 className='mt-5 font-bold text-center text-3xl'>Your note</h1>
            <p className='text-sm text-center italic mt-1 mb-4'>{'"'}Note is your blank space to note down impressions on the potential candidate.{'"'}</p>

            <div className='mt-3 text-center'>
                <p className='text-sm text-left ml-1 mb-1 text-slate-500 underline'>{editMode ? 'Edit mode' : 'Read-only mode'}</p>
                <textarea className={`text-lg p-3 rounded-lg border-2 border-slate-300 w-full ${editMode ? 'bg-white' : 'bg-slate-100'}`}
                    placeholder='Write your note here...'
                    name='note' cols={30} rows={10}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    readOnly={!editMode}
                />
            </div>

            {!editMode && <button className='underline mt-3 rounded-lg text-lg drop-shadow-lg text-white bg-primary p-2 font-semibold'
                onClick={() => setEditMode(!editMode)}
            >
                {note.length === 0 ? 'Start writing' : 'Edit'}
            </button>}
            {editMode && <button className='mt-3 rounded-lg text-lg drop-shadow-lg text-white bg-primary p-2 font-semibold'
                onClick={handleSave}
            >
                Save
            </button>}
        </div>
    )
}