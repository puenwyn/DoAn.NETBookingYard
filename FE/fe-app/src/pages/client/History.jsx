import { TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, CircularProgress, Divider } from '@mui/material';
import { useBookingContext } from "../../context/BookingContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Table } from "react-bootstrap";
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';
import { BorderBottom } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    padding: theme.spacing(2),
    borderBottom: 'none'
}));

const StyledTableCellTotal = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    padding: theme.spacing(2),
    borderBottom: 'none',
    color: 'red',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
    '& td': {
        borderBottom: 'none',
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Thêm hiệu ứng bóng nhẹ
    borderRadius: '8px', // Thêm bo tròn góc bảng nếu cần
    '& .MuiPaper-root': {
        borderRadius: '8px', // Bo tròn Paper bao quanh bảng
    }
}));

const History = () => {
    const { loading, getMyHistoryBookings } = useBookingContext();
    const { checkTokenValidity } = useAuthContext();
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const userDTO = await checkTokenValidity();
            if (userDTO) {
                try {
                    const payments = await getMyHistoryBookings(userDTO.id);
                    setPayments(payments);
                } catch (error) {
                    setError('Lỗi khi tải dữ liệu đặt sân!');
                }
            } else {
                setError('Token không hợp lệ, vui lòng đăng nhập lại.');
            }
        };

        fetchBookings();
    }, []);

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{}}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                payments.length > 0 ? payments.map((payment, index) => (
                    <StyledTableContainer component={Paper} key={index} sx={{ marginBottom: 4 }}>
                        <Typography sx={{ padding: 2, textAlign: 'left', background: '#D4D4D4' }}>
                            <strong>Ngày thanh toán:</strong> {format(new Date(payment.paymentDate), 'dd/MM/yyyy HH:mm')}
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell>Booking IDs</StyledTableCell>
                                    <StyledTableCell>Phương Thức Thanh Toán</StyledTableCell>
                                    <StyledTableCell>Tổng Tiền</StyledTableCell>
                                    <StyledTableCell>Voucher ID</StyledTableCell>
                                    <StyledTableCell>Xóa?</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow key={payment.id}>
                                    <TableCell>{payment.id}</TableCell>
                                    <TableCell>{payment.bookingIds}</TableCell>
                                    <TableCell>{payment.paymentMethod}</TableCell>
                                    <TableCell>{`${payment.total} VNĐ`}</TableCell>
                                    <TableCell>{payment.voucherId || "Không có"}</TableCell>
                                    <TableCell>{payment.isDelete === 0 ? "Không" : "Có"}</TableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                )) : (
                    <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
                        Không có dữ liệu thanh toán.
                    </Typography>
                )
            )}
        </Box>
    );
    
};

export default History;
