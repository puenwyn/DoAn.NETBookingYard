import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = () => {

    // Dữ liệu cho biểu đồ
    const data = {
        labels: ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00'],
        datasets: [
            {
                label: 'Dữ liệu',
                data: [4, 15, 5, 3, 9.9, 2.4, 3.4],
                fill: true,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(71,28,168,0.3)");
                    gradient.addColorStop(0.5, "rgba(71,28,168, 0.2)")
                    gradient.addColorStop(1, "rgba(71,28,168,0.1)");
                    return gradient;
                },
                borderColor: 'rgba(71,28,168,1)',
                borderWidth: 2,
                tension: 0.5, // Độ cong của đường
                pointRadius: 0, // Ẩn các điểm trên đường
            },
        ],
    };

    // Tùy chọn cho biểu đồ
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Đặt thành false để biểu đồ không giữ tỉ lệ khung hình
        plugins: {
            legend: {
                display: false, // Ẩn legend
            },
            tooltip: {
                enabled: true, // Bật tooltip khi hover vào biểu đồ
                mode: 'nearest', // Hiển thị thông tin của điểm gần nhất
                intersect: false,
                callbacks: {
                    label: function (tooltipItem) {
                        return `Giá trị: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Ẩn lưới dọc
                }
            },
            y: {
                beginAtZero: false, // Trục y không bắt đầu từ 0, đúng như bạn mong muốn
                min: 0,
                grid: {
                    display: true, // Hiển thị lưới ngang
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}> {/* Đặt kích thước cho div */}
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
