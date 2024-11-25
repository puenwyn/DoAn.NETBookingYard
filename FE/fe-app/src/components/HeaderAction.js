import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaFutbol, FaShoppingCart } from 'react-icons/fa';
import '../styles/components/headerAction.css';
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const HeaderAction = () => {
    const [user, setUser] = useState(null);  // Lưu thông tin người dùng
    const { checkTokenValidity, logout } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra token và lấy thông tin người dùng khi trang được tải
        const fetchUserData = async () => {
            const userInfo = await checkTokenValidity();
            setUser(userInfo); // Lưu thông tin người dùng vào state
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        // Sử dụng SweetAlert2 để hiển thị hộp thoại xác nhận
        Swal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất?',
            text: 'Bạn sẽ bị đăng xuất khỏi hệ thống.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Hủy',
            reverseButtons: true,
            didOpen: (popup) => {
                popup.style.zIndex = '10001';
                const backdrop = document.querySelector('.swal2-container');
                if (backdrop) { backdrop.style.zIndex = '10001'; }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Nếu người dùng nhấn "Đăng xuất", thực hiện gọi API để đăng xuất
                const logoutSuccessful = await logout();
                if (logoutSuccessful) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng xuất thành công',
                        text: 'Bạn đã đăng xuất khỏi hệ thống.',
                        didOpen: (popup) => {
                            popup.style.zIndex = '10001';
                            const backdrop = document.querySelector('.swal2-container');
                            if (backdrop) { backdrop.style.zIndex = '10001'; }
                        }
                    }).then(() => {
                        navigate("/");
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Đăng xuất thất bại',
                        text: 'Có lỗi xảy ra trong quá trình đăng xuất.',
                        didOpen: (popup) => {
                            popup.style.zIndex = '10001';
                            const backdrop = document.querySelector('.swal2-container');
                            if (backdrop) { backdrop.style.zIndex = '10001'; }
                        }
                    });
                }
            }
        });
    };

    return (
        <div className="header-actions row">
            {/* Action: Sân thể thao */}
            <div className="header-action-item">
                <Link to='/' title='Sân thể thao'>
                    <Button className="d-flex flex-column">
                        <span className="icon-action">
                            <FaFutbol />
                        </span>
                        <span className="icon-text">Sân thể thao</span>
                    </Button>
                </Link>
            </div>

            {/* Action: Tài khoản */}
            <div className="header-action-item">
                <Link to='/' title='Tài khoản'>
                    <Button className="d-flex flex-column">
                        <span className="icon-action">
<FaUser />
                        </span>
                        <span className="icon-text">Tài khoản</span>
                    </Button>
                </Link>
                <div className="content shadow">
                    {!user ? (
                        <>
                            <div className="btn-login btn-action mb-2">
                                <Link to='/auth#login'>
                                    <Button>Đăng nhập ngay</Button>
                                </Link>
                            </div>
                            <div className="btn-register btn-action">
                                <Link to='/auth#register'>
                                    <Button>Đăng ký ngay</Button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="btn-logout btn-action mb-2">
                                <Typography sx={{ textAlign: "center", marginBottom: 1 }}>
                                    Xin chào <span style={{ fontWeight: "bold" }}>{user.fullName}</span>
                                </Typography>
                                <Button sx={{
                                    width: "100%",
                                }} onClick={() => { handleLogout() }}>
                                    Đăng xuất
                                </Button>
                            </div>
                        </>
                    )}
                    <hr />
                    <ul>
                        <li>
                            <Link to='/' className="d-flex align-items-center">
                                <FaUser /><span className="ms-2">Thông tin cá nhân</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className="d-flex align-items-center">
                                <FaFutbol /><span className="ms-2">Sân yêu thích</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Action: Giỏ hàng */}
            <div className="header-action-item">
                <Link to='/my-cart' title='Giỏ hàng'>
                    <Button className="d-flex flex-column">
                        <span className="icon-action">
                            <FaShoppingCart />
                        </span>
                        <span className="icon-text">Giỏ hàng</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default HeaderAction;