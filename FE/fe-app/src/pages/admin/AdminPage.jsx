import React, { useState } from 'react';
import '../../styles/components/admin.css';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminDashboard from '../../components/admin/AdminDashboard';
import AdminSideBar from '../../components/admin/AdminSidebar';
import Table from '../../components/admin/Table';
import AdminYardManager from '../../components/admin/AdminYardManager';
import UserTable from '../../components/admin/UserTable';
import AdminYardDetail from '../../components/admin/AdminYardDetail';
import AdminOwner from '../../components/admin/AdminOwner';
import AdminOwnerTable from '../../components/admin/AdminOwnerTable';
import AdminUserDetail from '../../components/admin/AdminUserDetail';
import AdminUserTable from '../../components/admin/AdminUserTable';
import AdminChart from '../../components/admin/AdminChart';

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
                // return <AdminDashboard darkMode={darkMode} className='admin-dashboard' />;
                return <AdminDashboard />
            case 'chart':
                return <AdminChart />
            case 'booking':
                return <UserTable />;
            case 'account':
                return <AdminUserDetail />;
            case 'yard':
                return <AdminYardDetail />;
            case 'owner':
                return <AdminOwnerTable />;
            case 'user':
                return <AdminUserTable />
        }
    }

    return (
        <div className={`${darkMode ? 'dark-mode' : ''} ${menuSidebar ? 'expand-menu' : ''} admin-page d-flex`}>
            <AdminSideBar darkMode={darkMode} optionSidebar={optionSidebar} setOptionSideBar={setOptionSidebar} expand={menuSidebar} />
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