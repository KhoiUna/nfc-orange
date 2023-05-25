import Image from "next/image";
import Logo from "@/components/Logo";
import HeaderBar from "@/components/ui/HeaderBar";

type ApiResponse = {
    success: {
        count: number
    },
    error: boolean | string
}

export const Footer = () => (
    <footer className="bg-primary py-[5%] px-[10%]">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <div className="w-[12rem] h-fit">
                        <Logo />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 sm:gap-6">
                    {/* CHANGE: Uncomment for addition section */}
                    {/* <div>
                                <h2 className="mb-4 text-sm font-bold uppercase text-white">Resources</h2>
                                <ul className="text-white font-medium">
                                    <li className="mb-2">
                                        <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                                    </li>
                                    <li>
                                        <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                                    </li>
                                </ul>
                            </div> */}

                    <div>
                        <h2 className="mb-4 text-sm font-bold uppercase text-white">Follow us</h2>
                        <ul className="text-white font-medium">
                            <li className="mb-2">
                                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/nfc_orange/" className="hover:underline ">Instagram</a>
                            </li>
                            <li>
                                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/nfc-orange/" className="hover:underline">LinkedIn</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-4 text-sm font-bold uppercase text-white">Legal</h2>
                        <ul className="text-white font-medium">
                            <li className="mb-2">
                                <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sm:flex sm:items-center sm:justify-between pt-[4rem]">
                <span className="text-sm sm:text-center text-white">© {new Date().getFullYear()} <a href="https://www.nfcorange.com/" className="hover:underline">NFC Orange™</a>. All Rights Reserved.</span>

                <div className="flex items-center mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a href="https://www.instagram.com/nfc_orange/" target="_blank" rel="noreferrer" className="text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Instagram</span>
                    </a>
                    <a href="https://www.linkedin.com/company/nfc-orange/" target="_blank" rel="noreferrer" className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" /></svg>
                        <span className="sr-only">LinkedIn</span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
)

export default async function Home() {
    const [userCount] = await Promise.all([getUserCount()])

    return (
        <>
            <HeaderBar />

            <div id='gif-parallax' className="flex justify-between items-center min-h-screen">
                <div className="mx-8">
                    <h1 className="text-4xl text-primary font-bold mt-4 ml-1 flex">
                        Get your digital business card & join our student community
                    </h1>
                    {userCount > 0 && <h2 className="text-2xl text-primary font-bold mt-4 ml-1 flex">
                        {Math.floor(userCount / 10) * 10 + '+ students and growing'}
                    </h2>}

                    <a href={"/waitlist"}>
                        <button className="text-2xl font-bold bg-primary text-white py-2 px-6 rounded-[100px] cursor-pointer mt-7 transition-all hover:shadow-stone-800 hover:shadow-lg">
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