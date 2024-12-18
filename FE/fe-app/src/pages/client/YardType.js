import { useLocation, useParams } from "react-router-dom";
import Product from "../../components/Product";
import { YardProvider } from "../../context/YardContext";

const YardType = () => {
    const location = useLocation();  // Lấy thông tin về location hiện tại
    const queryParams = new URLSearchParams(location.search);  // Truy xuất query string từ URL
    const id = queryParams.get('id');
    return (
        <YardProvider>
            <Product />
        </YardProvider>
    )
}

export default YardType;