import React, { useEffect, useState } from 'react';
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

const BookingWeek = () => {
    // Lấy ngày hiện tại
    const today = new Date();
    const currentDay = today.getDay(); // Ngày trong tuần (0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy)

    // Mảng chứa tên các ngày trong tuần
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const weekDates = [];

    // Tạo mảng chứa ngày tháng của tuần từ hôm nay trở đi
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // Cập nhật ngày theo thứ trong tuần
        weekDates.push({
            day: daysOfWeek[date.getDay()],
            dayOfWeek: date.getDay(),
            date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
        });
    }

    return (
        <div className='booking-dayofweek d-flex flex-column gap-3'>
            {weekDates.map((item, index) => (
                <div key={index} className={`day-of-week p-1 text-center ${item.dayOfWeek === currentDay ? 'dayactive' : ''}`}>
                    <b>{item.day}</b>
                    <small className='d-block'>{item.date}</small>
                </div>
            ))}
        </div>
    );
};

const DateRangeButton = () => {
    // Khởi tạo ngày hiện tại
    const [startDate, setStartDate] = useState(new Date());

    // Tính ngày kết thúc
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);

    // Định dạng ngày theo định dạng "ngày/tháng"
    const formatDate = (date) => {
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    };

    // Hàm xử lý bấm nút "tiếp theo"
    const handleNext = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() + 7);
        setStartDate(newStartDate);
    };

    // Hàm xử lý bấm nút "trước"
    const handlePrevious = () => {
        const newStartDate = new Date(startDate);
        newStartDate.setDate(startDate.getDate() - 7);
        setStartDate(newStartDate);
    };

    return (
        <Button variant="outlined" startIcon={<MdNavigateBefore onClick={handlePrevious} />} endIcon={<MdNavigateNext onClick={handleNext} />}>
            Từ ngày {formatDate(startDate)} đến ngày {formatDate(endDate)}
        </Button>
    );
};

const Detail = () => {

    function createHourlyTimeRangeArray() {
        let timeRanges = [];
        let currentDate = new Date();
        let currentHour = currentDate.getHours();

        let day = currentDate.getDate().toString().padStart(2, '0');
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        let year = currentDate.getFullYear();

        for (let hour = 0; hour < 24; hour++) {
            let startHour = hour.toString().padStart(2, '0');
            let endHour = ((hour + 1) % 24).toString().padStart(2, '0');

            // Xác định AM/PM
            let amPm = hour < 12 ? 'AM' : 'PM';

            // Xác định thời gian là quá khứ hay tương lai
            let status = hour < currentHour ? 'Past' : 'Future';

            // Định dạng ngày tháng năm
            let dateStr = `${day}/${month}/${year}`;

            // Đẩy vào mảng
            timeRanges.push({
                range: `${startHour}:00 - ${endHour}:00`,
                amPm: amPm,
                status: status,
                date: dateStr
            });
        }
        return timeRanges;
    }

    const [timeDay, setTimeDay] = useState([]);
    useEffect(() => {
        setTimeDay(createHourlyTimeRangeArray());
    }, []);

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
                                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Họ và tên" />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email" />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Số điện thoại" />
                                        </div>
                                        <select className="form-select form-select-sm fs-6 mb-3" aria-label=".form-select-sm example">
                                            <option value="1" selected>1,5 giờ</option>
                                            <option value="2">1 giờ</option>
                                        </select>
                                        <div className='dateandtime d-flex justify-content-between mb-3'>
                                            <input type="text" className='p-1' style={{ width: '50%' }} />
                                            <input type="time" className='p-1' style={{ width: '50%' }} />
                                        </div>
                                        <div className="mb-3">
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                        <Button variant="text" className='mb-3' style={{ width: '100%' }}>ĐẶT SÂN</Button>
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
                                    <DateRangeButton />
                                    <div className='booking-time gap-3'>
                                        <Button variant="contained">Khung sáng</Button>
                                        <Button variant="outlined">Khung chiều</Button>
                                    </div>
                                </div>
                                <div className="booking-calendar d-flex p-3">
                                    <BookingWeek />

                                    <div className='booking-hour w-100 ms-3 ps-3 d-flex flex-column gap-3' style={{ overflowX: 'scroll', scrollBehavior: 'smooth' }}>
                                        <div className='row d-flex flex-nowrap gap-3'>
                                            {
                                                timeDay.map((item) => {
                                                    if (item.amPm === 'AM') {
                                                        return (
                                                            <Button disabled={item.status === 'Past'} className='time d-flex flex-column text-center p-1'>
                                                                <span>{item.range}</span>
                                                                <small>120K</small>
                                                            </Button>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <div className='row d-flex flex-nowrap gap-3'>
                                            {
                                                timeDay.map((item) => {
                                                    if (item.amPm === 'AM') {
                                                        return (
                                                            <Button disabled={item.status === 'Past'} className='time d-flex flex-column text-center p-1'>
                                                                <span>{item.range}</span>
                                                                <small>120K</small>
                                                            </Button>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <div className='row d-flex flex-nowrap gap-3'>
                                            {
                                                timeDay.map((item) => {
                                                    if (item.amPm === 'AM') {
                                                        return (
                                                            <Button disabled={item.status === 'Past'} className='time d-flex flex-column text-center p-1'>
                                                                <span>{item.range}</span>
                                                                <small>120K</small>
                                                            </Button>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <div className='row d-flex flex-nowrap gap-3'>
                                            {
                                                timeDay.map((item) => {
                                                    if (item.amPm === 'AM') {
                                                        return (
                                                            <Button disabled={item.status === 'Past'} className='time d-flex flex-column text-center p-1'>
                                                                <span>{item.range}</span>
                                                                <small>120K</small>
                                                            </Button>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <div className='row d-flex flex-nowrap gap-3'>
                                            {
                                                timeDay.map((item) => {
                                                    if (item.amPm === 'AM') {
                                                        return (
                                                            <Button disabled={item.status === 'Past'} className='time d-flex flex-column text-center p-1'>
                                                                <span>{item.range}</span>
                                                                <small>120K</small>
                                                            </Button>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <div className='row d-flex flex-nowrap gap-3'>
                                            {
                                                timeDay.map((item) => {
                                                    if (item.amPm === 'AM') {
                                                        return (
                                                            <Button disabled={item.status === 'Past'} className='time d-flex flex-column text-center p-1'>
                                                                <span>{item.range}</span>
                                                                <small>120K</small>
                                                            </Button>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <div className='row d-flex flex-nowrap gap-3'>
                                            {
                                                timeDay.map((item) => {
                                                    if (item.amPm === 'AM') {
                                                        return (
                                                            <Button disabled={item.status === 'Past'} className='time d-flex flex-column text-center p-1'>
                                                                <span>{item.range}</span>
                                                                <small>120K</small>
                                                            </Button>
                                                        )
                                                    }
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
        </div>
    )
}

export default Detail;