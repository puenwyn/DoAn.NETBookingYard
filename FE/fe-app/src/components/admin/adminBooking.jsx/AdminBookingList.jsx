import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookIcon from '@mui/icons-material/Book';
import { formatNumber } from '../../../utils/FormatNumber';
import '../../../styles/components/adminBooking.css';

const imageList = [
    `${process.env.PUBLIC_URL}/assets/waterfall.jpg`,
    `${process.env.PUBLIC_URL}/assets/plain.jpg`,
    `${process.env.PUBLIC_URL}/assets/sunset.jpg`,
    `${process.env.PUBLIC_URL}/assets/underwater.jpg`,
    `${process.env.PUBLIC_URL}/assets/lake.jpg`,
];


const OverlappingCircles = ({ status }) => {
    return (
        <Box sx={{
            position: "relative",
            width: '100%',
            height: 100,
            overflow: 'hidden',
            marginRight: 2,
            background: status === 'PENDING' ? 'linear-gradient(310deg, rgba(255, 168, 56, 0.8), rgba(255, 223, 96, 0.8))'
                : 'linear-gradient(310deg, rgba(255, 0, 0, 0.8), rgba(255, 100, 100, 0.8))'
        }}>
            <Box
                sx={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: "rgba(225, 225, 255, 0.3)", // Xanh với độ trong suốt
                    top: 10,
                    right: 10,
                }}
            ></Box>
            <Box
                sx={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.3)", // Đỏ với độ trong suốt
                    top: 45, // Chồng lên
                    right: 55,
                }}
            ></Box>
        </Box>
    );
}

const MediaCard = ({ yards, handleOpenPayment }) => {
    const [randomImages, setRandomImages] = useState([]);

    // Hàm chọn ảnh ngẫu nhiên từ mảng imageList
    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imageList.length);
        return imageList[randomIndex];
    };

    // Gọi hàm chỉ khi `yards` thay đổi
    useEffect(() => {
        const randomImages = yards.map(() => getRandomImage());
        setRandomImages(randomImages);
    }, [yards]); // useEffect sẽ chạy lại khi `yards` thay đổi

    return (
        <Box sx={{ width: '100%' }}>
            {yards.map((yard, index) => (
                <Box key={yard.id} mt={4}>
                    <Typography variant="h5" mb={1}>
                        {yard.name}
                    </Typography>
                    <Box display="flex" gap={3} flexWrap="wrap" sx={{ alignContent: 'flex-start' }}>
                        {yard.list.map((item, i) => (
                            <Card key={item.yardId} sx={{ width: 250, flexShrink: 0 }}>
                                <OverlappingCircles status={item.status} />
                                <CardContent sx={{ paddingBottom: 0 }}>
                                    <Typography variant="h6" sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {item.detail}
                                    </Typography>
                                    <Typography>
                                        {formatNumber(item.peak)} VND
                                    </Typography>
                                    <Typography sx={{
                                        fontWeight: 600,
                                        background: item.status === 'PENDING'
                                            ? 'linear-gradient(310deg, rgba(255, 168, 56, 1), rgba(255, 223, 96, 1))'
                                            : 'linear-gradient(310deg, rgba(255, 0, 0, 1), rgba(255, 100, 100, 1))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        display: 'inline-block',
                                    }}>
                                        {item.status}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ marginLeft: 0.5 }}>
                                    <Button size="small" onClick={handleOpenPayment}>Xem chi tiết</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

const AdminBookingList = ({ dayOfWeek, day, timeSlot, handleOpenPayment, onClose }) => {
    const [stickyStyle, setStickyStyle] = useState({
        background: 'transparent',
        boxShadow: 'none',
    });

    const containerRef = useRef(null);

    const handleScroll = useCallback(() => {
        if (containerRef.current) {
            const { scrollTop } = containerRef.current;

            // Thay đổi màu nền khi cuộn xuống
            if (scrollTop > 50) {
                setStickyStyle({
                    background: 'rgba(255, 255, 255, 0.8)', // Thêm nền trong suốt với độ mờ
                    color: 'white', // Đổi màu chữ thành trắng
                    backdropFilter: 'saturate(200%) blur(1.875rem)',
                    boxShadow: 'rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
                });
            } else {
                setStickyStyle({
                    background: 'transparent', // Quay lại nền trắng khi không cuộn
                    color: 'black', // Quay lại màu chữ đen khi không cuộn
                    boxShadow: 'none',
                });
            }
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            const container = containerRef.current;
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    const yards = [
        {
            id: 1, name: 'Sân cầu lông cực cháy', list: [
                { yardId: 1, detail: 'Sân A', peak: 120000, status: 'BOOKING' },
                { yardId: 2, detail: 'Sân A', peak: 100000, status: 'PENDING' },
                { yardId: 1, detail: 'Sân A', peak: 120000, status: 'BOOKING' },
                { yardId: 2, detail: 'Sân A', peak: 100000, status: 'PENDING' },
                { yardId: 1, detail: 'Sân A', peak: 120000, status: 'BOOKING' },
                { yardId: 2, detail: 'Sân ABCDEFGHIKLMNO', peak: 100000, status: 'PENDING' }
            ]
        },
        {
            id: 2, name: 'Sân bóng chuyền quá đỉnh', list: [
                { yardId: 1, detail: 'Sân A', peak: 120000, status: 'BOOKING' },
                { yardId: 2, detail: 'Sân A', peak: 100000, status: 'PENDING' }
            ]
        }
    ];

    return (
        <Box sx={{ width: '100%', padding: 3, height: 'calc(100vh - 60px)', overflowY: 'scroll' }} ref={containerRef}>
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    transition: 'background 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    height: '70px',
                    padding: 1,
                    borderRadius: '1rem',
                    ...stickyStyle,
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        background: 'transparent',
                        color: 'black',
                        borderRadius: '50px',
                    }}>
                    <ArrowBackIosNewIcon sx={{ color: '#6D7C89' }} />
                </IconButton>
                <Typography sx={{ marginLeft: 1, color: '#6D7C89', fontWeight: 600, fontSize: '16px' }}>Danh sách đặt sân {dayOfWeek}, {timeSlot} - {day}</Typography>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
                <MediaCard yards={yards} handleOpenPayment={handleOpenPayment} />
            </Box>
        </Box>
    );
};

export default AdminBookingList;