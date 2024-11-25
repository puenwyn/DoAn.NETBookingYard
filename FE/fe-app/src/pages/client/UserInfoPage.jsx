import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { FaUser, FaLock, FaCalendar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const UserInfoPage = () => {
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);

    const navigate = useNavigate();

    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault();
        setShowOtp(true);
        await Swal.fire({
            title: 'SMS đã được gửi đến số điện thoại của bạn!',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        await Swal.fire({
            title: 'Xác minh thành công!',
            icon: 'success',
            confirmButtonText: 'OK',
        });
        navigate('/');
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
                                placeholder="Số điện thoại"
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <FaLock className="input-icon" />
                        </div>
                        <Button type="submit" variant="contained" color="success">Gửi thông tin</Button>
                    </form>
                </div>
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfoPage;