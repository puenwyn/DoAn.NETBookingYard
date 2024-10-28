import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FaUser, FaFutbol, FaShoppingCart } from 'react-icons/fa';
import '../styles/components/headerAction.css';

const HeaderAction = () => {
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