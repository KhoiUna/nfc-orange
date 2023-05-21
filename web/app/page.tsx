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
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
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
                    <h1
                        className="text-4xl text-primary font-bold px-1">
                        Online identity with a card tap
                    </h1>

                    <h2 className="text-5xl text-primary font-bold mt-4 ml-1 flex">
                        Get one & join our student community
                    </h2>
                    {userCount > 0 && <h3 className="text-3xl text-primary font-bold mt-4 ml-1 flex">
                        {Math.floor(userCount / 10) * 10 + '+ students and growing'}
                    </h3>}

                    <a href={"/waitlist"}>
                        <button className="text-xl font-bold bg-primary text-white py-2 px-6 rounded-[100px] cursor-pointer mt-7 transition-all hover:shadow-stone-800 hover:shadow-lg">
                            Join waitlist
                        </button>
                    </a>
                </div>

                <Image priority className="w-[450px] h-screen hidden sm:flow-root" src={'/images/animation-vertical.webp'} width={1080} height={1920} alt="NFC Orange animation" />
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