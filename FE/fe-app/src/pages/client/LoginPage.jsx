import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { FaLock, FaEye, FaEyeSlash, FaUser, FaExclamationCircle } from "react-icons/fa";

const LoginPage = () => {
    const navigate = useNavigate();
    const { checkUsernameExists, login, error } = useAuthContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState(true);
    const [formError, setFormError] = useState('');
    const location = useLocation();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const usernameFrm = username;
        const passwordFrm = password;
        const result = await login(usernameFrm, passwordFrm);
        if (result) {
            Swal.fire({
                title: "Đăng nhập thành công",
                text: "Chào mừng bạn đến với đặt sân online!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate('/');
            });
        } else {
            Swal.fire({
                title: "Đăng nhập không thành công",
                text: error,
                icon: "error",
                confirmButtonText: "OK",
            })
        }
    };

    useEffect(() => {
        if (location.hash === "#register") {
            setAction(false);
        } else {
            setAction(true);
        }
    }, [location.hash]);

    const [password2, setPassword2] = useState('');
    // Biểu thức chính quy kiểm tra username hợp lệ
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    // Kiểm tra mật khẩu tối thiểu 6 ký tự
    const passwordMinLength = 6;

    // Xử lý thay đổi dữ liệu
    const onChangeTextField = (e, field) => {
        const value = e.target.value;
        if (field === 'username') {
            // Kiểm tra tên đăng nhập (username)
            if (!usernameRegex.test(value)) {
                setFormError("Tên đăng nhập chỉ được phép chứa chữ cái và số, không có dấu cách hoặc ký tự đặc biệt.");
                setUsername(value);  // Giữ lại giá trị người dùng đã nhập
            } else {
                setFormError(''); // Xóa lỗi khi đúng
                setUsername(value); // Cập nhật giá trị của username
            }

        } else if (field === 'password') {
// Kiểm tra mật khẩu (password)
            if (value.length < passwordMinLength) {
                setFormError(`Mật khẩu phải có ít nhất ${passwordMinLength} ký tự.`);
                setPassword(value); // Giữ lại giá trị người dùng đã nhập
            } else if (!usernameRegex.test(value)) {
                setFormError("Mật khẩu chỉ được phép chứa chữ cái và số, không có dấu cách hoặc ký tự đặc biệt.");
                setPassword(value); // Giữ lại giá trị người dùng đã nhập
            } else {
                setFormError(''); // Xóa lỗi khi đúng
                setPassword(value); // Cập nhật giá trị của password
            }

        } else if (field === 'confirmPassword') {
            // Kiểm tra xác nhận mật khẩu (confirmPassword)
            if (value !== password) {
                setFormError("Mật khẩu xác nhận chưa khớp.");
                setPassword2(value); // Giữ lại giá trị người dùng đã nhập
            } else {
                setFormError(''); // Xóa lỗi khi đúng
                setPassword2(value); // Cập nhật giá trị của confirmPassword
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!usernameRegex.test(username)) {
            setFormError("Tên đăng nhập chỉ được phép chứa chữ cái và số, không có dấu cách hoặc ký tự đặc biệt.");
            return;
        }
        if (password.length < passwordMinLength) {
            setFormError(`Mật khẩu phải có ít nhất ${passwordMinLength} ký tự.`);
            return;
        } else if (!usernameRegex.test(password)) {
            setFormError("Mật khẩu chỉ được phép chứa chữ cái và số, không có dấu cách hoặc ký tự đặc biệt.");
            return;
        }
        if (password2 !== password) {
            setFormError("Mật khẩu xác nhận chưa khớp.");
            return;
        }

        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            await Swal.fire({
                title: 'Tên tài khoản đã tồn tại!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        } else {
            const account = {
                username: username,
                password: password,
            };
            resetInput();
            navigate('user-info', { state: { account } });
        }
    }

    const resetInput = () => {
        setUsername('');
        setPassword('');
        setPassword2('');
    }

    return (

        <div className={`wrap-form d-flex justify-content-center align-items-center`}>
            <div className="curved-container bg-white">
                <div className="gradient-container">

                </div>
            </div>
            <style>
                {`
                    /* Định dạng thông báo lỗi */
                    .error-message {
color: #d9534f; /* Màu đỏ đặc trưng cho lỗi */
                        background-color: #f8d7da; /* Màu nền nhẹ để dễ nhìn */
                        border: 1px solid #d9534f; /* Viền màu đỏ */
                        padding: 10px;
                        border-radius: 5px;
                        margin-top: 10px;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                    }

                    .error-message svg {
                        margin-right: 8px; /* Khoảng cách giữa icon và văn bản */
                    }
                `}
            </style>
            <div className="form-container">
                <div className={`form-box login bg-white py-4 px-5 ${action ? 'show-login' : 'hide-login'}`}>
                    <form className="form-custom" action="" onSubmit={handleLogin} style={{ width: '100%' }}>
                        <h2 className="text-center">Đăng nhập</h2>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input type="text" name="username-login" id="username-login" placeholder="Tài khoản" required onChange={(e) => setUsername(e.target.value)} />
                            <FaUser className="input-icon" />
                        </div>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input type="password" name="password-login" id="password-login" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} required />
                            <FaLock className="input-icon" />
                        </div>
                        <div className="remember-forgot d-flex justify-content-around">
                            <a href="/auth/forgot-password" className="text-decoration-none text-center">Quên mật khẩu</a>
                        </div>
                        <Button type="submit" variant="contained" color="success" className="mt-3">Đăng nhập</Button>
                        <Button variant="outlined" className="button-custom mt-3">
                            <img
                                src="/assets/icons8-google-50.png"
                                alt="Google Icon"
                                style={{ width: '20px', height: '20px', marginRight: '8px' }}
                            />
                            Đăng nhập bằng Google
                        </Button>
                        <div className="register-link mt-3">
                            <p className=" d-flex justify-content-center">Bạn chưa có tài khoản?<a href="#register" className="ms-2 text-decoration-none">Đăng ký ngay</a></p>
                        </div>
                    </form>
                </div>
<div className={`form-box register bg-white py-4 px-5 ${action ? 'hide-register' : 'show-register'}`}>
                    <form className="form-custom" action="" onSubmit={handleRegister} style={{ width: '100%' }}>
                        <h2 className="text-center">Đăng ký</h2>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input type="text" name="" id="" placeholder="Tên tài khoản" required onChange={(e) => onChangeTextField(e, 'username')} />
                            <FaUser className="input-icon" />
                        </div>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input type={passwordVisible ? "text" : "password"} name="" id="" placeholder="Mật khẩu" onChange={(e) => onChangeTextField(e, 'password')} />
                            {/* Icon toggle để ẩn/hiện mật khẩu */}
                            <span onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash className="input-icon" /> : <FaEye className="input-icon" />} {/* Mắt đóng hoặc mở */}
                            </span>
                        </div>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input type={confirmPasswordVisible ? "text" : "password"} name="" id="" placeholder="Xác nhận mật khẩu" onChange={(e) => onChangeTextField(e, 'confirmPassword')} />
                            {/* Icon toggle để ẩn/hiện mật khẩu */}
                            <span onClick={toggleConfirmPasswordVisibility}>
                                {confirmPasswordVisible ? <FaEyeSlash className="input-icon" /> : <FaEye className="input-icon" />} {/* Mắt đóng hoặc mở */}
                            </span>
                        </div>
                        {formError && (
                            <div className="error-message">
                                <FaExclamationCircle color="#d9534f" size={20} />
                                <span>{formError}</span>
                            </div>
                        )}
                        {/* <div className="remember-forgot d-flex justify-content-between">
                            <label htmlFor="">
                                <input type="checkbox" name="" id="" className="me-1" />Nhớ mật khẩu
                            </label>
                        </div> */}
                        <Button type="submit" variant="contained" color="success" className="mt-3">Đăng ký tài khoản</Button>
                        <div className="register-link mt-3">
                            <p className=" d-flex justify-content-center">Bạn đã có tài khoản?<a href="#login" className="ms-2 text-decoration-none">Đăng nhập</a></p>
</div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;