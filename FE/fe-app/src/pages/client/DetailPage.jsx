import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useYardContext } from '../../context/YardContext';
import Detail from '../../components/Detail';
import Comment from '../../components/Comment';
import { BookingProvider } from '../../context/BookingContext';

const DetailPage = () => {
    const { id } = useParams();  // Lấy id từ URL
    const { fetchYardClientView } = useYardContext();  // Lấy hàm fetchYardClientView từ context

    const [yardDetail, setYardDetail] = useState(null);  // Trạng thái để lưu thông tin chi tiết sân
    const [isLoading, setIsLoading] = useState(true);  // Trạng thái loading
    const [error, setError] = useState(null);  // Trạng thái lỗi khi gọi API

    // Sử dụng useEffect để gọi API khi component render lần đầu hoặc khi id thay đổi
    useEffect(() => {
        const getYardDetail = async () => {
            try {
                setIsLoading(true);  // Bắt đầu trạng thái loading
                const yard = await fetchYardClientView(id);  // Gọi API lấy thông tin sân
                setYardDetail(yard);  // Lưu thông tin sân vào state
            } catch (err) {
                setError(err);  // Lưu lỗi nếu có
            } finally {
                setIsLoading(false);  // Kết thúc trạng thái loading
            }
        };

        getYardDetail();  // Gọi hàm getYardDetail
    }, [id, fetchYardClientView]);  // Phụ thuộc vào id và fetchYardClientView để gọi lại khi cần

    // Hiển thị giao diện tùy theo trạng thái loading, lỗi
    if (isLoading) {
        return <>
        <div className="loading-overlay">
            <div className="loading-circle"></div>
        </div></>;  // Hiển thị khi đang tải dữ liệu
    }

    if (error) {
        return <div>Lỗi: {error.message}</div>;  // Hiển thị lỗi nếu có
    }

    return (
        <>
            {yardDetail &&
                <BookingProvider>
                    <Detail yard={yardDetail} />
                </BookingProvider>
            }  {/* Hiển thị thông tin sân nếu có dữ liệu */}
            <Comment />  {/* Hiển thị phần bình luận */}
        </>
    );
};

export default DetailPage;
