import { BLUR_DATA_URL } from "@/components/ProfilePictureUpload"
import { User } from "@/types/types"
import Image from "next/image"
import Link from "next/link"
import usermaven from "@/lib/usermaven";

type Props = {
    url: string
    user: User
    togglePopup: () => void
}

export default function AddToHomeScreen({ user, url, togglePopup }: Props) {
    const handleClick = () => {
        // Track `added_to_homescreen` with Usermaven
        if (process.env.NODE_ENV === "production") {
            const { first_name, last_name, middle_name, id, created_at, email } = user
            usermaven.track('added_to_homescreen')
            usermaven.id({
                id: id.toString(),
                email,
                created_at,
                first_name,
                middle_name,
                last_name
            })
        }
        togglePopup()
    }

    return (
        <>
            <div className="fixed bg-black opacity-[0.5] w-screen h-screen top-0" />

            <div className="fixed z-10 rounded-lg bg-white max-w-[500px] h-[550px] overflow-auto mx-3 sm:m-auto sm:w-screen top-[12vh] left-0 right-0 p-4 drop-shadow-lg">
                <p className="text-xl font-bold text-center px-3">Save digital card to your phone</p>
                <p className="mt-3">1. Go to view your digital card <Link className="text-blue-800 underline font-semibold" href={url} target='_blank'>here</Link>.</p>

                <div className="mt-3">
                    <p>2. Tap on your {"browser's"} <span className="italic">Share</span> button.</p>
                    <Image
                        className="mt-3 mx-auto drop-shadow-lg rounded-lg w-auto"
                        src={'/images/share-button.jpeg'}
                        alt="Phone's share button"
                        width={250}
                        height={250}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                    />
                </div>

                <div className="mt-3">
                    <p>2. Tap <span className="italic">Add to Home Screen</span>. Then, {"you're"} done!</p>
                    <Image
                        className="mt-3 mx-auto drop-shadow-lg rounded-lg w-auto"
                        src={'/images/add-to-homescreen.jpeg'}
                        alt="Phone's share button"
                        width={250}
                        height={250}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                    />
                </div>

                <div className="text-center mt-3">
                    <button
                        onClick={handleClick}
                        className="bg-primary p-3 rounded-lg drop-shadow-lg text-white font-bold">Done</button>
                </div>
            </div>
        </>
    )
}