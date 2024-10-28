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

const barChartData = [
    { label: 'Red', stat: 31 },
    { label: 'Blue', stat: 28 },
    { label: 'Yellow', stat: 6 },
    { label: 'Green', stat: 9 },
    { label: 'Orange', stat: 7 },
    { label: 'Purple', stat: 11 },
    { label: 'Black', stat: 21 },
    { label: 'White', stat: 17 },
    { label: 'Brown', stat: 15 },
    { label: 'Violet', stat: 30 },
    { label: 'Sky', stat: 34 },
    { label: 'Pink', stat: 28 },
]

const BarChart = ({ dataset }) => {
    const data = {
        labels: barChartData.map((item) => item.label),
        datasets: [
            {
                label: 'My First Dataset',
                data: barChartData.map((item) => item.stat),
                backgroundColor: [
                    'rgba(29, 93, 234, 1)',
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

const bookingData = [
    { label: 'Ngày 1', booked: 20, canceled: 5 },
    { label: 'Ngày 2', booked: 15, canceled: 3 },
    { label: 'Ngày 3', booked: 25, canceled: 10 },
    { label: 'Ngày 4', booked: 30, canceled: 2 },
    { label: 'Ngày 5', booked: 28, canceled: 4 },
    { label: 'Ngày 6', booked: 19, canceled: 1 },
    { label: 'Ngày 7', booked: 19, canceled: 0 },
];


const BarChart2 = () => {
    const data = {
        labels: bookingData.map(item => item.label),
        datasets: [
            {
                label: 'Lượt đặt sân',
                data: bookingData.map(item => item.booked),
                backgroundColor: 'rgba(29, 93, 234, 1)',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 5,
            },
            {
                label: 'Lượt hủy đặt sân',
                data: bookingData.map(item => item.canceled),
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Ẩn legend
            },
            title: {
                display: false, // Ẩn tiêu đề
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                display: true,
                beginAtZero: true,
                ticks: {
                    display: true, // Ẩn nhãn trục y
                },
                grid: {
                    display: false, // Ẩn các đường kẻ trên trục y
                },
            },
            y: {
                display: true,
                beginAtZero: true,
                ticks: {
                    display: true, // Ẩn nhãn trục y
                },
                grid: {
                    display: false, // Ẩn các đường kẻ trên trục y
                },
            },
        },
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export { BarChart, BarChart2 };
