import React, { useState } from 'react';
import '../../styles/components/admin.css';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminDashboard from '../../components/admin/AdminDashboard';
import AdminSideBar from '../../components/admin/AdminSidebar';
import AdminYardManager from '../../components/admin/AdminYardManager';
import AdminBookingTable from '../../components/admin/AdminBookingTable';
import AdminOwnerTable from '../../components/admin/AdminOwnerTable';
import AdminUserTable from '../../components/admin/AdminUserTable';
import AdminVoucherTable from '../../components/admin/AdminVoucherTable';
import AdminUpdateViewInfo from '../../components/admin/AdminUpdateViewInfo';
import AdminYardView from '../../components/admin/AdminYardView';
import { OwnerProvider } from '../../context/OwnerContext';
import { UserProvider } from '../../context/UserContext';
import { YardTypeProvider } from '../../context/YardTypeContext';
import { VoucherProvider } from '../../context/VoucherContext';
import { YardAdminContext, YardAdminProvider } from '../../context/YardAdminContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif'
    },
});

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
        switch (optionSidebar) {
            case 'dashboard':
                // return <AdminDashboard darkMode={darkMode} className='admin-dashboard' />;
                return <AdminDashboard />
            case 'voucher':
                return (
                    <VoucherProvider>
                        <AdminVoucherTable />
                    </VoucherProvider>
                );
            case 'chart':
                return (
                    <AdminYardView />
                );
            case 'booking':
                return <AdminBookingTable />;
            case 'account':
                return <AdminUpdateViewInfo />;
            case 'yard':
                return (
                    <YardAdminProvider>
                        <YardTypeProvider>
                            <AdminYardManager />
                        </YardTypeProvider>
                    </YardAdminProvider>
                )

            case 'owner':
                return (
                    <OwnerProvider>
                        <AdminOwnerTable />
                    </OwnerProvider>
                );
            case 'user':
                return (
                    <UserProvider>
                        <AdminUserTable />
                    </UserProvider>
                )
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={`${darkMode ? 'dark-mode' : ''} ${menuSidebar ? 'expand-menu' : ''} admin-page d-flex`}>
                <AdminSideBar darkMode={darkMode} optionSidebar={optionSidebar} setOptionSideBar={setOptionSidebar} expand={menuSidebar} />
                <div className='admin-content px-1 py-1 d-flex flex-column'>
                    <AdminHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleExpandMenu={toggleExpandMenu} />
                    <div className='admin-content-option px-2 d-flex'>
                        {handleOption()}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default AdminPage;