import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Sky', 'Brown'], // Không thêm nhãn cho từng phần
        datasets: [
            {
                label: '', // Không thêm label
                data: [300, 50, 100, 200, 150], // Dữ liệu cho các phần
                backgroundColor: [
                    'rgba(255, 99, 132, 1)', // Màu cho phần Red
                    'rgba(54, 162, 235, 1)', // Màu cho phần Blue
                    'rgba(255, 193, 7, 1)', // Màu cho phần Yellow
                    'rgba(111, 170, 0, 1)', // Màu cho phần Green
                    'rgba(253, 126, 20, 1)', // Màu cho phần Orange
                ],
                borderColor: 'white', // Màu đường viền
                borderWidth: 2,
                cutout: '70%', // Đặt độ lớn của vòng tròn bên trong (cutout)
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
            tooltip: {
                enabled: true, // Ẩn tooltip hoàn toàn
            },
            datalabels: {
                display: false, // Ẩn các giá trị dữ liệu
            },
        },
        animation: {
            animateRotate: true,
            easing: 'easeOutBounce',
        },
    };

    return (
        <div style={{ position: 'relative', width: '70%', height: '70%' }}>
            <Doughnut data={data} options={options} />
            {/* <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
            }}>
                $ 1165.30k <br />
                <span style={{ fontSize: '14px', fontWeight: 'normal' }}>Portfolio Value</span>
            </div> */}
        </div>

    );
};

const DoughnutChart2 = () => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Sky', 'Brown'], // Không thêm nhãn cho từng phần
        datasets: [
            {
                data: [300, 50, 100, 200, 150], // Dữ liệu cho các phần
                backgroundColor: [
                    'rgba(255, 99, 132, 1)', // Màu cho phần Red
                    'rgba(54, 162, 235, 1)', // Màu cho phần Blue
                    'rgba(255, 193, 7, 1)', // Màu cho phần Yellow
                    'rgba(111, 170, 0, 1)', // Màu cho phần Green
                    'rgba(253, 126, 20, 1)', // Màu cho phần Orange
                ],
                borderColor: 'white', // Màu đường viền
                borderWidth: 2,
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
            tooltip: {
                enabled: false, // Ẩn tooltip hoàn toàn
            },
        },
        cutout: '70%',
        rotation: -90, // Bắt đầu từ phía trên cùng
        circumference: 180
    };

    return (
        <div style={{ position: 'relative', width: '70%', height: '70%' }}>
            <Doughnut data={data} options={options} />
            {/* Uncomment below to add a label in the center of the doughnut */}
            {/* <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
            }}>
                $ 1165.30k <br />
                <span style={{ fontSize: '14px', fontWeight: 'normal' }}>Portfolio Value</span>
            </div> */}
        </div>
    );
};

export { DoughnutChart, DoughnutChart2 };
