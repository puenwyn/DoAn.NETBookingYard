import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import '../styles/components/navigation.css';
import { useYardTypeContext } from "../context/YardTypeContext.js";
import { transferText } from "../utils/TransferText";

const Navigation = () => {
    const { yardTypes, loading, error } = useYardTypeContext();

    // Hiển thị loading hoặc error
    if (loading) {
        return (
            <nav>
                <div className="container">
                    <div className="row">
                        <div className="header-nav col-12 d-flex align-items-center">
                            <p>Đang tải dữ liệu...</p>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    if (error) {
        return (
            <nav>
                <div className="container">
                    <div className="row">
                        <div className="header-nav col-12 d-flex align-items-center">
                            <p style={{ color: 'red' }}>Đã xảy ra lỗi: {error}</p>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav>
            <div className="container">
                <div className="row">
                    <div className="header-nav col-12 d-flex align-items-center">
                        <ul className="list list-inline">
                            {
                                yardTypes && yardTypes.length > 0 ? (
                                    yardTypes.map(yardType => (
                                        <li key={yardType.id} className="list-inline-item">
                                            <Link to={`/yard-types/${transferText(yardType.name)}?id=${yardType.id}`} aria-label={yardType.name}>
                                                <Button>{yardType.name}</Button>
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <p>Không có dữ liệu loại sân.</p>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;