'use client';

import useSWR from "swr";
import TextLoader from "@/components/ui/TextLoader";
import { swrFetcher } from "@/lib/swrFetcher";
import useAuth from "@/lib/useAuth"
import ProfilePictureUpload from "@/components/ProfilePictureUpload";
import { SyntheticEvent, useState } from "react";
import { appSubmitButtonStyle, inputStyle } from "@/styles/tailwind";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, User } from "@/types/types";
import OrangeLoader from "@/components/ui/OrangeLoader";

type ApiResponse = {
    success: {
        user: User,
        resume_link: string,
        links: Link[]
    },
    error: boolean | string,
}

const updatePasswordFormInitialState = {
    current_password: '',
    new_password: '',
    confirm_new_password: '',
}

export default function Profile() {
    const authData = useAuth({});

    const [isLoading, setIsLoading] = useState(false)
    const [updatePasswordForm, setUpdatePasswordForm] = useState(updatePasswordFormInitialState)

    const { data: profileResponse, error } = useSWR<ApiResponse, any>("/api/profile", swrFetcher);

    if (error) return (
        <div className="text-[1.8rem] text-center m-5">
            <h1>Failed to load</h1>
        </div>
    );

    if (!profileResponse) return <OrangeLoader />

    const { user } = profileResponse.success

    const handleChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        setUpdatePasswordForm(prev => ({ ...prev, [target.name]: target.value }))
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        try {
            event.preventDefault()
            setIsLoading(true)

            const { data } = await axios.post('/api/profile/update_password', updatePasswordForm)

            if (data.success) {
                setIsLoading(false)
                setUpdatePasswordForm(updatePasswordFormInitialState)
                toast.success('Update password successfully!')
            }
        } catch (error: any) {
            console.error(error.response.data.error);
            toast.error(error.response.data.error)
            setIsLoading(false)
        }
    }

    return (
        <div className="m-auto w-fit py-10">
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

            <ProfilePictureUpload user={user} />

            <div className="text-lg">
                <p><b>First Name:</b> {user.first_name}</p>
                {user.middle_name && <p><b>Middle Name:</b> {user.middle_name}</p>}
                <p><b>Last Name:</b> {user.last_name}</p>
                <p><b>Plan:</b> {user.is_premium ? 'Premium' : 'Free'}</p>
            </div>
            <hr className="mt-3" />

            <form className="text-lg mt-2" onSubmit={handleSubmit}>
                <p className="text-center text-xl font-bold mt-4 mb-2">Account info</p>

                <p><b>Username:</b> {user.username}</p>
                <p><b>Email:</b> {authData.data?.email}</p>
                <p><b>Phone Number:</b> {user.phone_number}</p>
                <hr className="my-3" />

                <div>
                    <label className="font-bold" htmlFor="current_password">Current password</label>
                    <br />
                    <input
                        required
                        id="current_password"
                        name="current_password"
                        className={inputStyle}
                        placeholder="Current password*"
                        type="password"
                        value={updatePasswordForm.current_password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="font-bold" htmlFor="new_password">New password</label>
                    <br />
                    <input
                        required
                        id="new_password"
                        name="new_password"
                        className={inputStyle}
                        placeholder="New password*"
                        type="password"
                        value={updatePasswordForm.new_password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="font-bold" htmlFor="confirm_new_password">Confirm new password</label>
                    <br />
                    <input
                        required
                        id="confirm_new_password"
                        name="confirm_new_password"
                        className={inputStyle}
                        placeholder="Retype new password*"
                        type="password"
                        value={updatePasswordForm.confirm_new_password}
                        onChange={handleChange}
                    />
                </div>

                <button
                    className={appSubmitButtonStyle + " mt-2"}
                    type="submit"
                >
                    {!isLoading && "Submit"}
                    {isLoading && <TextLoader loadingText="Submitting" />}
                </button>
            </form>
        </div>
    )
}