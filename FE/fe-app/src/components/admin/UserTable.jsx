import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Grid2 } from '@mui/material';

function createData(name, email, date, add, phone, status) {
    return { name, email, date, add, phone, status };
}

const rows = [
    createData('Nguyễn Văn A', '01-12-1999', 'nguyenvana@gmail.com', '273 An Dương Vương', '0987654321', 0),
    createData('Trần Văn B', '24-03-2000', 'tranvanb@gmail.com', '496 Dương Quảng Hàm', '0123456789', 1),
];

const UserTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Họ tên</TableCell>
                        <TableCell>Ngày sinh</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Tình trạng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Grid2 container alignItems='center'>
                                    <Grid2 item>
                                        <Avatar alt={row.name} src='.' />
                                    </Grid2>
                                    <Grid2 item container direction="column" sx={{ marginLeft: 2 }}>
                                        <Grid2 item>{row.name}</Grid2>
                                        <Grid2 item>{row.email}</Grid2>
                                    </Grid2>
                                </Grid2>
                            </TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.add}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserTable;