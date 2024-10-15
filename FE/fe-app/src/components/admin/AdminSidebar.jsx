import React from 'react';
import { CiUser } from "react-icons/ci";
import { MdOutlineDashboard, MdAccountBox } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import '../../styles/components/adminSidebar.css';

const AdminSideBar = ({ darkMode, optionSidebar, setOptionSideBar }) => {
    const options = [
        { label: 'Màn hình chính', icon: <MdOutlineDashboard className='fs-4'/>, value: 'dashboard' },
        { label: 'Quản lý đặt sân', icon: <LuWallet className='fs-4'/>, value: 'booking' },
        { label: 'Thông tin cá nhân', icon: <MdAccountBox className='fs-4'/>, value: 'account' },
        { label: 'Quản lý sân', icon: <MdAccountBox className='fs-4'/>, value: 'yard' },
        { label: 'Quản lý chủ sân', icon: <MdAccountBox className='fs-4'/>, value: 'owner' },
    ];

    return (
        <div className={`admin-sidebar d-flex flex-column ${darkMode ? 'dark-mode' : ''} align-items-center`}>
            <div className='admin-user p-2 mt-2 d-flex align-items-center px-3'>
                <div className='admin--avatar'></div>
                <div className='admin-info ms-3 d-flex flex-column'>
                    <span>David Adam</span>
                    <span className='text-secondary' style={{ fontSize: '12px' }}>Project Manager</span>
                </div>
            </div>
            <div className='sidebar-option w-100 mt-3 px-3'>
                {options.map(option => (
                    <div
                        key={option.value}
                        className={`option d-flex align-items-center mb-1 ${optionSidebar === option.value ? 'active' : ''}`}
                        onClick={() => setOptionSideBar(option.value)}
                        aria-label={option.label}
                    >
                        {option.icon}
                        <span className='ms-3'>{option.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSideBar;
