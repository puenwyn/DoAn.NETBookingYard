import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import AdminBookingList from './adminBooking.jsx/AdminBookingList';
import AdminPayment from './adminBooking.jsx/AdminPayment';
import AdminPaymentTable from './adminBooking.jsx/AdminPaymentTable';
import { BookingProvider, useBookingContext } from '../../context/BookingContext';

// Hàm để tạo mảng ngày trong tuần với tên thứ và ngày tháng
const getDaysOfWeek = (weekOffset) => {
    const today = new Date();
    today.setDate(today.getDate() + weekOffset * 7); // Điều chỉnh tuần theo weekOffset

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Tính từ Thứ 2

    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return {
            day: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'][i],
            date
        };
    });
};

// Mảng dữ liệu đặt lịch với trạng thái, sử dụng ngày cụ thể
let bookedSlots = [
    // {
    //     date: '2024-11-05', // Ngày cụ thể theo định dạng YYYY-MM-DD
    //     start: '06:00',
    //     end: '08:00',
    //     status: 'booked'
    // },
    // {
    //     date: '2024-11-06',
    //     start: '14:00',
    //     end: '18:00',
    //     status: 'pending'
    // },
    // {
    //     date: '2024-11-12',
    //     start: '19:00',
    //     end: '20:00',
    //     status: 'pending'
    // },
];



