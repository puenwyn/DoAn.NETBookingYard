import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminOwner from './AdminOwner';
import Paper from '@mui/material/Paper';
import { TablePagination, TableFooter, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { Typography } from '@mui/material';
import { Avatar, Grid2, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { RiInformationFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import '../../styles/components/adminOwner.css';
import { IoIosSearch } from "react-icons/io";
import { MdOutbond } from 'react-icons/md';

function createData(id, name, date, add, phone, gender, status) {
    return { id, name, date, add, phone, gender, status };
}

const rows = [
    createData(1, 'Nguyễn Văn A', '01-12-1999', '273 An Dương Vương', '0987654321', 'Nam', 'Active'),
    createData(2, 'Trần Văn B', '24-03-2000', '496 Dương Quảng Hàm', '0123456789', 'Nam', 'Active'),
    createData(3, 'Phan Văn C', '18-12-1997', '496 Dương Quảng Hàm', '0123456789', 'Nam', 'Active'),
    createData(4, 'Nguyễn Đình D', '14-16-1997', '289 Nguyễn Thái Sơn', '0867285726', 'Nam', 'Active'),
    createData(5, 'Nguyễn Ngọc E', '29-05-2001', '496 Dương Quảng Hàm', '0123456789', 'Nam', 'Active'),
    createData(6, 'Huỳnh Gia G', '09-04-2002', '123 Phan Văn Trị', '0123456789', 'Nam', 'Active'),
    createData(7, 'Nguyễn Văn A', '01-12-1999', '273 An Dương Vương', '0987654321', 'Nam', 'Block'),
    createData(8, 'Trần Văn B', '24-03-2000', '496 Dương Quảng Hàm', '0123456789', 'Nam', 'Active'),
    createData(9, 'Phan Văn C', '18-12-1997', '496 Dương Quảng Hàm', '0123456789', 'Nam', 'Active'),
    createData(10, 'Nguyễn Đình D', '14-16-1997', '289 Nguyễn Thái Sơn', '0867285726', 'Nam', 'Active')
];

const useStyles = makeStyles((theme) => ({
    tableFont: {
        fontFamily: '"Inter", sans-serif',
    },
    tablerowcus: {
        border: 'none',
        '& td, & th': { // Áp dụng cho tất cả các ô
            border: 'none', // Loại bỏ border cho td và th
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
        },
        borderBottom: '1px solid rgb(229, 234, 239)'
    },
    name: {
        color: 'rgba(58, 65, 111, 0.7)',
        fontSize: '14px',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 400
    },
    status: {
        fontSize: '0.95rem',
        background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', // Màu gradient
        WebkitBackgroundClip: 'text', // Clip nền cho chữ
        WebkitTextFillColor: 'transparent', // Làm màu chữ trong suốt
        display: 'inline-block', // Đảm bảo gradient áp dụng đúng cho chữ,
        textTransform: 'uppercase'
    },
    icon: {
        cursor: 'pointer',
        color: 'blue',
    }
}));

const UserTable = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [addForm, setAddForm] = React.useState(false);
    const [infoForm, setInfoForm] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddForm = () => {
        setAddForm(!addForm);
    }

    const handleInfoForm = () => {
        setInfoForm(true);
    }

    const ownerOverview = [
        { icon: <MdOutbond />, title: 'Tổng chủ sỡ hữu', total: 10 },
        { icon: <MdOutbond />, title: 'Tổng chủ sỡ hữu', total: 10 },
        { icon: <MdOutbond />, title: 'Tổng chủ sỡ hữu', total: 10 }
    ]

    return (
        <>
            <Box sx={{
                width: '100%',
                height: '100%',
                overflowY: 'auto'
            }}>
                {addForm === false && (
                    <Box>
                        <Box sx={{
                            width: '100%',
                            height: '150px',
                            padding: 3,
                            background: '#ECF2FF',
                            borderRadius: '0.5rem',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <Typography variant='h6' sx={{
                                fontWeight: 400,
                                color: 'black'
                            }}>Danh sách thông tin chủ sân</Typography>
                            <Typography sx={{
                                fontWeight: 300,
                                color: 'black',
                                fontSize: '15px'
                            }}>Danh sách chủ sỡ hữu sân thể thao giúp bạn dễ dàng liên lạc</Typography>
                            <Box sx={{
                                background: `url(${process.env.PUBLIC_URL}/assets/moderizelogo.jpg)`,
                                width: '180px',
                                height: '180px',
                                backgroundSize: 'cover',
                                position: 'absolute',
                                bottom: '-35%',
                                right: '1%'
                            }} />
                        </Box>
                        <Box sx={{
                            marginTop: 3,
                            width: '100%',
                            padding: 2,
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            boxShadow: 'none'
                        }}>

                            <Box sx={{
                                marginBottom: 3,
                                background: 'transparent',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                {ownerOverview.map((owner) => (
                                    <Box sx={{
                                        width: '32%',
                                        height: '100px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-center',
                                        paddingX: 4,
                                        background: '#ECF2FF',
                                        borderRadius: '1rem'
                                    }}>
                                        <IconButton
                                            sx={{
                                                width: '50px', // Chiều rộng
                                                height: '50px', // Chiều cao
                                                borderRadius: '8px', // Bo góc
                                                background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', // Màu nền
                                                '&:hover': {
                                                    backgroundColor: 'rgba(58, 65, 111, 0.2)', // Màu nền khi hover
                                                },
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 0,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(58, 65, 111, 0.2)', // Màu nền khi hover
                                                },
                                                pointerEvents: 'none',
                                                color: 'white',
                                                boxShadow: 'rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem'
                                            }}
                                        >{<MdOutbond />}</IconButton>
                                        <Box sx={{
                                            marginLeft: 2
                                        }}>
                                            <Typography sx={{ color: 'rgba(58, 65, 111, 0.7)' }}>{owner.title}</Typography>
                                            <Typography sx={{ color: 'rgb(52, 71, 103)' }}>{owner.total}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <TextField
                                    autoComplete="off"
                                    placeholder="Tìm kiếm"
                                    variant="outlined"
                                    InputProps={{
                                        sx: {
                                            padding: 0,
                                            height: '40px',
                                            fontSize: '15px',
                                            "& .MuiOutlinedInput-root": {
                                                "&.Mui-focused fieldset": {
                                                    borderColor: 'rgb(73, 190, 255)'
                                                },
                                            },
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IoIosSearch style={{ color: 'rgb(162, 162, 162)', marginRight: '10px' }} />
                                            </InputAdornment>
                                        )
                                    }
                                    }
                                />
                                <Button
                                    variant='contained'
                                    onClick={handleAddForm}
                                    sx={{
                                        //33, 82, 255
                                        background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
                                        color: 'white',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            boxShadow: 'none'
                                        },
                                    }}>Thêm mới</Button>
                            </Box>
                            <TableContainer component={Box} sx={{ maxHeight: 'none' }}>
                                <Table stickyHeader className='owner-table' aria-label="simple table">
                                    <TableHead>
                                        <TableRow className={classes.tablerowcus}>
                                            <TableCell>Họ tên</TableCell>
                                            <TableCell>Ngày sinh</TableCell>
                                            <TableCell>Địa chỉ</TableCell>
                                            <TableCell align='center'>Số điện thoại</TableCell>
                                            <TableCell align='center'>Giới tính</TableCell>
                                            <TableCell align='center'>Trạng thái</TableCell>
                                            <TableCell align='center'>Xem thông tin</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                }}
                                                className={classes.tablerowcus}
                                            >
                                                <TableCell component="th" scope="row" sx={{ paddingTop: '10px', paddingBottom: '10px' }} >
                                                    <Grid2 container alignItems='center'>
                                                        <Grid2 item>
                                                            <Avatar alt={row.name} src='.' className={classes.avatar} />
                                                        </Grid2>
                                                        <Grid2 sx={{ marginLeft: 2 }}>
                                                            <Typography className={classes.name}>{row.name}</Typography>
                                                        </Grid2>
                                                    </Grid2>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography className={classes.name}>{row.date}</Typography>
                                                </TableCell>
                                                <TableCell className={classes.name}>{row.add}</TableCell>
                                                <TableCell align='center' className={classes.name}>
                                                    {row.phone}
                                                </TableCell>
                                                <TableCell align='center' className={classes.name}>
                                                    {row.gender}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography
                                                        className={classes.status}
                                                        style={{
                                                            background: ((row.status === 'Active' && 'rgb(119, 220, 48)') || (row.status === 'Block' && 'rgb(245, 59, 71)'))
                                                        }}
                                                    >{row.status}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <IconButton aria-label="delete" sx={{
                                                        color: 'rgb(33, 82, 255)'
                                                    }}>
                                                        <RiInformationFill />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" sx={{
                                                        color: 'rgb(245, 59, 71)'
                                                    }}>
                                                        <IoMdTrash />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination className='custom-page'
                                                rowsPerPageOptions={[5, 15, 25]}
                                                component="div"
                                                count={rows.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                sx={{
                                                    display: 'flex',
                                                    alignContent: 'center',
                                                    margin: '0'
                                                }}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                )}
                {addForm === true && (<AdminOwner />)}

            </Box>


            {/* Display selected user info */}
            {/* {selectedUser && (
                <Paper sx={{ padding: 2, marginTop: 2 }}>
                    <Typography variant="h6">Thông tin chi tiết của {selectedUser.name}</Typography>
                    <Typography>Email: {selectedUser.email}</Typography>
                    <Typography>Số điện thoại: {selectedUser.phone}</Typography>
                    <Typography>Địa chỉ: {selectedUser.add}</Typography>
                    <Typography>Ngày sinh: {selectedUser.date}</Typography>
                </Paper>
            )} */}
        </>
    );
}

export default UserTable;
