'use client'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import useSWR from "swr";
import { swrFetcher } from "@/lib/swrFetcher";
import OrangeLoader from "@/components/ui/OrangeLoader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Link, User } from "@/types/types";
import { Icon } from "@iconify/react";

Chart.register(CategoryScale);

type ProfileApiResponse = {
    success: {
        user: User
        video_link: Link | null
        links: Link[],
    },
    error: string | boolean
}

type History = {
    date: string
    count: number
}[]

type ApiResponse = {
    success: false | {
        profileViewHistory: History
        cardTapHistory: History
        qrHistory: History
    }
    error: string | boolean
}

export default async function Analytics() {
    const { data: profileData, error: profileError } = useSWR<ProfileApiResponse>(`/api/profile`, swrFetcher)

    const { data: analyticsData, error } = useSWR<ApiResponse>(profileData?.success.user.is_premium ? `/api/analytics` : null, swrFetcher)

    if (error || profileError) return <ErrorMessage />

    if (!profileData?.success.user.is_premium) return (
        <div className="font-semibold text-center from-primary to-[#FFF0C3] bg-gradient-to-b pt-8 text-2xl min-h-screen">
            <p className="text-white">This feature is only for Premium Users.</p>
            <p className="text-white">Please subscribe.</p>
            <div className="mt-3 drop-shadow-lg">
                {/* @ts-ignore */}
                <stripe-buy-button
                    buy-button-id="buy_btn_1NEkhfDjwiDsyRPr6Gn3NSnN"
                    publishable-key="pk_live_51NEGB0DjwiDsyRPrty0AvEErWGKtd5nUrwKyoY8AjXHxU5Obo4rcT8woJjh2o48ojYJruOUHtmAN8Matp5clkKse00UZDv5Oic"
                />
            </div>
            <Icon className="text-7xl m-auto mt-5 text-white drop-shadow-lg" icon="ic:round-lock" />
        </div>
    )

    if (!analyticsData || !profileData || profileData.error) return <OrangeLoader />


    if (analyticsData.success === false) return <ErrorMessage />

    const profileViewChartData = analyticsData.success.profileViewHistory.map(({ date, count }) => ({
        date: new Date(date).toLocaleDateString(),
        count
    }))
    const qrChartData = analyticsData.success.qrHistory.map(({ date, count }) => ({
        date: new Date(date).toLocaleDateString(),
        count
    }))
    const cardTapChartData = analyticsData.success.cardTapHistory?.map(({ date, count }) => ({
        date: new Date(date).toLocaleDateString(),
        count
    }))

    return (
        <div className="max-w-[800px] min-h-screen m-auto bg-slate-50">
            <h1 className="text-center font-bold pt-5">Profile Views</h1>
            <Line
                className="p-3"
                data={{
                    labels: profileViewChartData.map(({ date }) => date),
                    datasets: [{
                        label: 'Profile Views',
                        data: profileViewChartData.map(({ count }) => count),
                        borderWidth: 2,
                        borderColor: '#DC7700',
                        backgroundColor: 'RGBA(220, 119, 0, 0.1)',
                        fill: true,
                        tension: 0.5
                    }]
                }}

                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Profile Views"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />

            <h1 className="text-center font-bold pt-5">QR Code Scans</h1>
            <Line
                className="p-3"
                data={{
                    labels: qrChartData.map(({ date }) => date),
                    datasets: [{
                        label: 'QR Code Scans',
                        data: qrChartData.map(({ count }) => count),
                        borderWidth: 2,
                        borderColor: 'RGBA(70, 55, 32, 1)',
                        backgroundColor: 'RGBA(70, 55, 32, 0.1)',
                        fill: true,
                        tension: 0.5
                    }]
                }}

                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "QR Code Scans"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />

            <h1 className="text-center font-bold pt-5">Card Taps</h1>
            {!profileData.success.user.card_id && (
                <div className="rounded-lg drop-shadow-lg mx-3 font-semibold text-center bg-primary p-3 mt-3">
                    <p className="text-white">You do not have a NFC Orange card to use this chart.</p>
                </div>
            )}
            {profileData.success.user.card_id && <Line
                className="p-3"
                data={{
                    labels: cardTapChartData.map(({ date }) => date),
                    datasets: [{
                        label: 'Card Taps',
                        data: cardTapChartData.map(({ count }) => count),
                        borderWidth: 2,
                        borderColor: 'rgb(25,64,255)',
                        backgroundColor: 'rgba(25,64,255,0.1)',
                        fill: true,
                        tension: 0.5
                    }]
                }}

                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Card Taps"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />}
        </div>
    )
}