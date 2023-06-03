'use client'

import useSWR from "swr";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import { swrFetcher } from "@/lib/swrFetcher";
import greetUser from "@/lib/greetUser";
import Link from "next/link";
import AddLinkForm from "./components/AddLinkForm";
import { Link as LinkType, User } from "@/types/types";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import dynamic from 'next/dynamic';
import OrangeLoader from "@/components/ui/OrangeLoader";
import FloatIconButton from "@/components/ui/FloatIconButton";
import SharePopup from "./components/SharePopup";
import useAuth from "@/lib/useAuth";
import usermaven from "@/lib/usermaven";

const BioEditor = dynamic(() => import('./components/BioEditor'), {
    ssr: false,
});

type ApiResponse = {
    success: {
        user: User,
        links: LinkType[]
    };
    error: false | string;
}

type LinkState = LinkType & { isSaved: boolean, isAdded: boolean }

const linksInitialState: LinkState[] = [
    {
        isSaved: false,
        isAdded: false,
        link_title: '',
        url: ''
    }
]

export default function Dashboard() {
    const authUser = useAuth({})
    const { data, error } = useSWR<ApiResponse>("/api/profile", swrFetcher);

    const [showPopup, setShowPopup] = useState(false)
    const togglePopup = () => setShowPopup(!showPopup)

    const [linkState, setLinkState] = useState<LinkState[]>(linksInitialState)
    useEffect(() => {
        setLinkState(linksInitialState)

        if (data?.success) {
            // Track logged_in with Usermaven
            if (process.env.NODE_ENV === "production") {
                const { first_name, last_name, middle_name, id, created_at, email } = data.success.user
                usermaven.track('logged_in')
                usermaven.id({
                    id: id.toString(),
                    email,
                    created_at,
                    first_name,
                    middle_name,
                    last_name
                })
            }

            const newLinkState = data.success.links.filter(item => item.link_title !== 'My Resume').map(item => ({
                ...item,
                isSaved: true,
                isAdded: false,
            }))
            setLinkState(prev => [...newLinkState, ...prev])
        }
    }, [data, authUser.data?.email])

    if (error)
        return (
            <div className="text-[1.8rem] text-center mx-5 pt-5">
                <h1>Failed to load</h1>
            </div>
        );

    if (!data) return <OrangeLoader />

    const addLink = () => {
        setLinkState(prev => [...prev, { ...linksInitialState[0], isAdded: true }])

        // Scroll to bottom
        const html = document.querySelector('html') as HTMLHtmlElement
        setTimeout(() => {
            html.scrollTo(0, html.scrollHeight)
        });
    }

    const cancelLink = (index: number) => setLinkState((prev) => prev.filter((_, i) => i !== index))

    const deleteLink = async (index: number, link_title: string, url: string) => {
        try {
            if (!confirm('Are you sure you want to delete this link?')) return

            const { data } = await axios.delete(`/api/dashboard/link/?link_title=${link_title}&url=${url}`)

            if (data.success) {
                setLinkState((prev) => prev.filter((_, i) => i !== index))
                toast.success('Link deleted!')
            }
        } catch (error) {
            console.error('Error deleting link');
            toast.error('Error deleting link')
        }
    }

    const saveLink = (link_title: string, url: string) => {
        const newLinkState = [...linkState, { link_title, url, isAdded: false, isSaved: true }].map(item => ({
            ...item, isAdded: false
        }))
        setLinkState(newLinkState)
    }

    const { user } = data.success

    const shareURL = `${window.location.origin}/${user.username}`

    const handleClick = () => {
        if (!navigator.share) return togglePopup()

        navigator.share({
            title: `${user.first_name} ${user.middle_name} ${user.last_name} | NFC Orange`,
            url: shareURL
        }).then(() => toast.success('Shared successfully!')).catch(() => null)
    }

    return (
        <div className="pb-5">
            <h2 className="text-xl mx-5 py-7">
                {greetUser(user.first_name)}
            </h2>

            <ProfilePictureUpload user={user} />
            <BioEditor bio={user.bio} />
            <hr className="w-[95%] m-auto" />

            <div className="mt-5 mx-3">
                <Link href={`/resume`} className="contents">
                    <button
                        className="max-w-[500px] mx-auto flex justify-between items-center w-full font-bold mt-5 border-2 border-black drop-shadow-lg p-3 rounded-lg bg-white text-center hover:bg-blue-100"
                    >
                        <div className="flex w-full justify-center">
                            My Resume
                        </div>

                        <span className="bg-blue-100 ml-3 p-3 rounded-lg">
                            <Icon className="text-2xl text-blue-800" icon="ant-design:upload-outlined" />
                        </span>
                    </button>
                </Link>

                {
                    linkState.map((item, index) => {
                        if (item.isSaved && !item.isAdded) return (
                            <button
                                key={index}
                                className="max-w-[500px] mx-auto flex justify-between items-center w-full font-bold mt-5 border-2 border-black drop-shadow-lg p-3 rounded-lg bg-white text-center hover:bg-blue-100"
                            >
                                <Link href={item.url} target="_blank" rel="noreferrer" className="flex w-full justify-center underline">
                                    {item.link_title}
                                    <Icon icon="material-symbols:arrow-outward-rounded" />
                                </Link>

                                <span
                                    className="bg-red-100 ml-3 p-3 rounded-lg hover:bg-red-200"
                                    onClick={() => deleteLink(index, item.link_title, item.url)}
                                >
                                    <Icon className="text-2xl text-red-700" icon="material-symbols:delete-outline" />
                                </span>
                            </button>
                        )

                        return item.isAdded ? <AddLinkForm key={index} user={data.success.user} index={index} removeLink={cancelLink} saveLink={saveLink} link_title={item.link_title} url={item.url} /> : null
                    })
                }

                {/* Only show `Add link` button when there's no current <AddLinkForm />  */}
                {linkState.every(item => item.isAdded === false) &&
                    <button
                        className="bg-slate-100 text-slate-500 h-[75.2px] rounded-lg mt-5 border-2 border-slate-500 border-dashed p-3 block m-auto w-full max-w-[500px] hover:drop-shadow-lg hover:bg-blue-100"
                        onClick={addLink}
                    >
                        + Add link
                    </button>
                }
            </div>

            <FloatIconButton
                className="bg-primary rounded-[100%] w-14 h-14 fixed bottom-2 right-2 drop-shadow-lg flex justify-center items-center"
                onClick={handleClick}
            >
                <Icon className="text-white text-2xl" icon="ph:share-bold" />
            </FloatIconButton>
            <div className="pb-14" />

            {showPopup && <SharePopup url={shareURL} togglePopup={togglePopup} />}
        </div>
    );
}
