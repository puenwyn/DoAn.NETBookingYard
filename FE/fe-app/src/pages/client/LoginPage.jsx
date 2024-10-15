import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { FaUser, FaLock } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState(true);
    const location = useLocation();
    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
        if (username === 'admin' && password === '123') {
            await Swal.fire({
                title: 'Đăng nhập thành công!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } else {
            await Swal.fire({
                title: 'Lỗi!',
                text: 'Tài khoản hoặc mật khẩu không chính xác!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
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
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            await Swal.fire({
                title: 'Đăng ký không thành công!',
                text: 'Mật khẩu cần giống nhau',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } else {
            await Swal.fire({
                title: 'Đăng ký thành công!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            setAction(!action);
            setUsername('');
            setPassword('');
            setPassword2('');
        }
    }

    const resetInput = () => {

    }

    return (
        <div className={`wrap-form d-flex justify-content-center align-items-center`}>
            <div className="curved-container bg-white">
                <div className="gradient-container">

                </div>
            </div>
            <div className="form-container">
                <div className={`form-box login bg-white py-4 px-5 ${action ? 'show-login' : 'hide-login'}`}>
                    <form className="form-custom" action="" onSubmit={handleLogin} style={{ width: '100%' }}>
                        <h2 className="text-center">Đăng nhập</h2>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input type="text" name="" id="" placeholder="Tài khoản" required onChange={(e) => setUsername(e.target.value)} />
                            <FaUser className="input-icon" />
                        </div>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input type="password" name="" id="" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                            <FaLock className="input-icon" />
                        </div>
                        <div className="remember-forgot d-flex justify-content-between">
                            <label htmlFor="">
                                <input type="checkbox" name="" id="" className="me-1" />Nhớ mật khẩu
                            </label>
                            <a href="#" className="text-decoration-none">Quên mật khẩu</a>
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
                            <input type="text" name="" id="" placeholder="Địa chỉ email" required onChange={(e) => setUsername(e.target.value)} />
                            <FaUser className="input-icon" />
                        </div>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input type="password" name="" id="" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                            <FaLock className="input-icon" />
                        </div>
                        <div className="input-box d-flex flex-column justify-content-center align-items-center">
                            <input type="password" name="" id="" placeholder="Xác nhận mật khẩu" onChange={(e) => setPassword2(e.target.value)} />
                            <FaLock className="input-icon" />
                        </div>
                        <div className="remember-forgot d-flex justify-content-between">
                            <label htmlFor="">
                                <input type="checkbox" name="" id="" className="me-1" />Nhớ mật khẩu
                            </label>
                        </div>
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