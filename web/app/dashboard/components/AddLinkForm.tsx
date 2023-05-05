import { appSubmitButtonStyle, inputStyle } from '@/styles/tailwind';
import { SyntheticEvent, useState } from 'react';

export default function AddLinkForm() {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');

    const handleSubmit = async (event: SyntheticEvent) => {
        try {
            event.preventDefault();

            // TODO:
            // Handle form submission here
            console.log('URL:', url);
            console.log('Title:', title);

            // Reset the form fields
            setUrl('');
            setTitle('');
        } catch (error) {
            console.error('Error adding link');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg mt-5 border-2 border-slate-500 border-dashed max-w-[500px] p-3 mx-auto">
            <div className="mb-4">
                <label htmlFor="title" className="font-bold">
                    Link title:
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className={inputStyle}
                    placeholder="Enter URL"
                    required
                />
            </div>

            <div className='flex flex-row'>
                <button
                    type='button'
                    className={appSubmitButtonStyle + " bg-gray-500 text-white"}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={appSubmitButtonStyle}
                >
                    Add
                </button>
            </div>
        </form>
    );
};
