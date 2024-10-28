import { useRef, useState } from "react";
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
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import QRCode from 'qrcode';
import '../../styles/components/cart.css';

const CartPage = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [voucher, setVoucher] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [expandedRow, setExpandedRow] = useState(null);

    // Dữ liệu sân
    const [rows, setRows] = useState([
        { id: 1, tenSan: 'Sân cầu lông T&T', chiTietSan: 'Sân cầu lông T&T sân 1', ngayDatSan: '2024-10-18', thoiGian: '10:00 - 11:00', trangThaiSan: 'Trống', giaSan: '100.000', tenNguoiDat: 'Nguyễn Văn A', sdt: '0123456789', email: 'a@example.com', doAo: 'Áo thể thao xanh' },
        { id: 2, tenSan: 'Sân cầu lông T&T', chiTietSan: 'Sân cầu lông T&T sân A', ngayDatSan: '2024-10-20', thoiGian: '15:00 - 16:00', trangThaiSan: 'Trống', giaSan: '100.000', tenNguoiDat: 'Trần Thị B', sdt: '0987654321', email: 'b@example.com', doAo: 'Áo đỏ' },
        { id: 3, tenSan: 'Sân cầu lông T&T', chiTietSan: 'Sân cầu lông T&T sân 1', ngayDatSan: '2024-10-20', thoiGian: '10:00 - 11:00', trangThaiSan: 'Trống', giaSan: '100.000', tenNguoiDat: 'Nguyễn Văn C', sdt: '0123456789', email: 'c@example.com', doAo: 'Áo vàng' },
        { id: 4, tenSan: 'Sân cầu lông T&T', chiTietSan: 'Sân cầu lông T&T sân 2', ngayDatSan: '2024-10-21', thoiGian: '10:00 - 11:00', trangThaiSan: 'Đang được thuê', giaSan: '100.000', tenNguoiDat: 'Nguyễn Văn D', sdt: '0123456789', email: 'd@example.com', doAo: 'Áo xanh' },
    ]);

    const calculateTotalAmount = () => {
        return selectedRows.reduce((total, id) => {
            const row = rows.find(row => row.id === id);
            return total + parseFloat(row.giaSan.replace('.', '').replace(',', ''));
        }, 0);
    };

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
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isConfirmed) {
                setRows(rows.filter(row => row.id !== id));
                setSuccessMessage("Đã xóa thành công.");
            }
        });
    };

    const handleSelect = (selectionModel) => {
        setSelectedRows(selectionModel);
    };

    const handleCheckout = async () => {
        const now = new Date();
        const invalidRows = selectedRows.filter(rowId => {
            const selectedRow = rows.find(row => row.id === rowId);
            const [startTime] = selectedRow.thoiGian.split(' - ');
            const [startHour, startMinute] = startTime.split(':').map(Number);
            const selectedDate = new Date(selectedRow.ngayDatSan);
            selectedDate.setHours(startHour, startMinute, 0);
            return selectedDate < now || selectedRow.trangThaiSan !== 'Trống';
        });

        if (invalidRows.length > 0) {
            setErrorMessage('Có sân đã được đặt hoặc thời gian đã qua.');
            return;
        }

        if (selectedRows.length === 0) {
            setErrorMessage('Vui lòng chọn sân để thanh toán.');
            return;
        }

        if (!paymentMethod) {
            setErrorMessage('Vui lòng chọn phương thức thanh toán.');
            return;
        }

        const totalAmount = calculateTotalAmount();

        // Tạo phần tử in
        const printArea = document.createElement('div');
        printArea.id = 'printArea';

        // Tạo nội dung hóa đơn cho từng sân
        for (const rowId of selectedRows) {
            const selectedRow = rows.find(row => row.id === rowId);
            const qr = await QRCode.toDataURL(JSON.stringify(selectedRow));

            const receiptContent = `
                <pre>
                    Tên sân: ${selectedRow.tenSan}
                    Chi tiết sân: ${selectedRow.chiTietSan}
                    Ngày đặt sân: ${selectedRow.ngayDatSan}
                    Thời gian: ${selectedRow.thoiGian}
                    Giá sân: ${selectedRow.giaSan}
                    Người đặt: ${selectedRow.tenNguoiDat}
                    SĐT: ${selectedRow.sdt}
                    Email: ${selectedRow.email}
                    Tổng số tiền: ${totalAmount.toLocaleString()} VNĐ
                </pre>
                <img src="${qr}" alt="QR Code" />
                <div class="page-break"></div>
            `;
            printArea.innerHTML += receiptContent;
        }

        document.body.appendChild(printArea);
        window.print();
        document.body.removeChild(printArea);

        // Reset trạng thái
        setSelectedRows([]);
        setVoucher('');
        setPaymentMethod('');
    };

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
                        backgroundColor = 'white';
                        borderColor = 'white';
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-12">
                    <h5 className="my-3">Danh sách sân bạn muốn đặt</h5>
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
                                <div key={row.id} style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
                                    <Typography variant="body2"><strong>Người đặt: </strong>{row.tenNguoiDat}</Typography>
                                    <Typography variant="body2"><strong>SĐT: </strong>{row.sdt}</Typography>
                                    <Typography variant="body2"><strong>Email: </strong>{row.email}</Typography>
                                    <Typography variant="body2"><strong>Đồ áo: </strong>{row.doAo}</Typography>
                                </div>
                            ) : null
                        ))}
                    </Paper>
                    <div className="checkout-section">
                        <div className="row">
                            <div className="col-md-8 md-12">
                                <div className="bg-white p-3 mt-3 rounded" style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                                    <h6 className="my-3 d-flex align-items-center justify-content-between">
                                        Số lượng sân đã chọn: <span>{selectedRows.length}</span>
                                    </h6>
                                    <h6 className="my-3 d-flex align-items-center justify-content-between">
                                        Tổng thành tiền: <span>{calculateTotalAmount().toLocaleString()} VNĐ</span>
                                    </h6>
                                    <h6 className="my-3 d-flex align-items-center justify-content-between">
                                        Giảm giá: <span>100.000 VNĐ</span>
                                    </h6>
                                    <hr />
                                    <h6 className="my-3 d-flex align-items-center justify-content-between">
                                        Tổng thành tiền: <span>{calculateTotalAmount().toLocaleString()} VNĐ</span>
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-4 md-12" >
                                <div className="bg-white p-3 mt-3 rounded" style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                                    <TextField
                                        label="Voucher giảm giá"
                                        variant="outlined"
                                        value={voucher}
                                        onChange={(e) => setVoucher(e.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: '16px' }}
                                    />
                                    <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                                        <InputLabel>Phương thức thanh toán</InputLabel>
                                        <Select
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <MenuItem value="credit_card">Thẻ tín dụng</MenuItem>
                                            <MenuItem value="paypal">PayPal</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" color="primary" onClick={handleCheckout}>
                                        Thanh toán
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar open={successMessage !== ''} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
                <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={errorMessage !== ''} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
                <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CartPage;