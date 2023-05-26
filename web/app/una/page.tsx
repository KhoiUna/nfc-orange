import { BLUR_DATA_URL } from "@/components/ProfilePictureUpload";
import HeaderBar from "@/components/ui/HeaderBar";
import { inputStyle } from "@/styles/tailwind";
import Image from "next/image";
import LinkEditor from "./components/LinkEditor";
import { Toaster } from "react-hot-toast";

export const metadata = {
    title: 'Create your card | NFC Orange',
    description: 'NFC Orange | Create your own digital business card for University of North Alabama students.',
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
}

export default function page() {
    return (
        <>
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

            <HeaderBar />

            <div
                className="min-w-screen min-h-screen p-3 pt-[20vh]"
                style={{
                    background: 'linear-gradient(225deg, rgba(70, 55, 32, 1) 0%, rgba(220, 119, 0, 1) 35%, rgba(255, 246, 206, 1) 100%)'
                }}
            >
                <div
                    id="phone"
                    className="m-auto overflow-auto drop-shadow-2xl w-[350px] border-[15px] border-t-[40px] border-black rounded-2xl h-[90vh] bg-slate-50"
                >
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
                            <input className={inputStyle + ' text-sm'} type="text" placeholder="Please type your full name" />
                            Here are my links:
                        </p>
                    </div>

                    <div className="my-5 mx-3">
                        <LinkEditor />
                    </div>
                </div>
            </div>
        </>
    )
}