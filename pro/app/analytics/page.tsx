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

type ApiResponse = {
    success: {
        date: string
        count: number
    }[] | false
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
            <Icon className="text-7xl m-auto mt-5 text-white drop-shadow-lg" icon="ic:round-lock" />
        </div>
    )

    if (!analyticsData || !profileData) return <OrangeLoader />


    if (analyticsData.success === false) return <ErrorMessage />

    const chartData = analyticsData.success.map(({ date, count }) => ({
        date: new Date(date).toLocaleDateString(),
        count
    }))

    return (
        <div className="max-w-[800px] m-auto">
            <Line
                className="p-3 pt-8"
                data={{
                    labels: chartData.map(({ date }) => date),
                    datasets: [{
                        label: 'Profile views',
                        data: chartData.map(({ count }) => count),
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
        </div>
    )
}