import React, { useState } from 'react';
import '../../styles/components/admin.css';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminDashboard from '../../components/admin/AdminDashboard';
import AdminSideBar from '../../components/admin/AdminSidebar';
import Table from '../../components/admin/Table';
import AdminYardManager from '../../components/admin/AdminYardManager';
import UserTable from '../../components/admin/UserTable';

const AdminPage = () => {

    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('mode');
        return savedMode === 'true';
    });
    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);

        localStorage.setItem('mode', newMode);
    };

    const [menuSidebar, setMenuSidebar] = useState(() => {
        const savedMenu = localStorage.getItem('expand');
        return savedMenu === 'true';
    })
    const toggleExpandMenu = () => {
        const newExpand = !menuSidebar;
        setMenuSidebar(newExpand);
        localStorage.setItem('expand', newExpand);
    }

    const [optionSidebar, setOptionSidebar] = useState('dashboard');
    const handleOption = () => {
        switch(optionSidebar) {
            case 'dashboard':
                return <AdminDashboard darkMode={darkMode} className='admin-dashboard' />;
            case 'booking':
                return <UserTable />;
            case 'account':
                break;
            case 'yard':
                break;
            case 'owner':
                break;
        }
    }

    return (
        <div className={`${darkMode ? 'dark-mode' : ''} ${menuSidebar ? 'expand-menu' : ''} admin-page d-flex`}>
            <AdminSideBar darkMode={darkMode} optionSidebar={optionSidebar} setOptionSideBar={setOptionSidebar} />
            <div className='admin-content px-1 py-1 d-flex flex-column'>
                <AdminHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleExpandMenu={toggleExpandMenu} />
                <div className='admin-content-option px-2 d-flex'>
                    {handleOption()}
                </div>
            </div>
        </div>
    )
}

export default AdminPage;