import { Button } from "@mui/material";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/components/product.css';

const Products = [
    {
        id: '1',
        name: 'Sân cầu lông T&T',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/thuan-giao/clb-cau-long-t-t-3_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6,
    },
    {
        id: '2',
        name: 'Sân cầu lông T&T',
        img: 'https://img.thegioithethao.vn/thumbs/san-picklebakll/ha-noi/soc-son/san-pickleball-soc-son/san-pickleball-soc-son-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6,
    },
    {
        id: '3',
        name: 'Sân cầu lông T&T',
        img: 'https://img.thegioithethao.vn/thumbs/san-picklebakll/quang-ninh/thanh-pho-cam-pha/cum-san-pickleball-gia-hung-cam-pha/san-pickleball-gia-hung-cam-pha-5_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6,
    },
    {
        id: '4',
        name: 'Sân cầu lông T&T',
        img: 'https://img.thegioithethao.vn/thumbs/san-picklebakll/ha-noi/quoc-oai/san-pickleball-hoa-lac/san-pickleball-hoa-lac-3_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6,
    },
    {
        id: '5',
        name: 'Sân cầu lông T&T',
        img: 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/tan-uyen/san-cau-long-lego/san-cau-long-lego-2_thumb_500.webp',
        address: 'Thị xã Thuận An, Bình Dương',
        number_of_yards: 6,
    }
];

const ProductSlide = () => {
    return (
        <div className="product pt-4" style={{ background: '#2563EB', position: 'relative' }}>
            <div className="container p-0">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    navigation={{
                        prevEl: '.swiper-button-prev.custom',
                        nextEl: '.swiper-button-next.custom',
                    }}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    style={{ paddingBottom: '20px' }}
                    onSlideChange={(swiper) => {
                        const { isBeginning, isEnd } = swiper;
                        const prevButton = swiper.navigation.prevEl;
                        const nextButton = swiper.navigation.nextEl;

                        prevButton.style.display = isBeginning ? 'none' : 'block';
                        nextButton.style.display = isEnd ? 'none' : 'block';
                    }}
                >
                    {Products.map(item => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-white p-2 product-wrapper">
                                <div className="inner-image mb-3">
                                    <div className="ratio-3-2">
                                        <Link to='/' title={item.name}>
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
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} size={12} color="#F7D03F" />
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
                                        <Link to='/' aria-label={`Đặt sân ${item.name}`}>
                                            <Button>Đặt sân ngay</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-button-prev custom" aria-label="Previous slide">
                    <FaChevronLeft />
                </div>
                <div className="swiper-button-next custom" aria-label="Next slide">
                    <FaChevronRight />
                </div>
            </div>
        </div>
    );
}

export default ProductSlide;
