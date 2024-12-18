import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const { checkUsernameExists, sendResetPasswordEmail, isLoading, resetPassword } = useAuthContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showEnterPassword, setShowEnterPassword] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [isReadOnlyUsername, setIsReadOnlyUsername] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const location = useLocation();

    const navigate = useNavigate();

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return params.get("token");
    };

    useEffect(() => {
        const token = getQueryParams();
        if (token) {
            setShowEnterPassword(true);
            setIsReadOnlyUsername(false);
        }
    }, [location]);

    const regex = /^[a-zA-Z0-9]+$/;

    const handleChangePassword = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!regex.test(password)) {
            isValid = false;
            Swal.fire({
                title: 'Lỗi!',
                text: 'Mật khẩu chỉ được phép chứa chữ cái và số, không có dấu cách hoặc ký tự đặc biệt.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
        if (password.length < 6) {
            isValid = false;
            Swal.fire({
                title: 'Lỗi!',
                text: 'Mật khẩu phải có ít nhất 6 ký tự.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }

        if (confirmPassword !== password) {
            isValid = false;
            Swal.fire({
                title: 'Lỗi!',
                text: 'Mật khẩu xác nhận chưa khớp.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
        if (isValid) {
            try {
                const token = getQueryParams();
                const result = await resetPassword(token, password);
                if (result) {
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Mật khẩu của bạn đã được thay đổi.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate("/auth#login");
                    });
                } else {
                    Swal.fire({
                        title: 'Lỗi!',
                        text: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            }
            catch (err) {
                Swal.fire({
                    title: 'Lỗi!',
                    text: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    }

    const handleSendPassword = async (e) => {
        e.preventDefault();
        const checkUsername = await checkUsernameExists(username);
        if (checkUsername) {
            try {
                await sendResetPasswordEmail(username);
                Swal.fire({
                    title: 'Thành công!',
                    text: 'Một liên kết xác nhận đã được gửi vào email của bạn.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                Swal.fire({
                    title: 'Lỗi!',
                    text: 'Đã có lỗi xảy ra, vui lòng thử lại.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } else {
            await Swal.fire({
                title: 'Lỗi!',
                text: 'Tài khoản này không tồn tại!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }
    return (
        <div className={`wrap-form d-flex justify-content-center align-items-center`}>
            <div className="curved-container bg-white">
                <div className="gradient-container"></div>
            </div>
            <div className="form-container">
                <div className={`form-box login bg-white py-4 px-5`}>
                    <form className="form-custom" action="" style={{ width: '100%' }}>
                        <h2 className="text-center">Quên mật khẩu</h2>
                        {isReadOnlyUsername && (
                            <div className="input-box d-flex flex-column justify-content-center align-items-center">
                                <input
                                    type="text"
                                    name="account"
                                    id="account"
                                    placeholder="Tài khoản"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <FaUser className="input-icon" />
                            </div>
                        )}
                        {showEnterPassword && (
                            <>
                                <div className="input-box d-flex flex-column justify-content-center align-items-center">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder="Mật khẩu mới"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span onClick={togglePasswordVisibility}>
                                        {passwordVisible ? <FaEyeSlash className="input-icon" /> : <FaEye className="input-icon" />}
                                    </span>
                                </div>
                                <div className="input-box d-flex flex-column justify-content-center align-items-center">
                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="Xác nhận mật khẩu mới"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span onClick={toggleConfirmPasswordVisibility}>
                                        {confirmPasswordVisible ? <FaEyeSlash className="input-icon" /> : <FaEye className="input-icon" />}
                                    </span>
                                </div>
                            </>
                        )}
                        {!showEnterPassword ? (
                            <Button type="" variant="contained" color="success" onClick={(e) => handleSendPassword(e)} className="mt-1">Xác nhận</Button>
                        ) :
                            (<Button type="submit" variant="contained" color="success" onClick={(e) => handleChangePassword(e)} className="mt-1">Đổi mật khẩu</Button>)}
                        <div className="register-link mt-3">
                            <p className="d-flex justify-content-center">
                                Bạn đã có tài khoản?
                                <a href="/auth#login" className="ms-2 text-decoration-none">Đăng nhập ngay</a>
                            </p>
                        </div>
                    </form>
                </div>
                {isLoading && (
                    <div className="loading-overlay">
                        <div className="loading-circle"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;