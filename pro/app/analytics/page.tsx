'use client'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import useSWR from "swr";
import { swrFetcher } from "@/lib/swrFetcher";
import OrangeLoader from "@/components/ui/OrangeLoader";
import ErrorMessage from "@/components/ui/ErrorMessage";

Chart.register(CategoryScale);

type ApiResponse = {
    success: {
        date: string
        count: number
    }[] | false
    error: string | boolean
}

export default function Analytics() {
    const { data: analyticsData, error } = useSWR<ApiResponse>(`/api/analytics`, swrFetcher)

    if (error) return <ErrorMessage />

    if (!analyticsData) return <OrangeLoader />

    if (analyticsData.success === false) return <ErrorMessage />

    const chartData = analyticsData.success.map(({ date, count }) => ({
        date: new Date(date).toLocaleDateString(),
        count
    }))

    return (
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
                    tension: 0.1
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
    )
}