import { Button, Pagination, Stack } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { ProductContext } from '../context/ProductContext';
import '../styles/components/product.css';

const Products = [
    {
        id: '1',
        name: 'Sân cầu lông T&T',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/thuan-giao/clb-cau-long-t-t-3_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '2',
        name: 'Sân pickleball Sóc Sơn',
        img: 'https://img.thegioithethao.vn/thumbs/san-picklebakll/ha-noi/soc-son/san-pickleball-soc-son/san-pickleball-soc-son-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '3',
        name: 'Sân pickleball Cam Phả',
        img: 'https://img.thegioithethao.vn/thumbs/san-picklebakll/quang-ninh/thanh-pho-cam-pha/cum-san-pickleball-gia-hung-cam-pha/san-pickleball-gia-hung-cam-pha-5_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '4',
        name: 'Sân pickleball Hòa Lạc',
        img: 'https://img.thegioithethao.vn/thumbs/san-picklebakll/ha-noi/quoc-oai/san-pickleball-hoa-lac/san-pickleball-hoa-lac-3_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '5',
        name: 'Sân cầu lông LEGO',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/tan-uyen/san-cau-long-lego/san-cau-long-lego-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '6',
        name: 'Sân cầu lông LEGO',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/tan-uyen/san-cau-long-lego/san-cau-long-lego-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '7',
        name: 'Sân cầu lông LEGO',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/tan-uyen/san-cau-long-lego/san-cau-long-lego-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '8',
        name: 'Sân cầu lông LEGO',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/tan-uyen/san-cau-long-lego/san-cau-long-lego-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '9',
        name: 'Sân cầu lông LEGO',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/tan-uyen/san-cau-long-lego/san-cau-long-lego-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '10',
        name: 'Sân cầu lông LEGO',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/tan-uyen/san-cau-long-lego/san-cau-long-lego-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '11',
        name: 'Sân cầu lông LEGO',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/tan-uyen/san-cau-long-lego/san-cau-long-lego-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    },
    {
        id: '12',
        name: 'Sân cầu lông LEGO',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/tan-uyen/san-cau-long-lego/san-cau-long-lego-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6
    }
];

const Product = () => {
    // const { products, totalCount, page, setPage, rowsPerPage, setRowsPerPage } = useContext(ProductContext);

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };
    return (
        <div className="product pb-4">
            <div className="container p-0">
                <div className="row">
                    <div className="col-md-12 col-12">
                        <h3 className="product-title">Danh sách sân</h3>
                        <div className="row">
                            {Products.map(item => (
                                <div key={item.id} className="col-lg-3 col-md-4 col-6 mb-lg-4 mb-3">
                                    <div className="bg-white p-2 product-wrapper">
                                        <div className="inner-image mb-3">
                                            <div className="ratio-3-2">
                                                <Link to={'/san-the-thao/' + item.id} title={item.name} aria-label={item.name}>
                                                    <img src={item.img} alt={item.name} loading="lazy" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="inner-content">
                                            <div className="name">{item.name}</div>
                                            <div className="address">{item.address}</div>
                                            <div className="people-rating d-flex align-items-center justify-content-between my-2">
                                                <div className="people"><span>Số sân: </span>{item.number_of_yards}</div>
                                                <div className="rating d-flex align-items-center">
                                                    {[...Array(5)].map((_, index) => (
                                                        <FaStar key={index} size={12} color="#F7D03F" />
                                                    ))}
                                                    <span className="fs-6 ms-1">(1)</span>
                                                </div>
                                            </div>
                                            <div className="inner-time my-2">
                                                <span>Sân trống: </span>
                                                <div className="list-time">
                                                    <div className="time-available">15:00</div>
                                                    <div className="time-available">17:00</div>
                                                    <div className="time-available">19:00</div>
                                                </div>
                                            </div>
                                            <div className="btn-bottom w-100">
                                                {item.number_of_yards > 0 ? (
                                                    <Link to='/'>
                                                        <Button>Đặt sân ngay</Button>
                                                    </Link>
                                                ) : (
                                                    <Button disabled>Sân đã đầy</Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Stack spacing={2}>
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '0px 0' }}>
                                <Pagination count={10} variant="outlined" color="primary" />
                            </div>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Định nghĩa PropTypes
Product.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            number_of_yards: PropTypes.number.isRequired,
        })
    ),
};

export default Product;
