import SearchFilter from "../../components/SearchFilter";
import LinkHeader from "../../components/LinkHeader";
import Banner from '../../components/Banner';
import Product from "../../components/Product";
import ProductSlide from "../../components/ProductSlide";


const HomePage = () => {
    return (
        <>
            <title>Trang Chủ - Tìm Sân Thể Thao</title>
            <LinkHeader />
            <SearchFilter />
            <Banner />
            <ProductSlide />
            <Product />
        </>
    );
};

export default HomePage;