import React, { useState } from 'react';
import { CiUser } from "react-icons/ci";
import { MdOutlineDashboard, MdAccountBox, MdOutlineSpaceDashboard, MdEditCalendar, MdSportsSoccer, MdGroup, MdHome, MdInsertChartOutlined } from "react-icons/md";
import { TbSoccerField } from "react-icons/tb";
import { LuWallet } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import '../../styles/components/adminSidebar.css';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';


const SidebarButton = ({ option, icon, onclick, active, border, labelborder, expand }) => {

    return (
        <Box sx={{
            width: '100%',
            marginBottom: 1
        }}>
            {border === true && (

                <Box sx={{
                    display: 'flex',
                    height: '20px',
                    alignItems: 'center',
                    marginBottom: 1
                }}>
                    <Typography
                        sx={{
                            fontFamily: '"Inter", sans-serif !important',
                            fontSize: '14px',
                            margin: '0 8px', // Thêm khoảng cách giữa chữ và đường kẻ
                            color: 'rgba(58, 65, 111, 0.7)'
                        }}
                    >
                        {!expand ? labelborder : ''}
                    </Typography>
                    <Divider sx={{ flexGrow: 1, height: '1px', backgroundColor: 'rgb(52, 71, 103)', borderRadius: '1rem' }} />

                </Box>
            )}
            <Box sx={{
                width: '100%',
                height: '55px'
            }}>
                <Button
                    onClick={onclick}
                    sx={{
                        width: '100%',
                        height: '100%',
                        textTransform: 'none',
                        fontSize: '15px',
                        fontWeight: active ? 500 : 400,
                        fontFamily: '"Inter", sans-serif',
                        display: 'flex',
                        justifyContent: !expand ? 'flex-start' : 'space-around',
                        alignItems: 'center',
                        color: active ? 'rgb(52, 71, 103)' : 'rgba(58, 65, 111, 0.7)',
                        lineHeight: 1,
                        marginBottom: '4px',
                        paddingX: 2,
                        background: active ? 'white' : 'transparent',
                        borderRadius: '1rem',
                        boxShadow: active ? 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem' : 'none',
                        textWrap: 'nowrap'
                    }}>
                    <IconButton
                        sx={{
                            width: '30px', // Chiều rộng
                            height: '30px', // Chiều cao
                            borderRadius: '8px', // Bo góc
                            background: active ? 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))' : 'rgba(255, 255, 255, 1)', // Màu nền
                            '&:hover': {
                                backgroundColor: 'rgba(58, 65, 111, 0.2)', // Màu nền khi hover
                            },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            '&:hover': {
                                backgroundColor: 'rgba(58, 65, 111, 0.2)', // Màu nền khi hover
                            },
                            pointerEvents: 'none',
                            color: active ? 'white' : 'rgba(58, 65, 111, 0.7)',
                            boxShadow: 'rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem'
                        }}
                    >{icon}</IconButton>
                    {!expand ? (<Typography sx={{
                        marginLeft: 1.5,
                    }}>{option}</Typography>) : ''}
                </Button>
            </Box>
        </Box>
    )
}

const AdminSideBar = ({ darkMode, optionSidebar, setOptionSideBar, expand }) => {
    const options = [
        { label: 'Màn hình chính', icon: <MdOutlineSpaceDashboard className='fs-5' />, value: 'dashboard', border: true, labelborder: 'Tổng quan' },
        { label: 'Thống kê', icon: <MdInsertChartOutlined className='fs-5' />, value: 'chart' },
        { label: 'Thông tin cá nhân', icon: <MdAccountBox className='fs-5' />, value: 'account' },
        { label: 'Quản lý đặt sân', icon: <MdEditCalendar className='fs-5' />, value: 'booking', border: true, labelborder: 'Quản lý' },
        { label: 'Quản lý sân', icon: <MdSportsSoccer className='fs-5' />, value: 'yard' },
        { label: 'Quản lý người dùng', icon: <MdGroup className='fs-5' />, value: 'user' },
        { label: 'Quản lý chủ sân', icon: <TbSoccerField className='fs-5' />, value: 'owner' },
    ];

    return (
        <div className={`admin-sidebar d-flex flex-column ${darkMode ? 'dark-mode' : ''} align-items-center`}>
            <div className={`admin-user p-2 mt-2 d-flex ${!expand ? 'justify-content-start' : 'justify-content-around'} align-items-center px-4`}>
                <div className='admin--avatar' style={{
                    width: '40px',
                    height: '40px',
                    background: `url(${process.env.PUBLIC_URL}/assets/pancake.jpg)`,
                    backgroundSize: 'cover',
                    borderRadius: '50px'
                }}></div>
                {!expand && (
                    <div className='admin-info ms-3 d-flex flex-column'>
                        <span style={{ textWrap: 'nowrap' }}>David Adam</span>
                        <span className='text-secondary' style={{ fontSize: '12px', textWrap: 'nowrap' }}>Project Manager</span>
                    </div>
                )}
            </div>
            <div className='sidebar-option w-100 mt-3 px-3 d-flex flex-column'>
                {options.map(option => (
                    <SidebarButton
                        key={option.value}
                        option={option.label}
                        icon={option.icon}
                        active={optionSidebar === option.value}
                        onclick={() => setOptionSideBar(option.value)}
                        border={option.border}
                        labelborder={option.labelborder}
                        expand={expand} />
                ))}
            </div>
        </div>
    );
};

export default AdminSideBar;
