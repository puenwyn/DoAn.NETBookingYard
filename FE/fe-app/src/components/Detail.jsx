import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { CiLocationOn, CiHeart, CiWarning, CiShare2, CiWifiOn } from "react-icons/ci";
import { FaStar, FaCarAlt, FaMotorcycle, FaRegImage } from "react-icons/fa";
import { IoRestaurantOutline, IoFastFood } from "react-icons/io5";
import { RiDrinks2Fill } from "react-icons/ri";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import '../styles/common.css';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, InputLabel, MenuItem, OutlinedInput, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import { FormControl } from 'react-bootstrap';
import { convertToK, formatNumber } from '../utils/FormatNumber';
import { useAuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { set } from 'date-fns';
import { useBookingContext } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const icon = [
    null,
    <CiWifiOn className='me-1 fs-4' />,
    <FaCarAlt className='me-1 fs-4' />,
    <FaMotorcycle className='me-1 fs-4' />,
    <IoRestaurantOutline className='me-1 fs-4' />,
    <RiDrinks2Fill className='me-1 fs-4' />,
    <IoFastFood className='me-1 fs-4' />
]

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

function mergeTimes(timeArray) {
    // Định nghĩa các nhóm thời gian
    const timeGroups = [
        { name: 'nhóm 1', start: '06:00', end: '09:00' },
        { name: 'nhóm 2', start: '09:00', end: '17:00' },
        { name: 'nhóm 3', start: '17:00', end: '21:00' },
        { name: 'nhóm 4', start: '21:00', end: '00:00' },
        { name: 'nhóm 5', start: '00:00', end: '06:00' }
    ];

    // Chuyển đổi thời gian sang số phút trong ngày để dễ so sánh
    function timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // Hàm để xác định nhóm của một thời gian
    function getTimeGroup(time) {
        for (let group of timeGroups) {
            const groupStart = timeToMinutes(group.start);
            const groupEnd = timeToMinutes(group.end);
            const currentTime = timeToMinutes(time);

            // Đặc biệt đối với nhóm 4 và nhóm 5 vì nó vượt qua nửa đêm
            if (
                (groupStart < groupEnd && currentTime >= groupStart && currentTime < groupEnd) ||
                (groupStart > groupEnd && (currentTime >= groupStart || currentTime < groupEnd))
            ) {
                return group.name;
            }
        }
        return null;
    }

    // Chia nhỏ từng item theo `id` và thời gian
    const groupedTimes = timeArray.reduce((acc, item) => {
        const [dayPart] = item.id.split('-');
        const timeRange = item.time.split(' - ');

        const startTime = timeRange[0];
        const endTime = timeRange[1];
        const group = getTimeGroup(startTime);

        if (!acc[dayPart]) {
            acc[dayPart] = [];
        }

        // Thêm thông tin với thời gian và nhóm vào nhóm cụ thể
        acc[dayPart].push({ id: dayPart, time: startTime + ' - ' + endTime, group });
        return acc;
    }, {});

    // Xử lý gộp các khoảng thời gian
    const result = [];

    for (const [dayPart, times] of Object.entries(groupedTimes)) {
        let currentGroup = [];

        // Sắp xếp các khoảng thời gian theo thứ tự
        times.sort((a, b) => timeToMinutes(a.time.split(' - ')[0]) - timeToMinutes(b.time.split(' - ')[0]));

        for (let i = 0; i < times.length; i++) {
            const time = times[i];
            const prevTime = currentGroup[currentGroup.length - 1];

            // Chỉ gộp nếu nhóm giống nhau và thời gian liên tiếp
            if (prevTime && prevTime.group === time.group && timeToMinutes(prevTime.time.split(' - ')[1]) === timeToMinutes(time.time.split(' - ')[0])) {
                // Nếu thời gian liên tiếp thì gộp lại
                prevTime.time = prevTime.time.split(' - ')[0] + ' - ' + time.time.split(' - ')[1];
            } else {
                // Nếu không liên tiếp thì thêm mới
                currentGroup.push(time);
            }
        }

        result.push(...currentGroup);
    }

    return result;
}

// const services = [
//     { icon: <CiWifiOn className='me-1 fs-4' />, label: 'Wifi' },
//     { icon: <FaCarAlt className='me-1 fs-4' />, label: 'Bãi đổ xe ô tô' },
//     { icon: <FaMotorcycle className='me-1 fs-4' />, label: 'Bãi đổ xe máy' },
//     { icon: <IoRestaurantOutline className='me-1 fs-4' />, label: 'Căn tin' },
//     { icon: <RiDrinks2Fill className='me-1 fs-4' />, label: 'Thức uống' },
//     { icon: <IoFastFood className='me-1 fs-4' />, label: 'Đồ ăn' },
// ];

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
            let endHour = hour + 1;
            if (startHour === 23) {
                endHour = 0;
            }
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

const isTimeInRange = (time, rangeStart, rangeEnd) => {
    const timeToCompare = convertTimeToMinutes(time); // Convert time to minutes for comparison
    const rangeStartMinutes = convertTimeToMinutes(rangeStart);
    const rangeEndMinutes = convertTimeToMinutes(rangeEnd);

    return timeToCompare >= rangeStartMinutes && timeToCompare <= rangeEndMinutes;
};

const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const Detail = ({ yard }) => {
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
        setName('');
        setPhone('');
        setEmail('');
        setDetail('');
    };

    useEffect(() => {
        const selectedItems = selectedButtons.map(id => {
            const [dayKey, hour] = id.split('-');
            const item = timeItemsHashMap[dayKey]?.timeItems.find(item => item.id === id);
            return item ? { id: item.id, time: item.time } : null;
        }).filter(Boolean);
        setSelectedTimeItems(selectedItems);
    }, [selectedButtons, timeItemsHashMap]);

    const [yardDetailSelect, setYardDetailSelect] = useState(yard.yardDetailDTOs[0]);

    const handleChange = (event) => {
        setSelectedButtons([]);
        setSelectedTimeItems([]);
        const selectedId = event.target.value;
        const selectedYardDetail = yard.yardDetailDTOs.find(item => item.id === selectedId);
        setYardDetailSelect(selectedYardDetail);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };
    const [open, setOpen] = React.useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        return phoneRegex.test(phone);
    };

    const isValidFullName = (fullName) => {
        const nameRegex = /^[\w\s\u00C0-\u1EF9]*$/u;
        return nameRegex.test(fullName.trim()) && fullName.length > 0;
    };

    const onAutoFill = async () => {
        const userData = await checkTokenValidity();
        if (!userData) {
            Swal.fire({
                title: 'Vui lòng đăng nhập!',
                text: 'Bạn cần đăng nhập để thực hiện đặt lịch.',
                icon: 'warning',
                confirmButtonText: 'Đóng',
            })
        } else {
            setName(userData.fullName);
            setEmail(userData.email);
            setPhone(userData.phoneNumber);
        }
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [detail, setDetail] = useState('');
    const [bookingData, setBookingData] = useState();

    const handleBooking = async () => {
        const userData = await checkTokenValidity();
        if (!userData) {
            Swal.fire({
                title: 'Vui lòng đăng nhập!',
                text: 'Bạn cần đăng nhập để thực hiện đặt lịch.',
                icon: 'warning',
                confirmButtonText: 'Đóng',
            })
        } else {
            if (selectedTimeItems.length === 0) {
                Swal.fire({
                    title: 'Vui lòng chọn thời gian!',
                    text: 'Bạn cần chọn thời gian để thực hiện đặt lịch.',
                    icon: 'warning',
                    confirmButtonText: 'Đóng',
                })
            } else {
                if (!isValidFullName(name)) {
                    await Swal.fire({
                        title: 'Lỗi',
                        text: 'Họ và tên không hợp lệ! Không chứa số và ký tự đặc biệt.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    return;
                }

                // Kiểm tra email hợp lệ
                if (!isValidEmail(email)) {
                    await Swal.fire({
                        title: 'Lỗi',
                        text: 'Email không hợp lệ!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    return;
                }

                // Kiểm tra số điện thoại hợp lệ
                if (!isValidPhoneNumber(phone)) {
                    await Swal.fire({
                        title: 'Lỗi',
                        text: 'Số điện thoại không hợp lệ! Phải có 10 số và đúng định dạng.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                    return;
                }

                const bookingData = {
                    user: userData,
                    yard: yardDetailSelect,
                    times: mergeTimes(selectedTimeItems),
                    name: name,
                    email: email,
                    phone: phone,
                    detail: detail,
                }
                console.log(bookingData);
                setBookingData(bookingData);
                setOpenConfirm(true);
            }
        }
    }

    const navigate = useNavigate();

    const { checkTokenValidity } = useAuthContext();
    const { createBooking } = useBookingContext();
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleConfirm = async () => {
        setOpenConfirm(false);
        const result = await Swal.fire({
            title: "Xác nhận",
            text: "Bạn có muốn đặt lịch sân này không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có",
            cancelButtonText: "Không",
            reverseButtons: true,
        });
        if (result.isConfirmed) {
            try {
                const success = await createBooking(bookingData);
                console.log(success)
                if (success) {
                    await Swal.fire("Đã đặt lịch!", "Lịch sân của bạn đã được đặt thành công.", "success");
                    setOpenConfirm(!success);
                    navigate('/my-cart');
                } else {
                    await Swal.fire("Lỗi!", "Đặt lịch không thành công", "error");
                }
            } catch (err) {
                await Swal.fire("Lỗi!", err, "error");
            }
        } else if (result.isDismissed) {
            await Swal.fire("Đã hủy", "Bạn đã hủy việc đặt lịch.", "info");
        }
    };


    return (
        <div>
            <Dialog open={openConfirm} sx={{ padding: 3, height: 'auto' }}>
                <DialogTitle sx={{ fontSize: 24, fontWeight: 600, textAlign: 'center', color: '#333' }}>
                    Xác nhận đặt lịch
                </DialogTitle>

                <Grid2 container spacing={4} sx={{ paddingX: 3 }}>
                    {/* Information Section for Person (4 parts) */}
                    <Box item sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '200px', maxWidth: '200px' }}>
                        <Typography sx={{ fontWeight: 500, color: '#6D7C89', textTransform: 'uppercase', fontSize: 14 }}>
                            Thông tin người đặt
                        </Typography>

                        {/* Text Fields for Person Information */}
                        <TextField
                            id="name"
                            label="Họ và tên"
                            variant="outlined"
                            fullWidth
                            sx={{ borderRadius: 2, backgroundColor: '#f9f9f9' }}
                            InputProps={{
                                readOnly: true,
                                sx: { color: '#6D7C89', fontSize: 16 },
                            }}
                            value={bookingData?.name || ''}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{ borderRadius: 2, backgroundColor: '#f9f9f9' }}
                            InputProps={{
                                readOnly: true,
                                sx: { color: '#6D7C89', fontSize: 16 },
                            }}
                            value={bookingData?.email || ''}
                        />
                        <TextField
                            id="phone"
                            label="Số điện thoại"
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderRadius: 2,
                                backgroundColor: '#f9f9f9',
                            }}
                            InputProps={{
                                readOnly: true,
                                sx: { color: '#6D7C89', fontSize: 16 },
                            }}
                            value={bookingData?.phone || ''}
                        />

                        {/* Textarea for Note */}
                        <textarea
                            id="detail"
                            label="Ghi chú"
                            rows={5}
                            fullWidth
                            style={{
                                borderRadius: 2,
                                backgroundColor: '#f9f9f9',
                                padding: '12px',
                                fontSize: '16px', // Optional, if you want to match font size
                                color: '#6D7C89', // Optional, to maintain text color consistency
                            }}
                            value={bookingData?.detail || ''}
                        />

                    </Box>

                    {/* Information Section for Stadium (8 parts) */}
                    <Box item sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '300px', maxWidth: '300px' }}>
                        <Typography sx={{ fontWeight: 500, color: '#6D7C89', textTransform: 'uppercase', fontSize: 14 }}>
                            Thông tin sân
                        </Typography>

                        {/* Stadium Information Fields */}
                        <TextField
                            id="outlined-basic-1"
                            label="Tên sân"
                            variant="outlined"
                            fullWidth
                            sx={{ borderRadius: 2, backgroundColor: '#f9f9f9' }}
                            InputProps={{
                                readOnly: true,
                                sx: { color: '#6D7C89', fontSize: 16 },
                            }}
                            value={bookingData?.yard.name || ''}
                        />
                        <TextField
                            id="outlined-basic-2"
                            label="Sức chứa"
                            variant="outlined"
                            fullWidth
                            sx={{ borderRadius: 2, backgroundColor: '#f9f9f9' }}
                            InputProps={{
                                readOnly: true,
                                sx: { color: '#6D7C89', fontSize: 16 },
                            }}
                            value={bookingData?.yard.capacity || ''}
                        />
                        <TextField
                            id="outlined-basic-2"
                            label="Khu vực"
                            variant="outlined"
                            fullWidth
                            sx={{ borderRadius: 2, backgroundColor: '#f9f9f9' }}
                            InputProps={{
                                readOnly: true,
                                sx: { color: '#6D7C89', fontSize: 16 },
                            }}
                            value={bookingData?.yard.location || ''}
                        />

                        {/* Time Slot Details (8 parts) */}
                        <Typography sx={{ fontWeight: 500, color: '#6D7C89', textTransform: 'uppercase', fontSize: 14 }}>
                            Thông tin thời gian đặt sân
                        </Typography>

                        {/* Date and Time List */}
                        {bookingData?.times && Array.isArray(bookingData.times) && bookingData.times.length > 0 ? (
                            Object.entries(
                                bookingData.times.reduce((acc, time) => {
                                    // Group times by date
                                    if (!acc[time.id]) {
                                        acc[time.id] = []; // If the date doesn't exist in accumulator, create an empty array
                                    }
                                    acc[time.id].push(time); // Push the time object into the respective date group
                                    return acc;
                                }, {})
                            ).map(([date, group]) => (
                                <div key={date}>
                                    <strong style={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
                                        {date}
                                    </strong>
                                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                        {group.map((timeSlot, index) => {
                                            // Extract start time (assume time format is "HH:MM - HH:MM")
                                            const startTime = timeSlot.time.split(' - ')[0];
                                            let price = `${convertToK(bookingData?.yard.price)}/1h`;

                                            // Define the ranges with specific price
                                            const premiumTimeRanges = [
                                                { start: '06:00', end: '08:00' }, // Early morning (Premium price)
                                                { start: '17:00', end: '20:00' }  // Evening (Premium price)
                                            ];

                                            // Check if the time slot is within any of the premium time ranges
                                            premiumTimeRanges.forEach(range => {
                                                if (isTimeInRange(startTime, range.start, range.end)) {
                                                    price = `${convertToK(bookingData?.yard.pricePeak)}/1h`;
                                                }
                                            });

                                            return (
                                                <li
                                                    key={index}
                                                    className="d-flex align-items-center justify-content-between w-100"
                                                    style={{ borderBottom: '1px solid #e0e0e0' }}
                                                >
                                                    <span style={{ fontSize: '16px', fontWeight: 500, color: '#333' }}>
                                                        {timeSlot.time}
                                                    </span>
                                                    <span style={{ fontSize: '16px', fontWeight: 500, color: '#007BFF' }}>
                                                        {price}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>No available times</p> // Fallback message if no times are available
                        )}
                    </Box>
                </Grid2>

                <DialogActions sx={{ paddingTop: 2 }}>
                    <Button onClick={handleCloseConfirm}>Đóng</Button>
                    <Button variant="contained" onClick={handleConfirm} autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>


            <div className='detail' style={{ background: '#f3f4f7' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 mt-3'>
                            <div className='detail-info-head'>
                                <h4>{yard.name}</h4>
                                <div className='detail__location-rating d-flex flex-row justify-content-between'>
                                    <div className='detail-location d-flex align-items-center text-center'>
                                        <CiLocationOn />
                                        <p className='mb-0 ms-1'>{yard.address}</p>
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
                                        {yard.images.length > 0 && (
                                            <Slider {...settings} style={{
                                                background: 'white',
                                                borderRadius: '8px',
                                                padding: '8px'
                                            }}>
                                                {yard.images.map((file, index) => {// Tạo URL cho file
                                                    return (
                                                        <div className="image-container mt-3" key={index} style={{ position: 'relative' }}>
                                                            <img
                                                                src={`data:image/png;base64,${file.imageURL}`}
                                                                alt={`uploaded-preview-${index}`}
                                                                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </Slider>
                                        )}
                                        {/* <div className='image-display'>
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
                                        </div> */}
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
                                                <span className="detail-inf-value fw-bold">24/7</span>
                                            </div>
                                            <div className="detail-item d-flex justify-content-between mb-3">
                                                <span className="detail-inf-title">Số sân thi đấu:</span>
                                                <span className="detail-inf-value fw-bold">{yard.numberOfYard} sân</span>
                                            </div>
                                            <div className="detail-item d-flex justify-content-between mb-3">
                                                <span className="detail-inf-title">Giá sân:</span>
                                                <span className="detail-inf-value fw-bold">{formatNumber(yardDetailSelect.price)} đ</span>
                                            </div>
                                            <div className="detail-item d-flex justify-content-between mb-3">
                                                <span className="detail-inf-title">Giá sân giờ vàng:</span>
                                                <span className="detail-inf-value fw-bold">{formatNumber(yardDetailSelect.pricePeak)} đ</span>
                                            </div>
                                            <div className="detail-item d-flex justify-content-between mb-3">
                                                <span className="detail-inf-title">Thông tin:</span>
                                                <span className="detail-inf-value fw-bold">{formatNumber(yardDetailSelect.description)}</span>
                                            </div>
                                        </div>
                                        <div className="detail-con p-2" style={{ backgroundColor: 'rgb(243, 244, 247)', borderRadius: '8px' }}>
                                            <div className="detail-con-title">
                                                <h6>Dịch vụ tiện ích</h6>
                                            </div>
                                            <div className="detail-con-list d-flex flex-wrap">
                                                {yard.amenities.map((item) => (
                                                    <div className="item-expand mb-2" style={{ width: '50%' }} key={item.id}>
                                                        <span className='item-expand d-flex align-items-center text-center'>
                                                            {icon[item.id]}
                                                            {item.name}
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
                                            <input type="text" id="name" className="form-control" placeholder="Họ và tên" value={name} onChange={(e) => { setName(e.target.value) }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" id="email" className="form-control" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" id="phone" className="form-control" placeholder="Số điện thoại" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                                        </div>
                                        <div className="mb-3">
                                            <textarea className="form-control" id="detail" rows="3" placeholder='Ghi chú' value={detail} onChange={(e) => { setDetail(e.target.value) }}></textarea>
                                        </div>
                                        <Button variant="outlined" className='mb-3' onClick={onAutoFill} style={{ width: '100%' }}>
                                            TỰ ĐIỀN THÔNG TIN
                                        </Button>
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
                                            LÀM MỚI
                                        </Button>
                                        <Button variant="contained" onClick={handleBooking} color='success' className='mb-3' style={{ width: '100%' }}>ĐẶT SÂN</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-9 col-12'>
                            <div className='booking bg-white' style={{ borderRadius: '8px' }}>
                                <div className="booking-option d-flex justify-content-between p-3" style={{ borderRadius: '8px' }}>
                                    <Button variant="contained" onClick={handleClickOpen} endIcon={<MdNavigateNext />}>
                                        {yardDetailSelect ? yardDetailSelect.name : "Chọn sân"}
                                    </Button>

                                    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                        <DialogTitle>Vui lòng chọn sân</DialogTitle>
                                        <DialogContent>
                                            <Box component="form" sx={{ maxWidth: '300px', minWidth: '300px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
                                                <Select
                                                    sx={{
                                                        width: '100%',
                                                        backgroundColor: 'white',
                                                        borderRadius: 1,

                                                        '&:hover': {
                                                            backgroundColor: '#f1f1f1',
                                                        },
                                                        '&.Mui-focused': {
                                                            backgroundColor: '#e8f0fe',
                                                        },
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#1976d2',
                                                        },
                                                    }}
                                                    onChange={handleChange}
                                                    value={yardDetailSelect ? yardDetailSelect.id : ""}
                                                    label="Chọn sân"
                                                >
                                                    {yard.yardDetailDTOs.map((item) => (
                                                        <MenuItem key={item.id} value={item.id}>
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Box>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Đóng</Button>
                                        </DialogActions>
                                    </Dialog>


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
                                                                        <small>{item.isPeak ? convertToK(yardDetailSelect.pricePeak) : convertToK(yardDetailSelect.price)}</small>
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