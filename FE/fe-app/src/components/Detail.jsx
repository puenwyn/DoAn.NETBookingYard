import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { CiLocationOn, CiHeart, CiWarning, CiShare2, CiWifiOn } from "react-icons/ci";
import { FaStar, FaCarAlt, FaMotorcycle, FaRegImage } from "react-icons/fa";
import { IoRestaurantOutline, IoFastFood } from "react-icons/io5";
import { RiDrinks2Fill } from "react-icons/ri";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import '../styles/common.css';

const services = [
    { icon: <CiWifiOn className='me-1 fs-4' />, label: 'Wifi' },
    { icon: <FaCarAlt className='me-1 fs-4' />, label: 'Bãi đổ xe ô tô' },
    { icon: <FaMotorcycle className='me-1 fs-4' />, label: 'Bãi đổ xe máy' },
    { icon: <IoRestaurantOutline className='me-1 fs-4' />, label: 'Căn tin' },
    { icon: <RiDrinks2Fill className='me-1 fs-4' />, label: 'Thức uống' },
    { icon: <IoFastFood className='me-1 fs-4' />, label: 'Đồ ăn' },
];

function generateTimeItems(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr.split('/').reverse().join('-'));
    const endDate = new Date(endDateStr.split('/').reverse().join('-'));
    const currentDate = new Date();
    currentDate.setSeconds(0); // Đặt giây về 0 để so sánh chính xác

    const timeItems = {};
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const peakHours = new Set([...Array.from({ length: 3 }, (_, i) => i + 6), ...Array.from({ length: 4 }, (_, i) => i + 17)]);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayKey = date.toLocaleDateString('vi-VN', { weekday: 'long' }) + ' ' + date.toLocaleDateString('vi-VN');
        timeItems[dayKey] = { timeItems: [] };

        hours.forEach(hour => {
            const startHour = hour;
            const endHour = hour + 1;
            const isPeak = peakHours.has(startHour);
            const timeToCheck = new Date(date);
            timeToCheck.setHours(startHour, 0, 0);
            const isPast = timeToCheck < currentDate;

            timeItems[dayKey].timeItems.push({
                id: `${dayKey}-${startHour}`,
                time: `${String(startHour).padStart(2, '0')}:00 - ${String(endHour).padStart(2, '0')}:00`,
                session: startHour < 12 ? 'AM' : 'PM',
                isPeak: isPeak,
                isPast: isPast,
            });
        });
    }

    return timeItems;
}

const DateRangeButton = ({ onDateRangeChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const lastAlertDate = useRef({ start: startDate, end: endDate });

    const formatDate = (date) => {
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    };

    const handleNext = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + 7);
        updateDateRange(newStartDate);
    };

    const handlePrevious = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() - 7);
        updateDateRange(newStartDate);
    };

    const updateDateRange = (newStartDate) => {
        const newEndDate = new Date(newStartDate);
        newEndDate.setDate(newStartDate.getDate() + 6);
        setStartDate(newStartDate);
        if (
            newStartDate.getTime() !== lastAlertDate.current.start.getTime() ||
            newEndDate.getTime() !== lastAlertDate.current.end.getTime()
        ) {
            lastAlertDate.current = { start: newStartDate, end: newEndDate };
            onDateRangeChange(newStartDate, newEndDate);
        }
    };

    return (
        <Button
            variant="outlined"
            startIcon={<MdNavigateBefore onClick={handlePrevious} />}
            endIcon={<MdNavigateNext onClick={handleNext} />}
        >
            Từ ngày {formatDate(startDate)} đến ngày {formatDate(endDate)}
        </Button>
    );
};

