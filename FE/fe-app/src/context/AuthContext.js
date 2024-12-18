import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [otpStatus, setOtpStatus] = useState(''); // Trạng thái gửi OTP
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // kiểm tra tên đăng nhập có tồn tại không
    const checkUsernameExists = async (username) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://localhost:7071/api/v1/User/check-username?username=${username}`);
            return response.data;
        } catch (err) {
            setError(err);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get(`https://localhost:7071/api/v1/User/check-email/valid?email=${email}`);
            return response.data;
        } catch (err) {
            setError(err);
            return false;
        }
    };

    const sendResetPasswordEmail = async (username) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`https://localhost:7071/api/v1/Auth/sendResetPasswordEmail?username=${username}`);
            return response.data;
        } catch (error) {
            console.error("Error sending reset password email:", error);
            throw new Error("Không thể gửi email reset mật khẩu.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (token, newPassword) => {
        setIsLoading(true);
        try {
            const response = await axios.patch('https://localhost:7071/api/v1/Auth/resetPassword',
                { newPassword },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.status === 200;
        } catch (err) {
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const sendOtp = async (email) => {
        setIsLoading(true);
        try {
            setOtpStatus('loading');
            const response = await axios.get(`https://localhost:7071/api/v1/SendEmail/send-otp?email=${email}`, { withCredentials: true });
            if (response.status === 200) {
                setOtpStatus('sent');
                return true;
            } else {
                setOtpStatus('failed');
                return false;
            }
        } catch (error) {
            setOtpStatus('failed');
            console.error('Lỗi khi gửi OTP:', error);
            return false;
        } finally {
            setIsLoading(false)
        }
    };


    const verifyOtp = async (email, otp) => {
        if (!otp) {
            alert('Vui lòng nhập mã OTP.');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(`https://localhost:7071/api/v1/SendEmail/verify-otp?email=${email}&otp=${otp}`, {}, { withCredentials: true });
            if (response.status === 200) {
                setStatus('Mã OTP chính xác, xác minh thành công');
                return true;
            } else {
                setStatus('Mã OTP không chính xác!');
                return false;
            }
        } catch (error) {
            console.error('Lỗi khi xác minh OTP:', error);
            setStatus('Mã OTP không chính xác!');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const checkTokenValidity = async () => {
        try {
            // Gửi yêu cầu mà không cần phải lấy token thủ công, chỉ cần chắc chắn withCredentials là true.
            const response = await axios.get('https://localhost:7071/api/v1/Auth/validate-token', {
                withCredentials: true,  // Gửi cookie đi với yêu cầu
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error during token validation:", error);
            return false;
        }
    };


    const login = async (username, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                "https://localhost:7071/api/v1/Auth/login",
                { username, password },
                { withCredentials: true, }
            );
            if (response.status === 200) {
                setIsAuthenticated(true);
                return response.data;
            }
            return response.response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return error.response.data;
            } else {
                setError("Đăng nhập thất bại, vui lòng thử lại!"); 
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Đăng xuất
    const logout = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("https://localhost:7071/api/v1/Auth/logout", {}, { withCredentials: true });
            if (response.status === 200) {
                setIsAuthenticated(false); // Đánh dấu người dùng đã đăng xuất
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            checkUsernameExists,
            sendOtp,
            verifyOtp,
            checkEmailExists,
            sendResetPasswordEmail,
            resetPassword,
            checkTokenValidity,
            isAuthenticated,
            error,
            status,
            isLoading,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}