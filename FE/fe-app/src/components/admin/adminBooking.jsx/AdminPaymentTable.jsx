import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatNumber } from "../../../utils/FormatNumber";

const useStyles = makeStyles((theme) => ({
    tableFont: {
        fontFamily: '"Inter", sans-serif',
        border: 'none'
    },
    tablecell: {
        width: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    tablemethod: {

    }
}));

const AdminPaymentTable = () => {

    const classes = useStyles();

    const paymentList = [
        { id: 1, name: 'Nguyễn Văn An', date: '12/11/2024 13:01:00', method: 'TIỀN MẶT', sale: 100000, total: 200000, pay: 1000000 },
        { id: 2, name: 'Trần Văn Bình', date: '12/11/2024 18:12:00', method: 'THẺ TÍN DỤNG', sale: 50000, total: 300000, pay: 2500000 },
        { id: 3, name: 'Trần Văn Bình', date: '12/11/2024 18:12:00', method: 'CHUYỂN KHOẢN', sale: 50000, total: 300000, pay: 2500000 },
        { id: 4, name: 'Trần Văn Bình', date: '12/11/2024 18:12:00', method: 'VÍ ĐIỆN TỬ', sale: 50000, total: 300000, pay: 2500000 },
    ]

    return (
        <Box>
            <TableContainer sx={{
                borderRadius: '16px',
                boxShadow: '4px 4px 16px rgba(0, 0, 0, .05)',
                marginTop: 2
            }}>
                <Table aria-label="yard table">
                    <TableHead sx={{ background: '#F4F6F8' }}>
                        <TableRow>
                            <TableCell>Tên khách hàng</TableCell>
                            <TableCell>Ngày thanh toán</TableCell>
                            <TableCell align="center">Phương thức thanh toán</TableCell>
                            <TableCell align="center">Giảm giá</TableCell>
                            <TableCell align="center">Tổng tiền</TableCell>
                            <TableCell align="center">Thành tiền</TableCell>
                            <TableCell align="center">Tùy chọn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paymentList.map((payment, index) => (
                            <TableRow key={index} className={classes.tableFont}>
                                <TableCell className={classes.tablecell}>{payment.name}</TableCell>
                                <TableCell>{payment.date}</TableCell>
                                <TableCell align="center">
                                    <Typography
                                        sx={{
                                            background: payment.method === 'TIỀN MẶT' ? '#F7F6F7' : payment.method === 'THẺ TÍN DỤNG' ? '#E4DCFB' : payment.method === 'CHUYỂN KHOẢN' ? '#D1EAFB' : '#FFE2E3',
                                            color: payment.method === 'TIỀN MẶT' ? '#8A8D93' : payment.method === 'THẺ TÍN DỤNG' ? '#8C57FF' : payment.method === 'CHUYỂN KHOẢN' ? '#16B1FF' : '#FF4C51',
                                            padding: '3px 0px',
                                            width: '120px',
                                            borderRadius: '15px',
                                            fontWeight: 'bold',
                                            fontSize: '12px',
                                            display: 'inline-block',  // Đảm bảo typography không chiếm hết không gian
                                            textAlign: 'center',
                                        }}>{payment.method}</Typography>
                                </TableCell>
                                <TableCell align="right" >{formatNumber(payment.sale)}</TableCell>
                                <TableCell align="right">{formatNumber(payment.total)}</TableCell>
                                <TableCell align="right">{formatNumber(payment.pay)}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => { alert(payment.id) }}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={7} sx={{ paddingY: '4px' }}>
                                <TablePagination className='custom-page'
                                    rowsPerPageOptions={[5, 10, 15, 20]}
                                    component="div"
                                    sx={{
                                        display: 'flex',
                                        alignContent: 'center',
                                        margin: '0'
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default AdminPaymentTable;