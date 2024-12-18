import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { FaUser, FaLock, FaCalendar } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

const UserInfoPage = () => {
    const { sendOtp, verifyOtp, status, isLoading, checkEmailExists } = useAuthContext();
    const { createNewUser } = useUser();
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);

    const { state } = useLocation();
    const { account } = state || {};
    const navigate = useNavigate();

    const [countdown, setCountdown] = useState(300);
    const [resendAllowed, setResendAllowed] = useState(false);

    useEffect(() => {
        if (countdown === 0) {
            setResendAllowed(true);
        } else {
            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [countdown]);

    if (!account) {
        navigate(-1)
        return;
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    const isValidPhoneNumber = (phone) => {
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        return phoneRegex.test(phone);
    };
    const isValidBirthDate = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        const age = today.getFullYear() - birthDateObj.getFullYear();
        const month = today.getMonth() - birthDateObj.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
            return age - 1 >= 16;
        }
        return age >= 16;
    };
    const isValidFullName = (fullName) => {
        const nameRegex = /^[\w\s\u00C0-\u1EF9]*$/u;
        return nameRegex.test(fullName.trim());
    };

    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra họ và tên
        if (!isValidFullName(fullName)) {
            await Swal.fire({
                title: 'Lỗi',
                text: 'Họ và tên không hợp lệ! Không chứa số và ký tự đặc biệt.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Kiểm tra giới tính
        if (!gender) {
            await Swal.fire({
                title: 'Lỗi',
                text: 'Bạn phải chọn giới tính!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Kiểm tra ngày sinh >= 16 tuổi
        if (!isValidBirthDate(birthDate)) {
            await Swal.fire({
                title: 'Lỗi',
                text: 'Bạn phải từ 16 tuổi trở lên!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Kiểm tra email hợp lệ
        if (!isValidEmail(email)) {
            await Swal.fire({
                title: 'Lỗi',
                text: 'Email không hợp lệ!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Kiểm tra số điện thoại hợp lệ
        if (!isValidPhoneNumber(phone)) {
            await Swal.fire({
                title: 'Lỗi',
                text: 'Số điện thoại không hợp lệ! Phải có 10 số và đúng định dạng.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        const checkEmail = await checkEmailExists(email);
        if (checkEmail) {
            Swal.fire({
                title: 'Lỗi',
                text: 'Email này đã được sử dụng, vui lòng sử dụng email khác',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } else {
            const result = await sendOtp(email);
            if (result) {
                Swal.fire({
                    title: 'OTP đã được gửi đến email của bạn!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    setShowOtp(true);
                });
            } else {
                Swal.fire({
                    title: 'Đã xảy ra lỗi!',
                    text: 'Không thể gửi OTP, vui lòng thử lại!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const result = await verifyOtp(email, otp);
        if (result) {
            const userData = {
                username: account.username,
                hashedPassword: account.password,
                email: email,
                phoneNumber: phone,
                fcmToken: '',
                fullName: fullName,
                dateOfBirth: birthDate,
                gender: gender === 'male' ? 0 : 1,
                address: '',
            }
            const result_create = await createNewUser(userData);
            if (result_create.status === 'error') {
                Swal.fire({
                    title: "Thông báo",
                    text: "Đăng ký tài khoản mới không thành công!",
                    icon: "error",
                    confirmButtonText: "OK",
                })
            } else {
                Swal.fire({
                    title: "Thành công",
                    text: "Chào mừng bạn đến với đặt sân online vui lòng đăng nhập!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/auth#login");
                });
            }
        } else {
            Swal.fire({
                title: "Xác minh không thành công",
                text: status, // Trạng thái lỗi từ backend
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleResendOtp = async () => {
        const result = await sendOtp(email);
        if (result) {
            setCountdown(300); // Reset thời gian đếm ngược về 5 phút
            setResendAllowed(false); // Tắt nút gửi lại OTP ngay khi gửi
            Swal.fire({
                title: 'OTP đã được gửi lại!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } else {
            Swal.fire({
                title: 'Lỗi',
                text: 'Không thể gửi lại mã OTP!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="wrap-form d-flex justify-content-center align-items-center">
            <div className="curved-container bg-white">
                <div className="gradient-container"></div>
            </div>
            <div className="form-container">
                <div className={`form-box bg-white py-4 px-5 ${showOtp ? 'hide-info' : 'show-info'}`}>
                    <h2 className="text-center">Thông tin cá nhân</h2>
                    <form className="form-custom" onSubmit={handlePersonalInfoSubmit}>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                required
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <FaUser className="input-icon" />
                        </div>
                        <div className="input-box d-flex align-items-center ps-4">
                            <label>Giới tính:</label>
                            <div className="gender-options d-flex">
                                <div className="gender-option d-flex align-items-center ps-3">
                                    <input
                                        type="radio"
                                        value="male"
                                        name="gender"
                                        id="male"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className='ms-1' htmlFor="male">Nam</label>
                                </div>
                                <div className="gender-option d-flex align-items-center ps-3">
                                    <input
                                        type="radio"
                                        value="female"
                                        name="gender"
                                        id="female"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className='ms-1' htmlFor="female">Nữ</label>
                                </div>
                            </div>
                        </div>

                        <div className="input-box d-flex flex-column justify-content-center align-items-center position-relative">
                            <input
                                type="date"
                                required
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="date-input"
                            />
                            <FaCalendar className="input-icon" />
                        </div>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FaLock className="input-icon" />
                        </div>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input
                                type="text"
                                placeholder="Số điện thoại"
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <FaLock className="input-icon" />
                        </div>
                        <Button type="submit" variant="contained" color="success">Gửi thông tin</Button>
                    </form>
                </div>
                {isLoading && (
                    <div className="loading-overlay">
                        <div className="loading-circle"></div>
                    </div>
                )}
                {showOtp && (
                    <div className={`form-box bg-white py-4 px-5 d-flex flex-column justify-content-center`}>
                        <form className="form-custom" onSubmit={handleOtpSubmit}>
                            <h2 className="text-center">Nhập mã OTP</h2>
                            <div className="input-box d-flex flex-column justify-content-center align-items-center">
                                <input
                                    type="text"
                                    placeholder="Mã OTP"
                                    required
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <FaLock className="input-icon" />
                            </div>
                            <Button type="submit" variant="contained" color="success">Xác nhận</Button>
                        </form>
                        {countdown > 0 && (
                            <div className="countdown-timer pt-2 text-center">
                                <p>OTP có hiệu lực sau: {formatTime(countdown)}</p>
                            </div>
                        )}
                        {resendAllowed && (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleResendOtp}
                                sx={{
                                    marginTop: '10px'
                                }}
                            >
                                Gửi lại mã OTP
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfoPage;