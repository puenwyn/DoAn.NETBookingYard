import axios from "axios";
import { createContext, useContext, useState } from "react";

export const BookingContext = createContext();
export const BookingProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const createBooking = async (bookingData) => {
        setLoading(true); // Đặt trạng thái loading trước khi bắt đầu request
        try {
            const res = await fetch(`https://localhost:7071/api/v1/Booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
            if (res.status === 201) {
                return true;
            }
            return false;
        } catch (e) {
            console.error("Error during booking:", e); // Log lỗi chi tiết hơn
            return false;
        } finally {
            setLoading(false); // Đặt loading = false sau khi request kết thúc
        }
    };


    const getMyBookings = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://localhost:7071/api/v1/booking?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Failed to fetch bookings');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data);
            } else {
                setError('Có lỗi xảy ra. Vui lòng thử lại!');
            }
        } finally {
            setLoading(false);
        }
    };

    const getMyHistoryBookings = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://localhost:7071/api/v1/booking/history?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Failed to fetch bookings');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data);
            } else {
                setError('Có lỗi xảy ra. Vui lòng thử lại!');
            }
        } finally {
            setLoading(false);
        }
    };

    const checkYardStatus = async (yardDetailId, start, end, newBookingId) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/booking/check-yard-status?yardDetailId=${yardDetailId}&start=${start}&end=${end}&newBookingId=${newBookingId}`);
            const data = await response.text();
            return data;
        } catch (error) {
            console.error('Lỗi khi kiểm tra trạng thái sân:', error);
        }
    };

    const deleteBooking = async (id) => {
        try {
            // Gọi API DELETE để xóa booking
            const response = await fetch(`https://localhost:7071/api/v1/booking/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                return (false);
            }
            const result = await response.json();
            return result;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    const getAllBookings = async () => {
        setLoading(true); // Bắt đầu trạng thái loading
        setError(null); // Đặt lại error
        try {
            const response = await fetch(`https://localhost:7071/api/v1/booking/admin-view`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data; // Trả về dữ liệu bookings
            } else {
                throw new Error('Failed to fetch all bookings');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data); // Ghi lại lỗi từ server
            } else {
                setError('Có lỗi xảy ra. Vui lòng thử lại!');
            }
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

    const getAllBookingsYardDetail = async (startTime) => {
        setLoading(true); // Bắt đầu trạng thái loading
        setError(null); // Đặt lại error
        console.error(`https://localhost:7071/api/v1/booking/get-yard-list-booking?startTime=${startTime}`);
        try {
            // Kiểm tra nếu startTime không hợp lệ
            if (!startTime || isNaN(new Date(startTime).getTime())) {
                throw new Error('Invalid start time provided.');
            }
    
            // Gọi API với startTime là query parameter
            const response = await fetch(`https://localhost:7071/api/v1/booking/get-yard-list-booking?startTime=${startTime}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Kiểm tra nếu response hợp lệ
            if (response.ok) {
                const data = await response.json();
                return data; // Trả về dữ liệu bookings
            } else {
                throw new Error('Failed to fetch yard list bookings');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data); // Ghi lại lỗi từ server
            } else {
                setError('Có lỗi xảy ra. Vui lòng thử lại!'); // Lỗi chung
            }
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };
    

    return (
        <BookingContext.Provider value={{ createBooking, getMyBookings, deleteBooking, getMyHistoryBookings, checkYardStatus, getAllBookings,loading, getAllBookingsYardDetail }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBookingContext = () => {
    return useContext(BookingContext);
}