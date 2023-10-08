import Image from "next/image";
import Logo from "@/components/Logo";
import HeaderBar from "@/components/ui/HeaderBar";
import Footer from "@/components/ui/Footer";

type ApiResponse = {
    success: {
        count: number
    },
    error: boolean | string
}


export default async function Home() {
    const [userCount] = await Promise.all([getUserCount()])

    return (
        <>
            <HeaderBar />

            <div id='gif-parallax' className="flex justify-between items-center min-h-screen">
                <div className="mx-8">
                    <h1 className="text-4xl text-primary font-bold mt-4 ml-1 flex">
                        Modernize Networking: Embrace the Paperless Revolution.
                    </h1>
                    {/* {userCount > 0 && <h2 className="text-2xl text-primary font-bold mt-4 ml-1 flex">
                        {Math.floor(userCount / 10) * 10 + '+ students and growing'}
                    </h2>} */}

                    <a href={"/waitlist"}>
                        <button className="text-2xl font-bold bg-primary text-white py-2 px-6 rounded-[100px] cursor-pointer mt-7 drop-shadow-lg transition-all hover:shadow-stone-800 hover:shadow-lg">
                            Join waitlist
                        </button>
                    </a>

                    <a href="#benefits">
                        <svg className="m-auto text-primary drop-shadow-lg animate-bounce absolute bottom-4 left-0 right-0" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M10 14a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm1.78-8.841a.75.75 0 0 0-1.06 0l-1.97 1.97V.75a.75.75 0 0 0-1.5 0v6.379l-1.97-1.97a.75.75 0 0 0-1.06 1.06l3.25 3.25L8 10l.53-.53l3.25-3.25a.75.75 0 0 0 0-1.061Z" clipRule="evenodd" /></svg>
                    </a>
                </div>

                <Image priority className="w-[800px] h-screen hidden sm:flow-root" src={'/images/mockup.png'} width={800} height={800} alt="NFC Orange animation" />
            </div>

            <h1 id="benefits" className="bg-slate-50 text-4xl font-bold pt-8 text-center">Benefits</h1>
            <div className="bg-slate-50 flex flex-wrap justify-center items-center pb-6">
                <div className="border-primary rounded-lg text-center border-2 w-[280px] h-[330px] bg-white drop-shadow-lg px-8 py-5 m-6">
                    <div className="flex justify-center text-emerald-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" d="M7.46 9.46c-1.78 1.79-1.91 4.58-.43 6.54c1.53-2.54 3.73-4.64 6.37-6a15.994 15.994 0 0 0-4.88 7.32c.75.43 1.59.68 2.48.68c1.34 0 2.59-.52 3.54-1.46c1.74-1.74 2.81-6.57 3.26-10.33c-3.76.44-8.59 1.51-10.34 3.25z" opacity=".3" /><path fill="currentColor" d="M6.05 8.05a7.007 7.007 0 0 0 0 9.9C7.42 19.32 9.21 20 11 20s3.58-.68 4.95-2.05C19.43 14.47 20 4 20 4S9.53 4.57 6.05 8.05zm8.49 8.49c-.95.94-2.2 1.46-3.54 1.46c-.89 0-1.73-.25-2.48-.68c.92-2.88 2.62-5.41 4.88-7.32c-2.63 1.36-4.84 3.46-6.37 6c-1.48-1.96-1.35-4.75.44-6.54C9.21 7.72 14.04 6.65 17.8 6.2c-.45 3.76-1.52 8.59-3.26 10.34z" /></svg>
                    </div>

                    <p className="font-bold mb-3 text-xl">Eco-Friendly Solution</p>
                    <p className="text-left">Reduce paper waste and embrace a greener approach to networking by using NFC technology instead of physical business cards.</p>
                </div>

                <div className="border-primary rounded-lg text-center border-2 w-[280px] h-[330px] bg-white drop-shadow-lg px-8 py-5 m-6">
                    <div className="flex justify-center text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 2048 2048"><path fill="currentColor" d="M1632 1462q66 33 119 81t90 107t58 128t21 142h-128q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149H896q0-73 20-142t58-128t91-107t119-81q-75-54-117-135t-43-175q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149H128q0-73 20-142t58-128t91-107t119-81q-75-54-117-135t-43-175q0-79 30-149t82-122t122-83T640 0q79 0 149 30t122 82t83 123t30 149q0 94-42 175T864 694q76 38 136 98t98 136q54-75 135-117t175-43q79 0 149 30t122 82t83 123t30 149q0 94-42 175t-118 135zM640 640q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 53 20 99t55 82t81 55t100 20zm768 768q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 53 20 99t55 82t81 55t100 20zm128-1152h-384V128h512v512h-128V256z" /></svg>
                    </div>

                    <p className="font-bold mb-3 text-xl">Seamless Networking</p>
                    <p className="text-left">Connect and engage with like-minded students in the NFC Orange community, fostering collaborations and professional growth.</p>
                </div>

                <div className="border-primary rounded-lg text-center border-2 w-[280px] h-[330px] bg-white drop-shadow-lg px-8 py-5 m-6">
                    <div className="flex justify-center text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 48 48"><mask id="ipTPersonalCollection0"><g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><circle cx="24" cy="11" r="7" fill="#555" /><path d="M4 41c0-8.837 8.059-16 18-16" /><path fill="#555" d="M31.85 28C29.724 28 28 30.009 28 32.486c0 4.487 4.55 8.565 7 9.514c2.45-.949 7-5.027 7-9.514C42 30.01 40.276 28 38.15 28c-1.302 0-2.453.753-3.15 1.906C34.303 28.753 33.152 28 31.85 28Z" /></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTPersonalCollection0)" /></svg>
                    </div>

                    <p className="font-bold mb-3 text-xl">Enhanced Personal Branding</p>
                    <p className="text-left">Showcase your skills and projects with NFC {"Orange's"} digital business card, making a lasting impression on potential connections and employers.</p>
                </div>
            </div>

            <Footer />
        </>
    );
}

async function getUserCount(): Promise<number> {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_ORIGIN + '/api/homepage', { cache: 'no-store' });

        if (!res.ok) throw 'Failed to fetch data'

        const { success, error }: ApiResponse = await res.json()
        if (error) throw 'Failed to fetch data'

        return success.count;
    } catch (error) {
        return 0;
    }
}