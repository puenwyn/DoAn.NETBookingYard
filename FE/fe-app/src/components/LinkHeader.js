import { Link } from "react-router-dom";
import '../styles/components/linkHeader.css';

const LinkHeader = () => {
    return (
        <div className="link-header bg-white">
            <div className="container">
                <nav className="links bg-white">
                    <Link to='/' aria-label='Trang chủ'>Trang chủ</Link>
                    <Link to='/' className="active" aria-label='Sân thể thao'>Sân thể thao</Link>
                </nav>
            </div>
        </div>
    );
}

export default LinkHeader;
