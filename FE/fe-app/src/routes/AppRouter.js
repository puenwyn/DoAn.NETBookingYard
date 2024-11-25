import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../pages/client/HomePage";
import DetailPage from "../pages/client/DetailPage";
import LoginPage from "../pages/client/LoginPage";
import { useEffect } from "react";
import UserInfoPage from "../pages/client/UserInfoPage";
import CartPage from "../pages/client/CartPage";
import LinkHeader from "../components/LinkHeader";
import NotFound from "../pages/client/ErrorPages/NotFound";
import YardType from "../pages/client/YardType";
import AdminLogin from '../components/admin/AdminLogIn';
import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import ForgotPassword from "../pages/client/ForgotPassword";
import Wishlist from "../components/Wishlist";

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
                    <LinkHeader />
                    <Outlet />
                    <Footer />
                </>
            }>
                <Route path="/" element={<HomePage />} />
                <Route path="/san-the-thao/:id" element={<DetailPage />} />
                <Route path='/my-cart' element={<CartPage />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/yard-types/:type" element={<YardType />} />
            </Route>
            <Route path="/auth"
                element={
                    <AuthProvider>
                        <LoginPage />
                    </AuthProvider>
                } />
            <Route path="/auth/user-info"
                element={
                    <UserProvider>
                        <AuthProvider>
                            <UserInfoPage />
                        </AuthProvider>
                    </UserProvider>
                } />
            <Route path="/auth/forgot-password"
                element={
                    <AuthProvider>
                        <ForgotPassword />
                    </AuthProvider>
                } />
        </Routes>
    );
}