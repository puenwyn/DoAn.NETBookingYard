import React from 'react';
import '../../styles/components/adminHeader.css';
import { FaSearch, FaRegBell } from 'react-icons/fa';
import { FaRegMoon, FaRegSun } from "react-icons/fa6";
import { IoAppsSharp, IoMenu } from "react-icons/io5";
import { IconButton } from '@mui/material';

const AdminHeader = ({ darkMode, toggleDarkMode, toggleExpandMenu }) => {
    return (
        <div className={`admin-header d-flex justify-content-between align-items-center ${darkMode ? 'dark-mode' : ''} mb-3`}>
            <div className='d-flex align-items-center ms-4'>
                <IconButton className='icon-option' size='small' onClick={toggleExpandMenu}>
                    <IoMenu className='fs-4' color={darkMode ? 'rgb(239, 228, 250)' : 'rgb(0, 0, 0)'} />
                </IconButton>

                <img className='ms-2' src="assets/logo2.svg" alt="Logo" style={{ width: '150px', backgroundSize: 'cover' }} />
            </div>
            <div>
                <div className='admin-option-icon d-flex align-items-center'>
                    <div className='admin-avatar me-1'>
                        <div className='admin-active'></div>
                    </div>
                    <IconButton className='icon-option ms-2' size='small' color="secondary">
                        <FaSearch fontSize='16px' color={darkMode ? 'rgb(239, 228, 250)' : 'rgb(71, 28, 168)'} />
                    </IconButton>
                    <IconButton className='icon-option ms-2' size='small' color="secondary" onClick={toggleDarkMode}>
                        {darkMode ? (
                            <FaRegSun fontSize='18px' color='rgb(239, 228, 250)' />
                        ) : (
                            <FaRegMoon fontSize='18px' color='rgb(71, 28, 168)' />
                        )}
                    </IconButton>
                    <IconButton className='icon-option ms-2' size='small' color="secondary">
                        <IoAppsSharp fontSize='18px' color={darkMode ? 'rgb(239, 228, 250)' : 'rgb(71, 28, 168)'} />
                    </IconButton>
                    <IconButton className='icon-option ms-2' size='small' color="secondary">
                        <FaRegBell fontSize='18px' color={darkMode ? 'rgb(239, 228, 250)' : 'rgb(71, 28, 168)'} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
