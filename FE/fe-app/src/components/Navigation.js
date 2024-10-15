import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import '../styles/components/navigation.css';

const Navigation = () => {
    return (
        <nav>
            <div className="container">
                <div className="row">
                    <div className="header-nav col-12 d-flex align-items-center">
                        <ul className="list list-inline">
                            <li className="list-inline-item">
                                <Link to="/" aria-label="Sân bóng đá">
                                    <Button>Sân bóng đá</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/" aria-label="Sân cầu lông">
                                    <Button>Sân cầu lông</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/" aria-label="Sân Đá cầu">
                                    <Button>Sân Đá cầu</Button>
                                </Link>
                                <div className="submenu shadow">
                                    <Link to="/" aria-label="Clothing"><Button>Clothing</Button></Link>
                                    <Link to="/" aria-label="Footwear"><Button>Footwear</Button></Link>
                                    <Link to="/" aria-label="Watches"><Button>Watches</Button></Link>
                                </div>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/" aria-label="Sân Pickleball">
                                    <Button>Sân Pickleball</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/" aria-label="Sân bóng bàn">
                                    <Button>Sân bóng bàn</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/" aria-label="Sân bóng rổ">
                                    <Button>Sân bóng rổ</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/" aria-label="Sân tennis">
                                    <Button>Sân tennis</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/" aria-label="Sân bóng chuyền">
                                    <Button>Sân bóng chuyền</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/" aria-label="Sân Golf">
                                    <Button>Sân Golf</Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
