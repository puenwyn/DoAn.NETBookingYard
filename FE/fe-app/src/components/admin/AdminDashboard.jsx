import React, { useState } from 'react';
import LineChart from './LineChart';
import { FaRegCalendarAlt, FaSortUp, FaSortDown, FaCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { LuWallet } from "react-icons/lu";
import '../../styles/components/adminDashboard.css';
import { DoughnutChart, DoughnutChart2 } from './DoughnutChart';
import { BarChart } from './BarChart';
import { Box, IconButton } from '@mui/material';
import MyDatePicker from './CalendarDashboard';

const AdminDashboard = ({ darkMode }) => {
    const [optionLine, setOptionLine] = useState('1');

    const handleOptionLine = (option) => {
        setOptionLine(option);
    };

    const dataset = [
        { label: 'Red', stat: 31 },
        { label: 'Blue', stat: 28 },
        { label: 'Yellow', stat: 6 },
        { label: 'Green', stat: 9 },
        { label: 'Orange', stat: 7 },
    ]

    return (
        <div className='admin-dashboard ms-4 d-flex flex-column'>
            <div className={`dashboard d-flex flex-row justify-content-between ${darkMode ? 'dark-mode' : ''}`}>
                <div className='db-welcome d-flex flex-column'>
                    <span className={`fs-4 ${darkMode ? 'text-white' : 'text-dark'}`}>Good Morning,</span>
                    <span className={`fs-2 ${darkMode ? 'text-white' : 'text-dark'}`}>Admin</span>
                </div>
                <div className='db-overview d-flex gap-3'>
                    {['Total Profit', 'Best Profit', 'Top Loser'].map((item, index) => (
                        <div key={index} className='overview-item d-flex flex-column'>
                            <span className='text-overview'>{item}</span>
                            <span className={`fs-4 fw-bold ${darkMode ? 'text-white' : 'text-dark'}`}>${(index === 0 ? '13.20k' : index === 1 ? '8.34k' : '-5.15k')}</span>
                            <div className='overview-cent fw-bold'>+ 28.50%</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bổ sung Dashboard */}
            <div className='dashboard-calendar mt-3 mb-2 d-flex'>
                <div className='dashboard-image'>

                </div>
                <div className='dashboard-basic ms-3'>
                    <div className='dashboard-calendar-pick bg-white'>
                        <MyDatePicker />
                    </div>
                </div>
            </div>

            <div className={`line-chart-dashboard d-flex mt-3 ${darkMode ? 'dark-mode' : ''}`}>
                <div className='poster'>
                    <div className='poster-color'></div>
                    <div className='poster-blur p-4'>
                        <p className='fw-bold text-white fs-5'>Your portfolio value has grown by</p>
                    </div>
                </div>
                <div className='line-chart bg-white d-flex flex-column ms-3 p-2'>
                    <div className='line-chart-title d-flex justify-content-between px-3'>
                        <span>Summary</span>
                        <div className='chart-day d-flex align-items-center'>
                            <span>30/09/2024-06/10/2024</span>
                            <IconButton className='ms-1' size='small' color="secondary">
                                <FaRegCalendarAlt fontSize='inherit' color={darkMode ? 'rgb(245, 240, 250)' : 'rgb(71, 28, 168)'} />
                            </IconButton>
                        </div>
                    </div>
                    <div className='main-linechart d-flex'>
                        <div className='line-chart-info pb-2 d-flex flex-column justify-content-around'>
                            {['Current Value', 'Profit Revenue', 'Investment'].map((item, index) => (
                                <div key={index} className={`lineinfo-item px-3 py-2 ${optionLine === (index + 1).toString() ? 'active' : ''}`} onClick={() => handleOptionLine((index + 1).toString())}>
                                    <span className='fs-6'>{item}</span>
                                    <p className='fs-4 fw-bold'>${(index === 0 ? '65.52k' : index === 1 ? '15.51k' : '45.00k')} <span className='fs-6 fw-normal'> + {index === 0 ? '18.5%' : index === 1 ? '11.5%' : '18.5%'}</span></p>
                                </div>
                            ))}
                        </div>
                        <div className='linechart p-2 d-flex flex-row-reverse'>
                            <LineChart />
                        </div>
                    </div>
                </div>
            </div>
            <div className='stats-parameter mt-3 d-flex justify-content-between'>
                {[
                    { label: 'Update', value: 'Today Live' },
                    { label: '41,118.13', change: <FaSortUp />, percent: '0.40%', color: 'text-green' },
                    { label: '30,006.00', change: <FaSortDown />, percent: '0.40%', color: 'text-danger' },
                    { label: '90,105.00', change: <FaSortUp />, percent: '1.40%', color: 'text-green' },
                    { label: '24,806.00', change: <FaSortUp />, percent: '1.40%', color: 'text-green' },
                ].map((item, index) => (
                    <div key={index} className='stats-item'>
                        <span className={item.color || ''}>{item.label}</span>
                        {item.value ? (
                            <p className='d-flex'>{item.value}<span className='text-danger'>{item.change}</span></p>
                        ) : (
                            <p className='d-flex'>{item.label} <span className={item.color}>{item.change} {item.percent}</span></p>
                        )}
                    </div>
                ))}
            </div>
            <div className='bar-and-pie d-flex mt-3 pb-3'>
                <div className='pie-chart d-flex py-3 px-4 bg-white'>
                    <div className='pie-chart-main'>
                        <h5>Investment Categories</h5>
                        <DoughnutChart2 dataset={dataset} full={true} />
                        <p>You have invested in different types of categories to stats</p>
                    </div>
                    <div className='pie-chart-stats d-flex flex-wrap align-items-center ms-3'>
                        {[
                            { label: 'Share holding', amount: '$165.20k', change: '▲ 25.30%', color: 'rgb(255, 99, 132)' },
                            { label: 'Mutual Funds', amount: '$265.85k', change: '▲ 21.42%', color: 'rgb(253, 126, 20)' },
                            { label: 'Bank Bonds', amount: '$356.26k', change: '▲ 20.18%', color: 'rgb(54, 162, 235)' },
                            { label: 'Gov. Securities', amount: '$185.65k', change: '▲ 15.65%', color: 'rgb(255, 193, 7)' },
                            { label: 'Fixed Deposit', amount: '$190.45k', change: '▲ 18.50%', color: 'rgb(111, 170, 0)' },
                        ].map((item, index) => (
                            <div key={index} className='pie-stats-item'>
                                <div className='pie-stats-label d-flex align-items-center'>
                                    <FaCircle color={item.color} className='me-2' style={{ fontSize: '10px' }} />
                                    {item.label}
                                </div>
                                <div className='pie-stats-legend d-flex flex-column ms-3'>
                                    <span className='fs-5 fw-bold'>{item.amount}</span>
                                    <span className='text-green' style={{ fontSize: '14px' }}>{item.change}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bar-chart bg-white ms-3 py-3 px-4'>
                    <div className='bar-chart-title d-flex justify-content-between'>
                        <div className='title-wallet d-flex align-items-center fs-6'>
                            <IconButton size='small' style={{ backgroundColor: 'rgb(239, 228, 250)' }} color="secondary">
                                <LuWallet />
                            </IconButton>
                            <span className='ms-2 fw-bold'>My Wallet</span>
                        </div>
                        <div className='title-option'>
                            <IconButton size='small' color="secondary">
                                <GrPowerReset />
                            </IconButton>
                        </div>
                    </div>
                    <div className='bar-stats mt-3'>
                        <span className='fs-4 fw-bold'>$ 1152.25k</span>
                        <p>Total net revenue is 756.83 + <span className='text-green'>11.5%</span> increased in last week</p>
                    </div>
                    <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
                        {/* <BarChart /> */}
                        <div className='bar-note mt-3 p-3'>
                            <p>Top performing investment is <span className='fw-bold' style={{ color: 'rgb(71, 28, 168)' }}>Share holdings</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
