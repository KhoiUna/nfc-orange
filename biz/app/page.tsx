'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import TextLoader from "@/components/ui/TextLoader";
import useAuth from "@/lib/useAuth";
import Logo from "@/components/Logo";

export const Footer = () => (
    <footer className="bg-primary py-[5%] px-[10%]">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <div className="w-[12rem] h-fit">
                        <Logo />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 sm:gap-6">
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

                    <div>
                        <h2 className="mb-4 text-sm font-bold uppercase text-white">Contact</h2>
                        <ul className="text-white font-medium">
                            <li className="mb-2">
                                <a href="mailto:contact@mg.nfcorange.com" className="hover:underline">Email us</a>
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

const loginInfoInitialState = {
    email: "",
    password: "",
};

export default function Login() {
    useAuth({ redirectIfFound: true });

    const router = useRouter();

    const [loginInfo, setLoginInfo] = useState(loginInfoInitialState);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({
        error: false,
        text: "",
    });

    const handleChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        setStatus({
            error: false,
            text: "",
        });
        setLoginInfo((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event: SyntheticEvent) => {
        try {
            event.preventDefault();
            setIsLoading(true);

            const { error } = await (
                await fetch("/api/login", {
                    method: "POST",
                    headers: new Headers({
                        "content-type": "application/json",
                    }),
                    body: JSON.stringify(loginInfo),
                })
            ).json();

            if (error) throw error;

            router.push("/dashboard");
            return true;
        } catch (error) {
            console.error("Error logging in");
            setIsLoading(false);
            setStatus({
                error: true,
                text: error as string,
            });
            return false;
        }
    };

    return (
        <div id="parallax" className="text-center p-6 m-auto min-h-[80vh]">
            <div className="w-full p-6 mt-[7rem] rounded-lg max-w-[450px] mx-auto">
                <h1
                    className="text-[2.5rem] font-bold mx-auto my-3 text-white"
                    style={{
                        textShadow: "2px 8px 2px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    Login
                </h1>

                <div className="max-w-[500px] m-auto">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                onChange={handleChange}
                                value={loginInfo.email}
                                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                        </div>

                        <div>
                            <input
                                onChange={handleChange}
                                value={loginInfo.password}
                                className="border-2 my-3 p-2 rounded-lg w-full drop-shadow-lg text-[1.3rem]"
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>

                        <div className="my-5 drop-shadow-lg">
                            <button
                                className="bg-primary text-[1.3rem] text-white rounded-lg p-2 border border-black shadow-stone-800 shadow-lg"
                                type="submit"
                            >
                                {!isLoading && "Login"}
                                {isLoading && <TextLoader loadingText="Login" />}
                            </button>
                        </div>

                        {status.text && (
                            <p
                                className={`${status.error === true ? "text-red-600" : "text-green-600"
                                    } text-[1.3rem] p-2 font-bold my-1`}
                            >
                                {status.text}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
