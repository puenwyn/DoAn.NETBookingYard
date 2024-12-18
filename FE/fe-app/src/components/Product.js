import React, { useEffect, useRef } from 'react';
import { Button, Pagination, Stack } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useYardContext } from "../context/YardContext";
import '../styles/components/product.css';

const Product = () => {
    const { yardsClientView, totalPagesYardsClientView, pageClientView, setPageClientView } = useYardContext();

    const productRef = useRef(null);

    useEffect(() => {
        if (productRef.current) {
            productRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [pageClientView])

    const handleChangePage = (event, newPage) => {
        setPageClientView(newPage - 1);
    };

    return (
        <div className="product pb-4" ref={productRef}>
            <div className="container p-0">
                <div className="row">
                    <div className="col-md-12 col-12">
                        <h3 className="product-title">Danh sách sân</h3>
                        <div className="row">
                            {yardsClientView.map(item => (
                                <div key={item.id} className="col-lg-3 col-md-4 col-6 mb-lg-4 mb-3">
                                    <div className="bg-white p-2 product-wrapper">
                                        <div className="inner-image mb-3">
                                            <div className="ratio-3-2">
                                                <Link to={'/san-the-thao/' + item.id} title={item.name} aria-label={item.name}>
                                                    <img src={item.images.length !== 0 ? `data:image/png;base64,${item.images[0].imageURL}` : 'https://img.thegioithethao.vn/thumbs/san-cau-long/binh-duong/tan-uyen/san-cau-long-lego/san-cau-long-lego-2_thumb_500.webp'} alt={item.name} loading="lazy" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="inner-content">
                                            <div className="name">{item.name}</div>
                                            <div className="address">Khu vực: {item.address}</div>
                                            <div className="people-rating d-flex align-items-center justify-content-between my-2">
                                                <div className="people"><span>Số sân: </span>{item.numberOfYard}</div>
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
                                                    {item.times.map(time => {
                                                        return <div className="time-available" key={time}>{time}</div>;
                                                    })}
                                                </div>
                                            </div>
                                            <div className="btn-bottom w-100">
                                                {item.numberOfYard > 0 ? (
                                                    <Link to={'/san-the-thao/' + item.id} title={item.name} aria-label={item.name}>
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
                                <Pagination
                                    count={totalPagesYardsClientView}
                                    page={pageClientView + 1} // Adjust to 1-based index for the Pagination component
                                    onChange={handleChangePage}
                                    variant="outlined"
                                    color="primary"
                                />
                            </div>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
