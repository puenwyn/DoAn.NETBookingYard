import { useEffect, useRef, useState } from "react";
import {
    Button,
    Paper,
    TextField,
    Snackbar,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Chip,
    Typography,
    Box,
    Grid2,
    InputAdornment,
    Radio,
    Divider,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import QRCode from 'qrcode';
import '../../styles/components/cart.css';
import { useBookingContext } from "../../context/BookingContext";
import { useAuthContext } from "../../context/AuthContext";
import { useYardContext, YardContext } from "../../context/YardContext";
import { formatNumber } from "../../utils/FormatNumber";
import { usePaymentContext } from "../../context/PaymentContext";
import History from "./History";
import { useMomoContext } from "../../context/MomoContext";

function calculateHoursDifference(timeRange) {
    // Tách thời gian bắt đầu và kết thúc
    const [startTime, endTime] = timeRange.split(' - ');

    // Tách giờ và phút cho từng thời gian
    const [startHour, startMinute] = startTime.split(':').map(num => parseInt(num));
    const [endHour, endMinute] = endTime.split(':').map(num => parseInt(num));

    // Chuyển đổi giờ và phút thành tổng số phút
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    // Tính hiệu giữa hai mốc thời gian và chuyển đổi ra số giờ (làm tròn xuống)
    const differenceInMinutes = endTotalMinutes - startTotalMinutes;
    const hours = Math.floor(differenceInMinutes / 60); // Chỉ lấy số giờ

    return hours;
}

const CartPage = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [voucher, setVoucher] = useState('');
    const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [expandedRow, setExpandedRow] = useState(null);
    const [selectedOption, setSelectedOption] = useState("Tiền mặt");
    const [myBookings, setMyBookings] = useState();
    const [discount, setDiscount] = useState(0);
    const [openHistory, setOpenHistory] = useState(false);

    // GỌI API
    const { getMyBookings, deleteBooking, checkYardStatus } = useBookingContext();
    const { checkTokenValidity } = useAuthContext();
    const { fetchYardClientView } = useYardContext();
    const { createPayment } = usePaymentContext();
    const { paymentStatus, paymentUrl, initiatePayment, verifyPayment } = useMomoContext();

    const options = [
        { label: "Tiền mặt", value: "Tiền mặt" },
        { label: "Chuyển khoản", value: "Chuyển khoản" },
        { label: "Ví điện tử", value: "Ví điện tử" },
    ];

    const handleRadioChange = (value) => {
        setSelectedOption(value);
        setPaymentMethod(value);
    };

    // Dữ liệu sân
    const [rows, setRows] = useState([
        // { id: 1, tenSan: 'Sân cầu lông T&T', chiTietSan: 'Sân cầu lông T&T sân 1', ngayDatSan: '2024-10-18', thoiGian: '10:00 - 11:00', trangThaiSan: 'Trống', giaSan: '100.000', tenNguoiDat: 'Nguyễn Văn A', sdt: '0123456789', email: 'a@example.com', doAo: 'Áo thể thao xanh' },
        // { id: 2, tenSan: 'Sân cầu lông T&T', chiTietSan: 'Sân cầu lông T&T sân A', ngayDatSan: '2024-10-20', thoiGian: '15:00 - 16:00', trangThaiSan: 'Trống', giaSan: '100.000', tenNguoiDat: 'Trần Thị B', sdt: '0987654321', email: 'b@example.com', doAo: 'Áo đỏ' },
        // { id: 3, tenSan: 'Sân cầu lông T&T', chiTietSan: 'Sân cầu lông T&T sân 1', ngayDatSan: '2024-10-20', thoiGian: '10:00 - 11:00', trangThaiSan: 'Trống', giaSan: '100.000', tenNguoiDat: 'Nguyễn Văn C', sdt: '0123456789', email: 'c@example.com', doAo: 'Áo vàng' },
        // { id: 4, tenSan: 'Sân cầu lông T&T', chiTietSan: 'Sân cầu lông T&T sân 2', ngayDatSan: '2024-10-21', thoiGian: '10:00 - 11:00', trangThaiSan: 'Đang được thuê', giaSan: '100.000', tenNguoiDat: 'Nguyễn Văn D', sdt: '0123456789', email: 'd@example.com', doAo: 'Áo xanh' },
    ]);

    // Hàm chuyển đổi dữ liệu từ BE
    const transformData = async (dataFromBE) => {
        // Hàm phụ để tính số giờ giữa startTime và endTime
        const calculateDurationInHours = (startTime, endTime) => {
            const start = new Date(startTime);
            const end = new Date(endTime);
            const duration = (end - start) / (1000 * 60 * 60); // chuyển đổi từ mili giây sang giờ
            return duration;
        };

        // Hàm phụ để tính giá
        const calculatePrice = (startTime, endTime, price, pricePeak) => {
            const duration = calculateDurationInHours(startTime, endTime);
            const startHour = new Date(startTime).getHours();

            // Kiểm tra xem thời gian có thuộc khung giờ peak hay không
            if ((startHour >= 6 && startHour < 8) || (startHour >= 17 && startHour < 20)) {
                return pricePeak * duration;
            }
            return price * duration;
        };

        // Chuyển đổi dữ liệu từ backend thành định dạng cần thiết
        const transformedData = [];

        for (const key of Object.keys(dataFromBE)) {
            let yardOfName = await fetchYardClientView(key); // Lấy tên sân từ API
            const yardOf_Name = yardOfName.name;

            const reservations = [];

            for (const reservation of dataFromBE[key]) {
                const { id, yardDetail, startTime, endTime, note, status } = reservation;
                if (status.trim().toLowerCase() !== "đang chờ".toLowerCase()) {
                    continue;  // Nếu status không phải "Đang chờ", bỏ qua
                }

                const user = reservation.user;
                const chiTietSan = yardDetail.name;
                const tenSan = yardOf_Name;  // Tên sân đã được lấy từ API
                const ngayDatSan = startTime.split('T')[0];
                const thoiGian = `${startTime.slice(11, 16)} - ${endTime.slice(11, 16)}`;

                // Gọi checkYardStatus một cách bất đồng bộ và đợi kết quả
                let trangThaiSan = await checkYardStatus(yardDetail.id, startTime, endTime, id);
                const giaSan = calculatePrice(startTime, endTime, yardDetail.price, yardDetail.pricePeak);

                // Xử lý note để lấy thông tin người dùng
                const tenNguoiDat = (note.match(/Name:(.*?)(,|$)/) || [])[1] || '';
                const email = (note.match(/Email:(.*?)(,|$)/) || [])[1] || '';
                const sdt = (note.match(/Phone:(.*?)(,|$)/) || [])[1] || '';
                const doAo = (note.match(/Note:(.*?)(,|$)/) || [])[1] || '';

                const diaChiSan = yardOfName.address;
                const khuVuc = yardDetail.location;

                // Thêm reservation đã chuyển đổi vào mảng
                reservations.push({
                    id: reservation.id,
                    tenSan,
                    chiTietSan,
                    ngayDatSan,
                    thoiGian,
                    trangThaiSan,
                    giaSan,
                    tenNguoiDat,
                    email,
                    sdt,
                    doAo,
                    diaChiSan,
                    khuVuc
                });
            }

            transformedData.push(reservations); // Thêm dữ liệu đã xử lý vào transformedData
        }

        // Trả về dữ liệu đã được biến đổi
        return transformedData.flat();
    };


    const calculateTotalAmount = () => {
        return selectedRows.reduce((total, id) => {
            const row = rows.find(row => row.id === id);
            return total + parseFloat(row.giaSan);
        }, 0);
    };

    useEffect(() => {
        if (paymentUrl) {
            window.location.href = paymentUrl; 
        }
    }, [paymentUrl]);

    const handleDelete = (id, event) => {
        event.stopPropagation();
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa không?',
            text: "Hành động này sẽ không thể khôi phục!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Có, xóa!',
            cancelButtonText: 'Không',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const result = deleteBooking(id);
                if (result) {
                    Swal.fire({
                        title: 'Xóa thành công?',
                        text: "Xóa thành công đặt lịch này!",
                        icon: 'success',
                        confirmButtonText: 'Đóng',
                    }).then(() => {
                        window.location.reload();
                    })
                } else {
                    Swal.fire({
                        title: 'Xóa không thành công?',
                        text: "Xóa không thành công đặt lịch này!",
                        icon: 'warning',
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Đóng',
                    })
                }
            }
        });
    };

    const handleSelect = (selectionModel) => {
        setSelectedRows(selectionModel);
    };

    const handleCheckout = async () => {
        const now = new Date();

        // Kiểm tra các hàng (row) không hợp lệ
        const invalidRows = selectedRows.filter(rowId => {
            const selectedRow = rows.find(row => row.id === rowId);
            const [startTime] = selectedRow.thoiGian.split(' - ');
            const [startHour, startMinute] = startTime.split(':').map(Number);
            const selectedDate = new Date(selectedRow.ngayDatSan);
            selectedDate.setHours(startHour, startMinute, 0);
            return selectedDate < now || selectedRow.trangThaiSan === 'Đang được thuê' || selectedRow.trangThaiSan === "Đã được đặt";
        });

        // Nếu có hàng không hợp lệ, thông báo lỗi
        if (invalidRows.length > 0) {
            setErrorMessage('Có sân đã được đặt hoặc thời gian đã qua.');
            return;
        }

        // Kiểm tra nếu không có sân nào được chọn
        if (selectedRows.length === 0) {
            setErrorMessage('Vui lòng chọn sân để thanh toán.');
            return;
        }

        // Kiểm tra nếu không chọn phương thức thanh toán
        if (!paymentMethod) {
            setErrorMessage('Vui lòng chọn phương thức thanh toán.');
            return;
        }

        // Hiển thị thông báo xác nhận thanh toán
        Swal.fire({
            title: 'Bạn có muốn thanh toán không?',
            text: 'Hãy chắc chắn rằng bạn đã kiểm tra thông tin trước khi thanh toán.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Tạo đối tượng thanh toán
                const payment = {
                    bookingIds: selectedRows.join(','),
                    paymentMethod: selectedOption,
                    paymentDate: new Date(),
                    voucher: null,
                    total: calculateTotalAmount() - discount
                };
                try {
                    // Chờ tạo thanh toán và kiểm tra kết quả
                    const paymentCreated = await createPayment(payment);
                    console.log(paymentCreated);
                    if (selectedOption === 'Ví điện tử') {
                        if (paymentCreated && !paymentCreated.message) {
                            await initiatePayment(paymentCreated);
                        }
                    } else if (selectedOption === 'Tiền mặt') {
                        if (paymentCreated && !paymentCreated.message) {
                            Swal.fire(
                                'Thanh toán thành công!',
                                'Cảm ơn bạn đã thanh toán.',
                                'success'
                            ).then(() => {
                                setTimeout(() => {
                                    printPDF();
                                    window.addEventListener('afterprint', () => {
                                        window.location.reload(); // Reload trang sau khi in
                                    });
                                }, 500);
                            });
                        } else {
                            // Hiển thị thông báo nếu thanh toán không thành công
                            Swal.fire(
                                'Thanh toán không thành công!',
                                'Đã có lỗi xảy ra, vui lòng thử lại.',
                                'error'
                            );
                        }
                    }
                } catch (error) {
                    // Hiển thị thông báo lỗi nếu có lỗi khi gọi API
                    Swal.fire(
                        'Lỗi!',
                        error.message || 'Có lỗi xảy ra trong quá trình thanh toán.',
                        'error'
                    );
                }
            } else if (result.isDismissed) {
                // Thông báo nếu người dùng hủy thanh toán
                Swal.fire(
                    'Hủy thanh toán',
                    'Bạn đã hủy thanh toán.',
                    'info'
                );
            }
        });
    };

    const printPDF = async () => {
        const totalAmount = calculateTotalAmount();
        const printArea = document.createElement('div');
        printArea.id = 'printArea';
        for (const rowId of selectedRows) {
            const selectedRow = rows.find(row => row.id === rowId);
            const qr = await QRCode.toDataURL(JSON.stringify(selectedRow));
            const receiptContent = `
            <div class="container" style="page-break-before: always; display: flex; flex-direction: column; align-items: center; height: 100%, page-break-inside: avoid;">
                <h3 style="margin: 5px 0px; font-size: 23px; color: rgb(53, 53, 53);">SPORT WORLD</h3>
                <span style="margin: 0px 0px 5px 0px; color: grey; font-style: italic;">Đặt sân thể thao online 24/7</span>
                <span>273 An Dương Vương, Phường 3, Quận 5, TP Hồ Chí Minh</span>
                <span style="margin-top: 2px;">Tel: 0987654321</span>
                <span style="margin-top: 10px; font-size: 18px; font-weight: bold;">PHIẾU TẠM TÍNH</span>
                <div style="width: 100%; margin-top: 5px; border-bottom: 1px solid black;">
                    <div style="display: flex; justify-content: space-between;">
                        <div>
                            <p style="margin: 0;"><strong>Thu ngân: </strong>TN online</p>
                            <p style="margin: 5px;"></p>

                        </div>
                        <div>
                            <p style="margin: 0; display: flex; justify-content: space-between;"><strong
                                    style="margin-right: 5px;">Ngày TT:</strong>2024-11-26</p>
                            <p style="margin-top: 5px; display: flex; justify-content: space-between;"><strong
                                    style="margin-right: 5px;">Giờ TT: </strong>16:51</p>
                        </div>
                    </div>
                </div>

                <div style="width: 100%; margin-top: 5px; border-bottom: 1px solid black;">
                    <div style="display: flex; justify-content: space-between;">
                        <div style="width: 60%;">
                            <strong
                                style="color: rgb(100, 100, 100); width: 100%; text-align: center; display: inline-block; padding-bottom: 10px;">THÔNG
                                TIN SÂN</strong>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 2px; text-align: left;"><strong>TÊN SÂN:</strong></td>
                                    <td style="padding: 2px; text-align: left;">${selectedRow.tenSan}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 2px; text-align: left;"><strong>CHI TIẾT SÂN:</strong></td>
                                    <td style="padding: 2px; text-align: left;">${selectedRow.chiTietSan}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 2px; text-align: left;"><strong>ĐỊA CHỈ:</strong></td>
                                    <td style="padding: 2px; text-align: left;">${selectedRow.diaChiSan}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 2px; text-align: left;"><strong>KHU VỰC:</strong></td>
                                    <td style="padding: 2px; text-align: left;">${selectedRow.khuVuc}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 2px; text-align: left;"><strong>NGÀY ĐẶT SÂN:</strong></td>
                                    <td style="padding: 2px; text-align: left;">${selectedRow.ngayDatSan}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 2px; text-align: left;"><strong>THỜI GIAN:</strong></td>
                                    <td style="padding: 2px; text-align: left;">${selectedRow.thoiGian}</td>
                                </tr>
                            </table>
                            </p>
                        </div>
                        <div style="width: 40%;">
                            <strong
                                style="color: rgb(100, 100, 100); width: 100%; text-align: center; display: inline-block; padding-bottom: 10px;">THÔNG
                                TIN KHÁCH HÀNG</strong>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 2px; text-align: left;"><strong>HỌ VÀ TÊN:</strong></td>
                                    <td style="padding: 2px; text-align: left;">${selectedRow.tenNguoiDat}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 2px; text-align: left;"><strong>SĐT:</strong></td>
                                    <td style="padding: 2px; text-align: left;">${selectedRow.sdt}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 2px; text-align: left;"><strong>EMAIL:</strong></td>
                                    <td style="padding: 2px; text-align: left;">${selectedRow.email}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; display: flex; justify-content: flex-end;">
                    <table style="width: 50%; border-collapse: collapse; table-layout: fixed;">
                        <tr>
                            <td style="padding: 2px; text-align: left;"><strong>Số giờ:</strong></td>
                            <td style="padding: 2px; text-align: right;">${calculateHoursDifference(selectedRow.thoiGian)}H</td>
                        </tr>
                        <tr>
                            <td style="padding: 2px; text-align: left;"><strong>Giá sân 1h (Chưa tính giảm giá):</strong></td>
                            <td style="padding: 2px; text-align: right;">${(selectedRow.giaSan).toLocaleString()} VNĐ</td>
                        </tr>
                    </table>
                </div>
                <div style="width: 100%; display: flex; border-top: 1px solid black;">
                    <table style="width: 100%;">
                        <tr>
                            <td style="padding: 2px; text-align: left;"><strong>Phương thức thanh toán:</strong></td>
                            <td style="padding: 2px; text-align: right;">${selectedOption}</td>
                        </tr>
                        <tr>
                            <td style="padding: 2px; text-align: center;" colspan="2"><strong style="font-style: italic;">Thank you & See you again</strong></td>
                        </tr>
                        <tr>
                            <td style="padding: 2px; text-align: center;" colspan="2"><p style="font-size: 13px; color: grey;">Quét mã QR Code khi đến sân</p></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                <img style="width: 100px" src='${qr}' alt="QR Code" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
                
            `;
            printArea.innerHTML += receiptContent;
        }
        document.body.appendChild(printArea);
        setTimeout(() => {
            window.print();
            document.body.removeChild(printArea);
        }, 500);
    }

    const handleRowClick = (id, event) => {
        event.stopPropagation();
        setExpandedRow(expandedRow === id ? null : id);
    };

    const columns = [
        { field: 'tenSan', headerName: 'TÊN SÂN', flex: 0.25, headerAlign: 'center', headerClassName: 'header-uppercase' },
        { field: 'chiTietSan', headerName: 'CHI TIẾT SÂN', flex: 0.25, headerAlign: 'center', headerClassName: 'header-uppercase' },
        { field: 'ngayDatSan', headerName: 'NGÀY ĐẶT SÂN', flex: 0.2, align: 'center', headerAlign: 'center', headerClassName: 'header-uppercase' },
        { field: 'thoiGian', headerName: 'THỜI GIAN', flex: 0.2, align: 'center', headerAlign: 'center', headerClassName: 'header-uppercase' },
        { field: 'giaSan', headerName: 'GIÁ SÂN', flex: 0.1, align: 'right', headerAlign: 'center', headerClassName: 'header-uppercase' },
        {
            field: 'trangThaiSan',
            headerName: 'TRẠNG THÁI SÂN',
            flex: 0.2,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'header-uppercase',
            renderCell: (params) => {
                let backgroundColor, borderColor;
                switch (params.value) {
                    case 'Trống':
                        backgroundColor = '#e8f5e9';
                        borderColor = '#81c784';
                        break;
                    case 'Đã được đặt':
                        backgroundColor = '#f0f4c3';
                        borderColor = '#afb42b';
                        break;
                    case 'Đang được thuê':
                        backgroundColor = '#ffcdd2';
                        borderColor = '#e53935';
                        break;
                    default:
                        backgroundColor = '#e8f5e9';
                        borderColor = '#81c784';
                        break;
                }

                return (
                    <div style={{ height: '100%', padding: '12px 5px' }} className="d-flex align-items-center justify-content-around">
                        <Chip
                            label={params.value}
                            style={{ backgroundColor, borderColor, width: '100%' }}
                            variant="outlined"
                            color={params.value === 'Trống' ? 'default' : undefined} />
                    </div>
                );
            }
        },
        {
            field: 'chucNang',
            headerName: 'CHỨC NĂNG',
            sortable: false,
            flex: 0.15,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'header-uppercase',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={(event) => handleDelete(params.id, event)}
                    style={{ minWidth: '35px', minHeight: '35px', marginRight: '10px' }}
                >
                    <DeleteIcon />
                </Button>
            )
        },
        {
            field: 'details',
            headerName: 'CHI TIẾT',
            sortable: false,
            flex: 0.15,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'header-uppercase',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    onClick={(event) => handleRowClick(params.id, event)}
                    style={{ marginLeft: '10px' }}
                >
                    {expandedRow === params.id ? 'Ẩn' : 'Chi tiết'}
                </Button>
            )
        },
    ];

    useEffect(() => {
        const fetchBookings = async () => {
            const userDTO = await checkTokenValidity();
            if (userDTO) {
                try {
                    const bookings = await getMyBookings(userDTO.id);
                    setMyBookings(bookings);
                    const transformed = await transformData(bookings);
                    setRows(transformed);
                } catch (error) {
                    console.error(error);
                    setErrorMessage('Lỗi khi tải dữ liệu đặt sân!');
                } finally {
                }
            } else {
                setErrorMessage('Token không hợp lệ, vui lòng đăng nhập lại.');
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-12">
                    {openHistory ?
                        (<>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <h5 className="my-3">Danh sách sân bạn đã đặt</h5>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-around'
                                }}>
                                    <Button variant="outlined" color="primary" sx={{
                                        height: '40px'
                                    }} onClick={() => setOpenHistory(prev => !prev)}>
                                        Quay lại giỏ hàng
                                    </Button>
                                </Box>
                            </Box>
                            <History />
                        </>) :
                        (<>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <h5 className="my-3">Danh sách sân bạn muốn đặt</h5>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-around'
                                }}>
                                    <Button variant="outlined" color="primary" sx={{
                                        height: '40px'
                                    }} onClick={() => setOpenHistory(prev => !prev)}>
                                        Lịch sử đặt sân
                                    </Button>
                                </Box>
                            </Box>
                            <Paper sx={{ height: 'auto', width: '100%', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    checkboxSelection
                                    pagination={false}
                                    getRowId={(row) => row.id}
                                    rowHeight={50}
                                    sx={{
                                        border: 0,
                                        '& .MuiDataGrid-columnHeaders': {
                                            backgroundColor: '#f5f5f5',
                                            fontWeight: 'bold',
                                        },
                                        '& .MuiDataGrid-row:hover': {
                                            backgroundColor: '#f5f5f5',
                                        },
                                    }}
                                    onRowSelectionModelChange={handleSelect}
                                />
                                {rows.map((row) => (
                                    expandedRow === row.id ? (
                                        <div key={row.id} style={{ padding: '10px', backgroundColor: '#fcfcfc' }}>
                                            <Typography variant="body2"><strong>Người đặt: </strong>{row.tenNguoiDat}</Typography>
                                            <Typography variant="body2"><strong>SĐT: </strong>{row.sdt}</Typography>
                                            <Typography variant="body2"><strong>Email: </strong>{row.email}</Typography>
                                            <Typography variant="body2"><strong>Ghi chú: </strong>{row.doAo}</Typography>
                                            <Divider sx={{
                                                marginY: '5px',
                                                background: 'black'
                                            }} />
                                            <Typography variant="body2"><strong>Địa chỉ sân: </strong>{row.diaChiSan}</Typography>
                                            <Typography variant="body2"><strong>Khu vực: </strong>{row.khuVuc}</Typography>
                                        </div>
                                    ) : null
                                ))}
                            </Paper>
                            <div className="checkout-section">
                                <div className="row">
                                    <div className="col-md-8 md-12">

                                        <div className="bg-white p-3 mt-3 rounded" style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                                            <Typography sx={{ color: '#6D7C89', fontWeight: 400, textTransform: 'uppercase' }}>Thông tin thanh toán</Typography>
                                            <h6 className="my-3 d-flex align-items-center justify-content-between">
                                                Số lượng sân đã chọn: <span>{selectedRows.length}</span>
                                            </h6>
                                            <h6 className="my-3 d-flex align-items-center justify-content-between">
                                                Tổng thành tiền: <span>{calculateTotalAmount().toLocaleString()} VNĐ</span>
                                            </h6>
                                            <h6 className="my-3 d-flex align-items-center justify-content-between">
                                                Giảm giá: <span>{discount.toLocaleString()} VNĐ</span>
                                            </h6>
                                            <hr />
                                            <h6 className="my-3 d-flex align-items-center justify-content-between">
                                                Tổng thành tiền: <span>{(calculateTotalAmount() - discount).toLocaleString()} VNĐ</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4 md-12" >
                                        <div className="bg-white p-3 mt-3 rounded" style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                                            <Typography sx={{ color: '#6D7C89', fontWeight: 400, textTransform: 'uppercase' }}>Phiếu giảm giá</Typography>
                                            <TextField
                                                label="Voucher giảm giá"
                                                variant="outlined"
                                                value={voucher}
                                                onChange={(e) => setVoucher(e.target.value)}
                                                fullWidth
                                                sx={{ marginBottom: '16px', marginTop: 1 }}
                                            />
                                            <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                                                <Typography sx={{ color: '#6D7C89', fontWeight: 400, textTransform: 'uppercase' }}>Phương thức thanh toán</Typography>
                                                <Box sx={{ width: "100%", mt: 2 }}>
                                                    <Grid2 container spacing={2}>
                                                        {options.map((option, index) => (
                                                            <Grid2 item size={6} key={option.value}>
                                                                <TextField
                                                                    value={option.label}
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                        startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <Radio
                                                                                    checked={selectedOption === option.value}
                                                                                    onChange={() => handleRadioChange(option.value)}
                                                                                    value={option.value}
                                                                                    color="primary"
                                                                                />
                                                                            </InputAdornment>
                                                                        ),
                                                                        sx: {
                                                                            paddingY: 0,
                                                                            height: "45px",
                                                                        },
                                                                    }}
                                                                    disabled={false}
                                                                    sx={{
                                                                        "& .MuiOutlinedInput-root": {
                                                                            "& fieldset": {
                                                                                borderColor: selectedOption === option.value ? "primary.main" : "default",
                                                                            },
                                                                            "&:hover fieldset": {
                                                                                borderColor: selectedOption === option.value ? "primary.main" : "default",
                                                                            },
                                                                            "&.Mui-focused fieldset": {
                                                                                borderColor: "primary.main",
                                                                            },
                                                                        },
                                                                    }}
                                                                />
                                                            </Grid2>
                                                        ))}
                                                    </Grid2>
                                                </Box>
                                            </FormControl>
                                            <Box sx={{
                                                display: 'flex',
                                                width: '100%',
                                                justifyContent: 'flex-end'
                                            }}>
                                                <Button variant="contained" color="primary" onClick={handleCheckout}>
                                                    Thanh toán
                                                </Button>
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>)}
                </div>
            </div>
            <Snackbar open={successMessage !== ''} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={() => setSuccessMessage('')}>
                <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar sx={{
            }} open={errorMessage !== ''} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={() => setErrorMessage('')}>
                <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CartPage;