const AdminBookingTable = () => {
    const [weekOffset, setWeekOffset] = useState(0); // Trạng thái tuần
    const daysOfWeek = getDaysOfWeek(weekOffset); // Lấy ngày trong tuần theo tuần hiện tại
    const [bookingList, setBookingList] = useState(false);
    const [bookingPayment, setBookingPayment] = useState(false);
    const [dayOfWeek, setDayOfWeek] = useState(null);
    const [day, setDay] = useState(null);
    const [timeSlot, setTimeSlot] = useState(null);
    const [value, setValue] = React.useState('one');
    const { getAllBookings } = useBookingContext();

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await getAllBookings();
            if (data) {
                bookedSlots = data;
            }
        };
        fetchBookings();
    }, [])

    // Hàm kiểm tra trạng thái đặt của một slot dựa trên ngày và khung giờ
    const getSlotStatus = (dateString, timeSlot) => {
        const [startTime] = timeSlot.split(':');
        const slot = bookedSlots.find(
            (slot) =>
                slot.date === dateString &&
                startTime > slot.start  &&
                startTime < slot.end
        );
        return slot ? slot.status : null; // Trả về trạng thái của slot hoặc null nếu chưa đặt
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // Mảng khung giờ
    const hours = Array.from({ length: 24 }, (_, i) => {
        const startHour = i.toString().padStart(2, '0') + ':00';
        const endHour = (i + 1).toString().padStart(2, '0') + ':00';
        return `${startHour}-${endHour}`;
    });

    const handleOpenList = (dayOfWeek, day, timeSlot) => {
        setBookingList(true);
        setDayOfWeek(dayOfWeek);
        setDay(day);
        setTimeSlot(timeSlot)
    }

    const handleCloseList = () => {
        setBookingList(false);
    }

    const handleOpenPayment = () => {
        setBookingList(false);
        setBookingPayment(true);
    }

    const handleBackPayment = () => {
        setBookingPayment(false);
        setBookingList(true);
    }

    return (
        <Box sx={{ width: '100%' }}>
            {
                bookingList ? (
                    <BookingProvider>
                        <AdminBookingList
                        dayOfWeek={dayOfWeek}
                        day={day}
                        timeSlot={timeSlot}
                        handleOpenPayment={handleOpenPayment}
                        onClose={handleCloseList} />
                    </BookingProvider>
                ) : bookingPayment ? (
                    <AdminPayment onClose={handleBackPayment} />
                ) : (
                    <Box sx={{
                        padding: 3, width: '100%'
                    }}>
                        <Box sx={{
                            background: 'white',
                            borderRadius: '1rem',
                            padding: 3
                        }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value="one" label="Lịch đặt sân" />
                                <Tab value="two" label="Thanh toán" />
                            </Tabs>
                            <Box sx={{ marginTop: 3 }}>
                                {
                                    value === 'one' ? (
                                        <Box sx={{
                                            width: '100%',
                                            background: 'white',
                                            borderRadius: '1rem',
                                            overflow: 'auto',
                                        }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography>Danh sách đặt sân từ {daysOfWeek[0].date.toLocaleDateString('vi-VN')} đến {daysOfWeek[6].date.toLocaleDateString('vi-VN')}</Typography>
                                                {/* Hàng đầu cho các ngày trong tuần */}
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'right'
                                                }}>
                                                    <IconButton onClick={() => setWeekOffset(weekOffset - 1)}>
                                                        <IoIosArrowBack />
                                                    </IconButton>
                                                    <IconButton onClick={() => setWeekOffset(weekOffset + 1)}>
                                                        <IoIosArrowForward />
                                                    </IconButton>
                                                </Box>

                                            </Box>

                                            <Grid container spacing={0} sx={{ width: '100%', marginTop: 3 }}>
                                                <Grid item sx={{
                                                    border: '0.1px solid #F6F6F6',
                                                    textAlign: 'center',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                    width: '100px',
                                                    background: '#F6F6F6',
                                                    borderRight: '0.1px solid white',
                                                    borderLeft: '0.1px solid white',
                                                }}>
                                                    <Typography variant="h6" sx={{ fontSize: '16px' }}>Giờ</Typography>
                                                </Grid>
                                                {daysOfWeek.map((dayInfo, index) => (
                                                    <Grid item xs key={index} sx={{
                                                        border: '0.1px solid #F6F6F6',
                                                        textAlign: 'center',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignContent: 'center',
                                                        background: '#F6F6F6',
                                                        borderRight: '0.1px solid white',
                                                        borderLeft: '0.1px solid white',
                                                        height: '50px'
                                                    }}>
                                                        <Typography variant="h6" sx={{ fontSize: '16px' }} align="center">{dayInfo.day}</Typography>
                                                        <Typography variant="body2">
                                                            {dayInfo.date.toLocaleDateString('vi-VN')} {/* Hiển thị ngày tháng theo định dạng DD/MM/YYYY */}
                                                        </Typography>
                                                    </Grid>
                                                ))}
                                            </Grid>

                                            {/* Các dòng cho mỗi khung giờ */}
                                            {hours.map((timeSlot, rowIndex) => (
                                                <Grid container spacing={0} sx={{ width: '100%' }} key={rowIndex}>
                                                    {/* Cột cho khung giờ */}
                                                    <Grid item sx={{
                                                        border: '0.1px solid #F6F6F6',
                                                        textAlign: 'center',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignContent: 'center',
                                                        width: '100px',
                                                        background: '#F6F6F6',
                                                        borderTop: '0.1px solid white',
                                                        borderBottom: '0.1px solid white',
                                                    }}>
                                                        <Typography variant="body1" sx={{ fontSize: '14px' }}>{timeSlot}</Typography>
                                                    </Grid>
                                                    {/* Các ô trống cho từng ngày */}
                                                    {daysOfWeek.map((dayInfo, colIndex) => {
                                                        const dateString = dayInfo.date.toISOString().split('T')[0]; // Định dạng ngày thành chuỗi 'YYYY-MM-DD'
                                                        const status = getSlotStatus(dateString, timeSlot); // Truyền ngày cụ thể vào hàm kiểm tra trạng thái
                                                        console.log(timeSlot)
                                                        return (
                                                            <Grid
                                                                item
                                                                xs
                                                                key={colIndex}
                                                                sx={{
                                                                    border: '0.1px solid #F6F6F6',
                                                                    textAlign: 'center',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'center',
                                                                    alignContent: 'center',
                                                                    minHeight: '40px',
                                                                    background:
                                                                        status === 'booked' ? 'linear-gradient(310deg, #FF7F50, #FF0000)' :
                                                                            status === 'pending' ? 'linear-gradient(310deg, rgb(255, 182, 74), rgb(254, 128, 50))' :
                                                                                'transparent',
                                                                    '&:hover': {
                                                                        cursor: 'pointer',
                                                                        background: '#F6F6F6'
                                                                    },
                                                                }}
                                                                onClick={() => handleOpenList(dayInfo.day, dayInfo.date.toLocaleDateString('vi-VN'), timeSlot)}
                                                            >
                                                            </Grid>
                                                        );
                                                    })}
                                                </Grid>
                                            ))}
                                        </Box>
                                    ) : (
                                        <AdminPaymentTable />
                                    )
                                }
                            </Box>
                        </Box>
                    </Box>
                )
            }
        </Box>
    );
};

export default AdminBookingTable;