const Detail = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 6);

    const [dateRange, setDateRange] = useState({ start: today, end: nextWeek });
    const [timeItemsHashMap, setTimeItemHashMap] = useState({});

    useEffect(() => {
        const startDate = dateRange.start.toLocaleDateString('vi-VN');
        const endDate = dateRange.end.toLocaleDateString('vi-VN');
        const newTimeItems = generateTimeItems(startDate, endDate);
        setTimeItemHashMap(newTimeItems);
    }, [dateRange]);

    const handleDateRangeChange = (start, end) => {
        setDateRange({ start, end });
    };

    const [selectedSession, setSelectedSession] = useState(null);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setSelectedSession('morning');
        } else {
            setSelectedSession('afternoon');
        }
    }, []);

    const handleSessionChange = (session) => {
        setSelectedSession(session);
    };

    const [selectedButtons, setSelectedButtons] = useState([]);
    const handleButtonClick = (itemId) => {
        setSelectedButtons(prev => {
            if (prev.includes(itemId)) {
                return prev.filter(id => id !== itemId);
            } else {
                return [...prev, itemId];
            }
        });
    };

    const [selectedTimeItems, setSelectedTimeItems] = useState([]);

    const onReset = () => {
        setSelectedButtons([]);
        setSelectedTimeItems([]);
    };

    useEffect(() => {
        const selectedItems = selectedButtons.map(id => {
            const [dayKey, hour] = id.split('-');
            const item = timeItemsHashMap[dayKey]?.timeItems.find(item => item.id === id);
            return item ? { id: item.id, time: item.time } : null;
        }).filter(Boolean);
        setSelectedTimeItems(selectedItems);
    }, [selectedButtons, timeItemsHashMap]);

    return (
        <div>
            <div className='detail' style={{ background: '#f3f4f7' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 mt-3'>
                            <div className='detail-info-head'>
                                <h4>Sân cầu lông Panda Badminton</h4>
                                <div className='detail__location-rating d-flex flex-row justify-content-between'>
                                    <div className='detail-location d-flex align-items-center text-center'>
                                        <CiLocationOn />
                                        <p className='mb-0 ms-1'>273 Đ. An Dương Vương, Phường 4, Quận 5, TP. Hồ Chí Minh</p>
                                    </div>
                                    <div className='detail-rating d-flex align-items-center text-center'>
                                        <div className='detail-rating-star d-flex'>
                                            <p className='mb-0 me-2'>Đánh giá: 4/5</p>
                                            <FaStar color='yellow' className='me-2 fs-4' />
                                            <p className='mb-0'>(1 đánh giá)</p>
                                        </div>
                                        <div className='detail-rating-button ms-5 fs-4'>
                                            <CiShare2 className='me-2' />
                                            <CiHeart className='me-2' />
                                            <CiWarning className='me-2' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-lg-8 col-12'>
                                    <div className='display-image-background'>
                                        <div className='image-display'>
                                            <div className="inner-image">
                                                <img className='img-fluid' src='/assets/lake.jpg' alt="" />
                                            </div>
                                            <div className="inner-image">
                                                <img className='img-fluid' src='/assets/sunset.jpg' alt="" />
                                            </div>
                                            <div className="inner-image">
                                                <img className='img-fluid' src='/assets/plain.jpg' alt="" />
                                            </div>
                                            <div className="inner-image">
                                                <img className='img-fluid' src='/assets/village.jpg' alt="" />
                                            </div>
                                            <div className="inner-image">
                                                <img className='img-fluid' src='/assets/waterfall.jpg' alt="" />
                                            </div>
                                        </div>
                                        <div className='image-gallery d-flex align-items-center' style={{ borderRadius: '8px', fontSize: '16px' }}>
                                            <FaRegImage />
                                            <span className='ms-2'>Xem 5 ảnh</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-12'>
                                    <div className='detail-expand bg-white p-3'>
                                        <div className='detail-title'>
                                            <h5>Thông tin sân</h5>
                                        </div>
                                        <div className='detail-information mb-4'>
                                            <div className="detail-item d-flex justify-content-between mt-4 mb-3">
                                                <span className="detail-inf-title">Giờ mở cửa:</span>
                                                <span className="detail-inf-value fw-bold">6h - 23h</span>
                                            </div>
                                            <div className="detail-item d-flex justify-content-between mb-3">
                                                <span className="detail-inf-title">Số sân thi đấu:</span>
                                                <span className="detail-inf-value fw-bold">4 sân</span>
                                            </div>
                                            <div className="detail-item d-flex justify-content-between mb-3">
                                                <span className="detail-inf-title">Giá sân:</span>
                                                <span className="detail-inf-value fw-bold">120.000 đ</span>
                                            </div>
                                            <div className="detail-item d-flex justify-content-between mb-3">
                                                <span className="detail-inf-title">Giá sân giờ vàng:</span>
                                                <span className="detail-inf-value fw-bold">120.000 đ</span>
                                            </div>
                                        </div>
                                        <div className="detail-con p-2" style={{ backgroundColor: 'rgb(243, 244, 247)', borderRadius: '8px' }}>
                                            <div className="detail-con-title">
                                                <h6>Dịch vụ tiện ích</h6>
                                            </div>
                                            <div className="detail-con-list d-flex flex-wrap">
                                                {services.map((service, index) => (
                                                    <div className="item-expand mb-2" style={{ width: '50%' }} key={index}>
                                                        <span className='item-expand d-flex align-items-center text-center'>
                                                            {service.icon}
                                                            {service.label}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-4 d-flex flex-row'>
                        <div className='booking-sticky col-md-3 col-12'>
                            <div className='booking-required bg-white p-3' style={{ borderRadius: '8px' }}>
                                <div className='booking-title'>
                                    <h5>Đặt sân theo yêu cầu</h5>
                                </div>
                                <div className='booking-form'>
                                    <form action="" method='POST'>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" placeholder="Họ và tên" />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" placeholder="Số điện thoại" />
                                        </div>
                                        <div className="mb-3">
                                            <textarea className="form-control" rows="3" placeholder='Ghi chú'></textarea>
                                        </div>
                                        {/* Hiển thị danh sách thời gian đã chọn */}
                                        <div className="selected-times mb-3">
                                            <h5>Thời gian đã chọn:</h5>
                                            {selectedTimeItems.length > 0 ? (
                                                <>
                                                    {Object.entries(selectedTimeItems.reduce((acc, item) => {
                                                        const dayKey = item.id.split('-')[0];
                                                        const date = dayKey;
                                                        if (!acc[date]) {
                                                            acc[date] = [];
                                                        }
                                                        acc[date].push(item.time);
                                                        return acc;
                                                    }, {})).map(([date, times]) => (
                                                        <div key={date}>
                                                            <strong>{date}</strong>
                                                            <ul>
                                                                {times.map((time, index) => (
                                                                    <li key={index} className="ms-3">{time}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <p>Chưa có thời gian nào được chọn.</p>
                                            )}
                                        </div>
                                        <Button variant="outlined" className='mb-3' onClick={onReset} style={{ width: '100%' }}>
                                            RESET
                                        </Button>
                                        <Button variant="contained" color='success' className='mb-3' style={{ width: '100%' }}>ĐẶT SÂN</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-9 col-12'>
                            <div className='booking bg-white' style={{ borderRadius: '8px' }}>
                                <div className="booking-option d-flex justify-content-between p-3" style={{ borderRadius: '8px' }}>
                                    <Button variant="contained" endIcon={<MdNavigateNext />}>
                                        Sân cầu lông đôi
                                    </Button>
                                    <DateRangeButton onDateRangeChange={handleDateRangeChange} />
                                    <div className='booking-time gap-3'>
                                        <Button
                                            variant={selectedSession === 'morning' ? 'contained' : 'outlined'}
                                            onClick={() => handleSessionChange('morning')}
                                        >
                                            Khung sáng
                                        </Button>
                                        <Button
                                            className='ms-1'
                                            variant={selectedSession === 'afternoon' ? 'contained' : 'outlined'}
                                            onClick={() => handleSessionChange('afternoon')}
                                        >
                                            Khung chiều
                                        </Button>
                                    </div>
                                </div>
                                <div className="booking-calendar d-flex p-3">
                                    <div className='booking-dayofweek d-flex flex-column gap-3 pb-3'>
                                        {
                                            Object.keys(timeItemsHashMap).map(dayKey => {
                                                const today = new Date().toLocaleDateString('vi-VN');
                                                const isToday = dayKey.includes(today);
                                                return (
                                                    <div key={dayKey} className={`day-of-week p-1 text-center ${isToday ? 'dayactive' : ''}`}>
                                                        <b>{dayKey.split(' ')[0].concat(' ').concat(dayKey.split(' ')[1])}</b>
                                                        <small className='d-block'>{dayKey.split(' ')[2]}</small>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <div className='booking-hour w-100 ms-3 ps-3 d-flex flex-column gap-3' style={{ overflowX: 'scroll', scrollBehavior: 'smooth' }}>
                                        {
                                            Object.keys(timeItemsHashMap).map(dayKey => {
                                                const timesItem = timeItemsHashMap[dayKey].timeItems;
                                                return (
                                                    <div key={dayKey} className='row d-flex flex-nowrap gap-3'>
                                                        {
                                                            timesItem.map((item) => {
                                                                const shouldDisplay = (selectedSession === 'morning' && item.session === 'AM') ||
                                                                    (selectedSession === 'afternoon' && item.session === 'PM');

                                                                return (
                                                                    <Button
                                                                        variant={selectedButtons.includes(item.id) ? 'contained' : 'outlined'}
                                                                        disabled={item.isPast}
                                                                        key={item.id}
                                                                        className={`time flex-column text-center p-1 ${shouldDisplay ? 'd-flex' : 'd-none'}`}
                                                                        onClick={() => handleButtonClick(item.id)}
                                                                    >
                                                                        <span>{item.time}</span>
                                                                        <small>120K</small>
                                                                    </Button>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;