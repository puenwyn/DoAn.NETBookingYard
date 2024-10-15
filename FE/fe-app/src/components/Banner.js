import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/components/banner.css';

const Banner = () => {
    return (
        <div className="banner pb-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-12 p-0">
                        <div className="row">
                            {bannerData.map((banner, index) => (
                                <div className="col-md-6 col-12 banner-item" key={index}>
                                    <div className="item">
                                        <Link to={banner.link}>
                                            <img src={banner.imageSrc} alt={banner.altText} />
                                        </Link>
                                    </div>
                                    <div className="banner-content">
                                        {banner.text.map((textLine, i) => (
                                            <div className="banner-text" key={i}>
                                                {textLine}
                                            </div>
                                        ))}
                                        <Button className="mt-5" variant="contained">
                                            {banner.buttonText}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const bannerData = [
    {
        link: '/',
        imageSrc: 'https://img.thegioithethao.vn/media/banner/banner_gio_vang.png',
        altText: 'Banner Gio Vang',
        text: [
            <>Có <strong className="text-danger">5.000</strong> Sân thể thao</>,
            <>Cho bạn lựa chọn</>
        ],
        buttonText: 'Đăng ký ngay',
    },
    {
        link: '/',
        imageSrc: 'https://img.thegioithethao.vn/media/banner/thi-cong-cai-tao.png',
        altText: 'Banner Thi Cong Cai Tao',
        text: [
            <>Đặt sân nhanh</>,
            <strong className="text-danger">THEO YÊU CẦU CỦA BẠN</strong>,
            <>Chúng tôi sẽ tìm và gửi sân theo nhu cầu</>
        ],
        buttonText: 'Nhận báo giá',
    },
];

export default Banner;
