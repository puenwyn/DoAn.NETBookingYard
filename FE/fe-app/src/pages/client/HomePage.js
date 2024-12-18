import SearchFilter from "../../components/SearchFilter";
import Banner from '../../components/Banner';
import Product from "../../components/Product";
import ProductSlide from "../../components/ProductSlide";
import { YardTypeProvider } from "../../context/YardTypeContext";
import { AddressContext, AddressProvider } from "../../context/AddressContext";
import { YardProvider } from "../../context/YardContext";


const HomePage = () => {
    return (
        <>
            <title>Trang Chủ - Tìm Sân Thể Thao</title>
            <AddressProvider>
                <YardTypeProvider>
                    <SearchFilter />
                </YardTypeProvider>
            </AddressProvider>
            <Banner />
            <ProductSlide />
            <YardProvider>
                <Product />
            </YardProvider>
        </>
    );
};

export default HomePage;