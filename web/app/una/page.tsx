'use client'

import { BLUR_DATA_URL } from "@/components/ProfilePictureUpload";
import { appSubmitButtonStyle } from "@/styles/tailwind";
import Image from "next/image";
import LinkEditor, { LinkState } from "./components/LinkEditor";
import { Toaster, toast } from "react-hot-toast";
import NameInput from "./components/NameInput";
import { useState } from "react";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import app from "@/lib/firebase";
import { Icon } from "@iconify/react";
import { Footer } from "../page";

const registerInfoInitialState = {
    email: "",
    major: "",
    expected_grad_date: '',
    university: ''
};

export default function Create() {
    const [registerInfo, setRegisterInfo] = useState(registerInfoInitialState);

    const [next, setNext] = useState(false)

    const handleNext = () => {
        if (typeof window !== 'undefined') {
            const name = localStorage.getItem('create_card_name')
            const linkState: LinkState[] = JSON.parse(localStorage.getItem('create_card_link_state') || '[]')

            if (!name) return toast.error('Please fill in your full name')

            if (linkState.every(link => link.isSaved === false)) return toast.error('Please add at least one link')

            setNext(true)
        }
    }

    const handleChange = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        setRegisterInfo((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
            if (typeof window !== 'undefined') {
                const links: LinkState[] = JSON.parse(localStorage.getItem('create_card_link_state')!)
                const submittedLinks = links.filter(link => link.isSaved === true).map(({ link_title, url }) => ({ link_title, url }))

                const appCheck = initializeAppCheck(app, {
                    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_CLIENT_RECAPTCHA as string),
                    isTokenAutoRefreshEnabled: true
                });
                const db = getFirestore(app);
                await addDoc(collection(db, "new_users"), {
                    user: registerInfo,
                    links: submittedLinks
                });
                localStorage.clear()
                setRegisterInfo(registerInfoInitialState)
                setNext(false)
                toast.success('Your card is successfully submitted! We will work to get you on board soon!')
            }
        } catch (error) {
            console.error('Error submitting');
            toast.error('Error submitting')
        }

    }

    return (
        <>
            <Toaster
                toastOptions={{
                    duration: 10000,
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

            <div
                className="min-w-screen min-h-screen p-3 pt-[20vh]"
                style={{
                    background: 'linear-gradient(225deg, rgba(70, 55, 32, 1) 0%, rgba(220, 119, 0, 1) 35%, rgba(255, 246, 206, 1) 100%)'
                }}
            >
                {!next && (
                    <>
                        <div
                            id="phone"
                            className="m-auto overflow-auto drop-shadow-2xl w-[350px] border-[15px] border-t-[40px] border-black rounded-2xl h-[90vh] bg-slate-50"
                        >
                            <div className="w-full rounded-lg">
                                <div className="w-full h-[150px]">
                                    <div
                                        className="h-full"
                                        style={{
                                            backgroundImage: 'url(/images/animation.gif)',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover'
                                        }}
                                    >
                                        <Image
                                            className="w-[90px] h-[90px] object-scale-down bg-white rounded-[100%] border-2 border-primary relative top-[110px] left-0 right-0 m-auto"
                                            src={'https://ik.imagekit.io/chekchat/default-avatar_TAffG0nED.png'}
                                            alt={`Profile picture`}
                                            width={90}
                                            height={90}
                                            placeholder="blur"
                                            blurDataURL={BLUR_DATA_URL}
                                        />
                                    </div>
                                </div>

                                <div className="text-center mt-[3.5rem] mx-3">
                                    <p className="mt-3">Hi! My name is
                                        <NameInput />
                                        Here are my links:
                                    </p>
                                </div>

                                <div className="my-5 mx-3">
                                    <LinkEditor />
                                </div>
                            </div>
                        </div>

                        <div className="my-5 mx-3">
                            <button
                                className={appSubmitButtonStyle + ' bg-primary text-white font-bold text-xl'}
                                onClick={handleNext}
                            >
                                Next
                                <Icon className="text-2xl" icon="mi:next" />
                            </button>
                        </div>
                    </>
                )}

                {next && (
                    <form className="max-w-[500px] m-auto" onSubmit={handleSubmit}>
                        <h1 className="text-3xl mb-1 text-center font-bold text-white">Final step: Fill this form</h1>
                        <div>
                            <input
                                required
                                onChange={handleChange}
                                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                                type="email"
                                name="email"
                                placeholder="Your email*"
                                value={registerInfo.email}
                            />
                        </div>

                        <div>
                            <input
                                required
                                onChange={handleChange}
                                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                                type="text"
                                name="university"
                                placeholder="University*"
                                value={registerInfo.university}
                            />
                        </div>

                        <div>
                            <input
                                required
                                onChange={handleChange}
                                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                                type="text"
                                name="major"
                                placeholder="Major*"
                                value={registerInfo.major}
                            />
                        </div>

                        <div className="text-left">
                            <label htmlFor="expected_grad_date" className="text-white text-lg font-bold">Expected graduation date*</label>
                            <input
                                id="expected_grad_date"
                                required
                                onChange={handleChange}
                                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                                type="date"
                                name="expected_grad_date"
                                value={registerInfo.expected_grad_date}
                            />
                        </div>

                        <button type="submit" className={appSubmitButtonStyle + ' bg-primary mt-3 text-lg font-bold text-white'}>Claim my card</button>
                    </form>
                )}
            </div>

            <Footer />
        </>
    )
}