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
                                <Link to="/yard-types/san-bong-da" aria-label="Sân bóng đá">
                                    <Button>Sân bóng đá</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/yard-types/san-cau-long" aria-label="Sân cầu lông">
                                    <Button>Sân cầu lông</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/yard-types/san-da-cau" aria-label="Sân Đá cầu">
                                    <Button>Sân Đá cầu</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/yard-types/san-pickaball" aria-label="Sân Pickleball">
                                    <Button>Sân Pickleball</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/yard-types/san-bong-ban" aria-label="Sân bóng bàn">
                                    <Button>Sân bóng bàn</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/yard-types/san-bong-ro" aria-label="Sân bóng rổ">
                                    <Button>Sân bóng rổ</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/yard-types/san-tennis" aria-label="Sân tennis">
                                    <Button>Sân tennis</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/yard-types/san-bong-chuyen" aria-label="Sân bóng chuyền">
                                    <Button>Sân bóng chuyền</Button>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/yard-types/san-tennis" aria-label="Sân Golf">
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