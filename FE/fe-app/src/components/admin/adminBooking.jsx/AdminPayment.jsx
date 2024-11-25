import { Box, Button, Collapse, Divider, FormControlLabel, Grid2, InputAdornment, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const AdminPayment = ({ onClose }) => {

    const [selectedOption, setSelectedOption] = useState("cash");

    const options = [
        { label: "Tiền mặt", value: "cash" },
        { label: "Thẻ tín dụng", value: "credit" },
        { label: "Chuyển khoản", value: "bank" },
        { label: "Ví điện tử", value: "wallet" },
    ];

    const handleRadioChange = (value) => {
        setSelectedOption(value);
    };

    const userInfo = [
        { id: "user-name", label: "Tên khách hàng", value: "Nguyễn Văn A" },
        { id: "user-email", label: "Email", value: "nguyenvana@example.com" },
        { id: "user-phone", label: "Số điện thoại", value: "0123456789" },
        { id: "user-address", label: "Địa chỉ", value: "123 Đường ABC, Quận XYZ" },
    ];

    const yardInfo = [
        { id: "user-name", label: "Thời gian đặt", value: "2024-11-13T10:30" },
        { id: "user-email", label: "Thời gian kết thức", value: "2024-11-13T10:30" },
    ];

    const paymentInfo = [
        { label: 'Tổng cộng', number: 100000 },
        { label: 'Giảm giá', number: 0 },
        { label: 'Thành tiền', number: 100000 }
    ]

    const [expandedRow, setExpandedRow] = useState(null);  // State to track expanded row

    const handleExpandClick = (rowIndex) => {
        setExpandedRow(expandedRow === rowIndex ? null : rowIndex); // Toggle expanded row
    };

    const rows = [
        { id: 1, name: "John Doe", age: 25, details: "Hi" },
        { id: 2, name: "Jane Smith", age: 30, details: "Hi" },
    ];

    return (
        <Box sx={{
            width: '100%',
            padding: 3,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box sx={{ width: '90%', background: 'white', borderRadius: '1rem' }}>

                <Grid2 container sx={{ width: '100%' }}>
                    <Grid2 item size={7} sx={{ borderRight: '2px solid #F7F6F7', padding: 3 }}>
                        <Typography variant="h6" sx={{ color: '#6D7C89', fontWeight: 500 }}>Thông tin đặt sân</Typography>
                        <Box sx={{
                            marginTop: 3
                        }}>
                            <Typography sx={{ color: '#6D7C89', fontWeight: 400, textTransform: 'uppercase' }}>Thông tin khách hàng</Typography>
                            <Grid2 container spacing={3} sx={{ marginTop: 2 }}>
                                {userInfo.map((info) => (
                                    <Grid2 item size={6} key={info.id}>
                                        <TextField
                                            fullWidth
                                            id={info.id}
                                            label={info.label}
                                            value={info.value}
                                            InputProps={{
                                                readOnly: true,
                                                sx: {
                                                    paddingY: 0,
                                                    height: "45px",
                                                },
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid2>
                                ))}
                            </Grid2>

                        </Box>
                        <Box sx={{
                            marginTop: 3
                        }}>
                            <Typography sx={{ color: '#6D7C89', fontWeight: 400, textTransform: 'uppercase' }}>Thông tin sân</Typography>
                            <TextField
                                sx={{
                                    marginTop: 3
                                }}
                                fullWidth
                                label={"Tên sân"}
                                value={"Sân bóng bàn ABC"}
                                InputProps={{
                                    readOnly: true,
                                    sx: {
                                        paddingY: 0,
                                        height: "45px",
                                    },
                                }}
                                variant="outlined"
                            />
                            <Grid2 container spacing={3} sx={{ marginTop: 3 }}>
                                {yardInfo.map((info) => (
                                    <Grid2 item size={6} key={info.id}>
                                        <TextField
                                            fullWidth
                                            type="datetime-local"
                                            id={info.id}
                                            label={info.label}
                                            value={info.value}
                                            InputProps={{
                                                readOnly: true,
                                                sx: {
                                                    paddingY: 0,
                                                    height: "45px",
                                                },
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid2>
                                ))}
                            </Grid2>
                        </Box>
                        <Typography sx={{ color: '#6D7C89', fontWeight: 400, textTransform: 'uppercase', marginTop: 3, marginBottom: 3 }}>Danh sách đặt sân</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Age</TableCell>
                                        <TableCell>Details</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <React.Fragment key={row.id}>
                                            <TableRow>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.age}</TableCell>
                                                <TableCell>{row.details}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => handleExpandClick(index)}>
                                                        {expandedRow === index ? "Hide Details" : "Show Details"}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>

                                            {/* Collapse component for smooth expand/collapse */}
                                            <TableRow>
                                                <TableCell colSpan={4} style={{ padding: 0 }}>
                                                    <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                                                        <Box sx={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
                                                            {row.details}
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid2>
                    <Grid2 item size={5} sx={{ padding: 3 }}>
                        <Typography variant="h6" sx={{ color: '#6D7C89', fontWeight: 500 }}>Thanh toán</Typography>
                        <Typography sx={{ fontSize: '14px', marginTop: 1 }}>Nó có thể giúp bạn quản lý và phục vụ các đơn hàng trước, trong và sau khi thực hiện.</Typography>
                        <Box sx={{
                            marginTop: 3,
                            borderRadius: '1rem',
                            background: '#F7F6F7',
                            padding: 3
                        }}>
                            <Typography sx={{ fontSize: '14px', marginTop: 1 }}>Áp dụng mã giảm giá</Typography>
                            <TextField
                                sx={{ marginTop: 2 }}
                                fullWidth
                                label={"Nhập mã giảm giá (nếu có)"}
                                InputProps={{
                                    sx: {
                                        paddingY: 0,
                                    },
                                }}
                                variant="outlined"
                            />
                        </Box>
                        {paymentInfo.map((payment, index) => (
                            // {index === 2 ? (<Divider />) : ''}
                            <Box>
                                {index === 2 && <Divider sx={{ width: '100%', height: '1px', bgcolor: "secondary.main", marginTop: 2 }} />}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: 2,
                                }}>
                                    <Typography sx={{ color: '#6D7C89', width: '50%', textAlign: 'left' }}>
                                        {payment.label}
                                    </Typography>
                                    <Typography sx={{ color: '#6D7C89', width: '50%', textAlign: 'right', fontSize: payment.label === 'Thành tiền' ? '20px' : '', textDecoration: payment.label === 'Tổng cộng' ? 'line-through' : '' }}>
                                        {payment.number}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        <Typography sx={{ color: '#6D7C89', fontWeight: 400, textTransform: 'uppercase', marginTop: 3 }}>Phương thức thanh toán</Typography>
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
                        <Box sx={{
                            marginTop: 3,
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <Button sx={{ borderColor: '#4DB600', color: '#4DB600' }} variant="outlined" onClick={onClose}>Quay lại</Button>
                            <Button sx={{ marginLeft: 1, background: '#4DB600' }} variant="contained">Thanh toán</Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
            {/* <Button onClick={onClose}>
                Trở về
            </Button> */}
        </Box>
    )
}

export default AdminPayment;