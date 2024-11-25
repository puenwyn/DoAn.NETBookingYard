import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminOwner from './AdminOwner';
import Paper from '@mui/material/Paper';
import { TablePagination, TableFooter, Button, TextField, IconButton, InputAdornment, CircularProgress, Skeleton } from '@mui/material';
import { Typography } from '@mui/material';
import { Avatar, Grid2, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { RiInformationFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import '../../styles/components/adminOwner.css';
import { IoIosSearch } from "react-icons/io";
import { MdOutbond } from 'react-icons/md';
import { FaLock, FaUnlock } from "react-icons/fa6";
import { OwnerContext } from '../../context/OwnerContext';
import Swal from 'sweetalert2';
import { formatDate } from '../../utils/FormatDate';
import AdminOwnerUpdate from './adminOwner/AdminOwnerUpdate';

const useStyles = makeStyles((theme) => ({
    tableFont: {
        fontFamily: '"Inter", sans-serif',
    },
    tablerowcus: {
        border: 'none',
        '& td, & th': { // Áp dụng cho tất cả các ô
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
        },
        borderBottom: '1px solid rgb(229, 234, 239)'
    },
    name: {
        color: 'rgba(58, 65, 111, 0.7)',
        fontSize: '14px',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 400,
    },
    fullName: {
        color: 'rgba(58, 65, 111, 0.7)',
        fontSize: '14px',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 400,
        maxWidth: '200px'
    },
    address: {
        color: 'rgba(58, 65, 111, 0.7)',
        fontSize: '14px',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '200px'
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
    const [addForm, setAddForm] = React.useState(false);
    const [updateForm, setUpdateForm] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddForm = () => {
        setAddForm(true);
    }

    const handleBackAddForm = () => {
        setAddForm(false);
    }

    const handleUpdateForm = () => {
        setUpdateForm(true);
    }

    const handleBackUpdateForm = () => {
        setUpdateForm(false);
    }

    const { owners, loading, error, rowsPerPage, page, setPage, setRowsPerPage, totalOwners, addOwner, updateOwnerLocked } = React.useContext(OwnerContext);
    if (loading) {
        return <CircularProgress />
    }
    if (error) {
        return <div>Error: {error}</div>
    }

    const ownerOverview = [
        { icon: <MdOutbond />, title: 'Tổng chủ sỡ hữu', total: totalOwners },
        { icon: <MdOutbond />, title: 'Tổng chủ sỡ hữu bị khóa', total: 10 },
        { icon: <MdOutbond />, title: 'Tổng chủ sỡ hữu đang hoạt động', total: 10 }
    ]

    const handleLock = (id, isLocked) => {
        Swal.fire({
            title: 'Xác nhận',
            text: `Bạn có chắc chắn muốn ${isLocked === 1 ? 'mở' : ''} khóa tài khoản này không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Có, ${isLocked === 1 ? 'mở' : ''} khóa tài khoản`,
            cancelButtonText: 'Hủy',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const lockResult = await updateOwnerLocked(id);
                if (lockResult.status === 'success') {
                    Swal.fire({
                        title: 'Thành công!',
                        text: `Tài khoản đã được ${isLocked === 1 ? 'mở' : ''} khóa thành công.`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                } else {
                    Swal.fire({
                        title: 'Thất bại!',
                        text: lockResult.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            }
        });
    };

    return (
        <>

            {addForm ? (
                <AdminOwner setAddForm={setAddForm} addOwner={addOwner} onClose={handleBackAddForm} />
            ) : updateForm ? (
                <AdminOwnerUpdate onClose={handleBackUpdateForm} />
            ) : (
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',
                    padding: 3
                }}>
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
                            <TableContainer component={Box} sx={{ maxHeight: 'auto' }}>
                                <Table className='owner-table' aria-label="simple table">
                                    <TableHead>
                                        <TableRow className={classes.tablerowcus}>
                                            <TableCell align='center'>Họ tên</TableCell>
                                            <TableCell align='center'>Ngày sinh</TableCell>
                                            <TableCell align='center'>Địa chỉ</TableCell>
                                            <TableCell align='center'>Số điện thoại</TableCell>
                                            <TableCell align='center'>Giới tính</TableCell>
                                            <TableCell align='center'>Trạng thái</TableCell>
                                            <TableCell align='center'>Tùy chọn</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {owners?.map((owner) => (
                                            <TableRow
                                                key={owner.id}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                }}
                                                className={classes.tablerowcus}
                                            >
                                                <TableCell component="th" scope="row" className={classes.fullName} sx={{ paddingTop: '10px', paddingBottom: '10px' }} >
                                                    <Grid2 container alignItems='center'>
                                                        <Grid2 item>
                                                            <Avatar alt={owner.fullName} src='.' className={classes.avatar} />
                                                        </Grid2>
                                                        <Grid2 sx={{ marginLeft: 2 }}>
                                                            <Typography className={classes.name}>{owner.fullName}</Typography>
                                                        </Grid2>
                                                    </Grid2>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography className={classes.name}>{formatDate(owner.dateOfBirth)}</Typography>
                                                </TableCell>
                                                <TableCell className={classes.address}>{owner.address}</TableCell>
                                                <TableCell align='center' className={classes.name}>
                                                    {owner.phoneNumber}
                                                </TableCell>
                                                <TableCell align='center' className={classes.name}>
                                                    {owner.gender === 0 ? 'Nam' : 'Nữ'}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography sx={{
                                                        backgroundColor: owner.isLocked === 0 ? '#E4F6D6' : '#FFE2E3',
                                                        color: owner.isLocked === 0 ? '#56CA00' : '#FF4C51',
                                                        padding: '3px 10px',
                                                        borderRadius: '15px',
                                                        fontWeight: 'bold',
                                                        fontSize: '12px'
                                                    }}
                                                    >{owner.isLocked === 0 ? 'ACTIVE' : 'BLOCK'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <IconButton aria-label="delete" sx={{
                                                        color: 'rgb(33, 82, 255)'
                                                    }}
                                                        onClick={handleUpdateForm}>
                                                        <RiInformationFill />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="delete"
                                                        sx={{
                                                            color: `${owner.isLocked === 1 ? 'rgb(0, 0, 0)' : 'rgb(245, 59, 71)'}`
                                                        }}
                                                        onClick={() => handleLock(owner.id, owner.isLocked)}>
                                                        {owner.isLocked === 1 ? <FaUnlock /> : <FaLock />}
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination className='custom-page'
                                                rowsPerPageOptions={[5, 10, 15, 20]}
                                                component="div"
                                                count={totalOwners}
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
                </Box>
            )}


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
