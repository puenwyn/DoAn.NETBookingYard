import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'Black', 'White', 'Brown', 'Violet', 'Sky', 'Pink'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [31, 28, 6, 9, 7, 11, 21, 17, 15, 30, 34, 28],
                backgroundColor: [
                    'rgba(29, 93, 234, 1)',  // Có thể thêm màu cho từng cột
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 255, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(128, 0, 128, 1)',
                    'rgba(255, 192, 203, 1)',
                ],
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: false,
                text: 'Example Bar Chart',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                display: true, // Hiện trục x
            },
            y: {
                display: true, // Hiện trục y
                beginAtZero: true, // Bắt đầu trục Y từ 0
            },
        },
    };

    return (
        <div style={{ position: 'relative', width: '70%', height: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
