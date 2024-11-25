import { Box, Divider, Grid2, Typography } from "@mui/material";
import React from "react";
import Calendar from "react-calendar";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import CalendarComponent from "./CalendarDashboard";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MyDatePicker from "./CalendarDashboard";

const UserInfoDetail = ({ title, info, update }) => {
    return (
        <Box sx={{
            width: '100%',
            minHeigh: '40px',
            display: 'flex',
            marginBottom: 2
        }}>
            <Box sx={{
                width: '120px'
            }}>
                <Typography sx={{
                    fontWeight: 500
                }}>{title}</Typography>
            </Box>
            <Typography sx={{
                width: 'calc(100% - 120px)',
                color: update ? 'rgb(33, 87, 255)' : ''
            }}>{info}</Typography>
        </Box>
    )
}

const AdminUserDetail = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            padding: 3
        }}>
            <Box sx={{
                width: '100%',
                height: '250px',
                borderRadius: '1rem',
                background: 'white',
                position: 'relative'
            }}>
                <Box sx={{
                    width: '100%',
                    height: '150px',
                    background: `linear-gradient(310deg, rgba(33, 82, 255, 0.6), rgba(33, 212, 253, 0.6)) 50% center / cover, 
                    url(${process.env.PUBLIC_URL}/assets/laptop.jpg) transparent`,
                    borderStartStartRadius: '1rem',
                    borderTopRightRadius: '1rem',
                    backgroundSize: 'cover',
                    backdropFilter: 'saturate(200%) blur(30px)',
                }} />
                <Box sx={{
                    width: '100%',
                    height: '100px',
                    paddingLeft: '180px',
                    paddingY: 2
                }}>
                    <Typography variant="h5">David Adam</Typography>
                    <Typography>Manager</Typography>
                </Box>
                <Box sx={{
                    width: '130px',
                    height: '130px',
                    background: `url(${process.env.PUBLIC_URL}/assets/pancake.jpg)`,
                    backgroundSize: 'cover',
                    borderRadius: '100px',
                    border: '6px solid rgba(255, 255, 255, 1)',
                    position: 'absolute',
                    bottom: '5%',
                    left: '2%'
                }} />

            </Box>
            <Box sx={{
                width: '100%',
                height: '100%',
                borderRadius: '1rem',
                background: 'white',
                marginTop: 3,
                padding: 4
            }}>
                <Grid2 container sx={{ width: '100%' }} spacing={4}>
                    <Grid2 size={8}>
                        <Typography
                            sx={{
                                fontFamily: '"Inter", sans-serif !important',
                                fontSize: '14px',
                                color: 'rgba(58, 65, 111, 0.7)',
                                marginBottom: 3
                            }}>BASIC INFORMATION</Typography>
                        <UserInfoDetail title={'Ngày sinh'} info={'02-10-2000'} />
                        <UserInfoDetail title={'Giới tính'} info={'Nam'} />
                        <Typography
                            sx={{
                                fontFamily: '"Inter", sans-serif !important',
                                fontSize: '14px',
                                color: 'rgba(58, 65, 111, 0.7)',
                                marginBottom: 3,
                                marginTop: 4
                            }}>CONTRACT INFORMATION</Typography>
                        <UserInfoDetail title={'Số điện thoại'} info={'0987654321'} update={true} />
                        <UserInfoDetail title={'Địa chỉ'} info={'273 An Dương Vương, phường 4, quận 5, Thành phố Hồ Chí Minh'} update={false} />
                        <UserInfoDetail title={'Email'} info={'nguyenvanA@gmail.com'} update={true} />
                        <UserInfoDetail title={'Số điện thoại'} info={'0987654321'} update={true} />
                        <UserInfoDetail title={'Tài khoản'} info={'hihihaha'} />
                        <UserInfoDetail title={'Tình trạng'} info={'0987654321'} />
                    </Grid2>
                    <Grid2 size={4}>

                    </Grid2>
                </Grid2>
                <MyDatePicker />
            </Box>
        </Box>
    )
}

export default AdminUserDetail;