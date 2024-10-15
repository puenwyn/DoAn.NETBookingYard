import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../pages/client/HomePage";
import DetailPage from "../pages/client/DetailPage";
import LoginPage from "../pages/client/LoginPage";
import { useEffect } from "react";

export const AppRoutes = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route element={
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            }>
                <Route path="/" element={<HomePage />} />
                <Route path="/san-the-thao/:id" element={<DetailPage />} />
            </Route>
            <Route path="/auth" element={<LoginPage />} />
        </Routes>
    );
}
