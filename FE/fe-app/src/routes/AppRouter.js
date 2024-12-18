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
import { UserProvider } from "../context/UserContext";
import ForgotPassword from "../pages/client/ForgotPassword";
import Wishlist from "../components/Wishlist";
import { YardProvider } from "../context/YardContext";
import { BookingProvider } from "../context/BookingContext";
import { PaymentProvider } from "../context/PaymentContext";
import { MomoProvider } from "../context/MomoContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const AppRoutes = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={
                <>
                    <Header />
                    <LinkHeader />
                    <Outlet />
                    <Footer />
                </>
            }>
                <Route path="/" element={<HomePage />} />
                <Route path="/san-the-thao/:id" element={
                    <YardProvider>
                        <DetailPage />
                    </YardProvider>} />
                <Route path='/my-cart' element={
                    <MomoProvider>
                        <PaymentProvider>
                            <YardProvider>
                                <BookingProvider>
                                    <CartPage />
                                </BookingProvider>
                            </YardProvider>
                        </PaymentProvider>
                    </MomoProvider>

                } />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/yard-types/:type" element={<YardType />} />
            </Route>
            <Route path="/auth"
                element={
                    <GoogleOAuthProvider clientId="481270872030-0la719tvk2gk12jbcucua620qp4pctpc.apps.googleusercontent.com">
                        <LoginPage />
                    </GoogleOAuthProvider>
                } />
            <Route path="/auth/user-info"
                element={
                    <UserProvider>
                        <UserInfoPage />
                    </UserProvider>
                } />
            <Route path="/auth/forgot-password"
                element={
                    <ForgotPassword />
                } />
        </Routes>
    );
}