'use client'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

const data = {
    labels: ['Red', 'Orange', 'Blue'],
    datasets: [
        {
            label: 'Profile view',
            data: [55, 23, 96],
            borderWidth: 1,
        }
    ]
}

export default function Analytics() {
    return (
        <Line
            className="p-3 mt-3"
            data={data}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Users Gained between 2016-2020"
                    },
                    legend: {
                        display: false
                    }
                }
            }}
        />
    )
}