import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, TableFooter, Button, TextField, IconButton, InputAdornment, CircularProgress, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Typography } from '@mui/material';
import { Avatar, Grid2, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { RiInformationFill } from "react-icons/ri";
import '../../styles/components/adminOwner.css';
import { IoIosSearch } from "react-icons/io";
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import { UserContext } from '../../context/UserContext';
import AdminUserDetail from './AdminUserDetail';
import { formatDate } from '../../utils/FormatDate';
import { DoughnutChart2 } from './DoughnutChart';
import { CircularProgressWithLabel } from './AdminChart';

const useStyles = makeStyles((theme) => ({
    tableFont: {
        fontFamily: '"Inter", sans-serif',
    },
    tablerowcus: {
        border: 'none',
        '& td, & th': { // Áp dụng cho tất cả các ô
            // Loại bỏ border cho td và th
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
    icon: {
        cursor: 'pointer',
        color: 'blue',
    }
}));

const paymentData = [
    { label: 'Thẻ tín dụng', percentage: 39.7, color: '#F7F6F7', sencondColor: '#8A8D93', imgSrc: <CurrencyYenIcon /> },
    { label: 'Tiền mặt', percentage: 28.3, color: '#8C57FF', sencondColor: '#E4DCFB', imgSrc: <CreditCardIcon /> },
    { label: 'SmartBanking', percentage: 17.4, color: '#16B1FF', sencondColor: '#D1EAFB', imgSrc: <AccountBalanceIcon /> },
    { label: 'Khác', percentage: 14.6, color: '#FF4C51', sencondColor: '#FFE2E3', imgSrc: <AccountBalanceWalletIcon /> },
];

// Hàm tính màu chữ dựa trên màu nền
const getTextColorBasedOnBgColor = (bgColor) => {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
    return brightness > 186 ? 'black' : 'white';
};

// Thành phần PaymentMethodStats hiển thị thanh tiến trình
const PaymentMethodStats = () => {
    return (
        <Box>
            <Typography sx={{ color: '#6D7C89', fontWeight: 600 }}>Phương thức thanh toán thông dụng</Typography>
            {/* Thanh tiến trình với các màu sắc và phần trăm */}
            <Box display="flex" width="100%" height="46px" borderRadius={2} overflow="hidden" mb={2} mt={2}>
                {paymentData.map((payment, index) => (
                    <Box
                        key={index}
                        width={`${payment.percentage}%`}
                        bgcolor={payment.color}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color={getTextColorBasedOnBgColor(payment.color)}
                    >
                        <Typography sx={{ fontSize: '13px' }}>
                            {payment.percentage}%
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Bảng chi tiết phương thức thanh toán với icon và tên */}
            <TableContainer>
                <Table>
                    <TableBody>
                        {paymentData.map((payment, index) => (
                            <TableRow key={index} sx={{
                                paddingTop: '8px',  // Điều chỉnh paddingTop
                                paddingBottom: '8px' // Điều chỉnh paddingBottom nếu cần
                            }}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <IconButton sx={{
                                            background: payment.sencondColor,
                                            color: payment.color,  // Thay đổi màu icon SVG
                                            pointerEvents: 'none',
                                            borderRadius: '8px',
                                        }}>
                                            {payment.imgSrc}
                                        </IconButton>
                                        <Typography variant="body1" sx={{ marginLeft: 1 }}>{payment.label}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" fontWeight="bold">
                                        {payment.percentage}%
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    );
};

const UserTable = () => {
    const classes = useStyles();
    const [addForm, setAddForm] = React.useState(false);
    const [infoForm, setInfoForm] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewInfo = (user) => {
        setSelectedUser(user);
        setInfoForm(true);
    }

    const userList = [
        { name: 'Nguyễn Văn An', booking: 19, color: '#BEE9FF' },
        { name: 'Trần Văn Bình', booking: 17, color: '#D0F0B8' },
        { name: 'Phan Văn Cường', booking: 16, color: '#FFEAB8' },
        { name: 'Huỳnh Gia Hưng', booking: 10, color: '#FFCDCE' },
        { name: 'Võ Văn Tài', booking: 7, color: '#E0CFFE' }
    ]

    const dataset = [
        { label: 'Hoạt động', stat: 20 },
        { label: 'Bị khóa', stat: 5 }
    ]

    const { users, loading, error, rowsPerPage, page, setPage, setRowsPerPage, totalUsers, getUserDetail, keySearch, setKeySearch } = React.useContext(UserContext);

    // Loading và error sẽ trả về component hiển thị riêng biệt, nếu có
    if (loading) {
        return <>
            <div className="loading-overlay">
                <div className="loading-circle"></div>
            </div></>
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleViewUser = (user) => {
        setSelectedUser(user);
    };

    return (
        infoForm ? (<AdminUserDetail user={selectedUser} />) : (
            <Box sx={{
                width: '100%',
                height: '100%',
                padding: 3,
                overflowY: 'auto'
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
                        }}>Danh sách thông tin người dùng</Typography>
                        <Typography sx={{
                            fontWeight: 300,
                            color: 'black',
                            fontSize: '15px'
                        }}>Danh sách người dùng giúp bạn dễ dàng liên lạc</Typography>
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
                    }}>
                        <Grid2 container spacing={3}>
                            <Grid2 item size={4} container>
                                <Grid2 item size={12} sx={{ padding: 3, height: '209px', background: 'white', borderRadius: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton sx={{
                                            background: '#215BFF',
                                            color: 'white',  // Thay đổi màu icon SVG
                                            pointerEvents: 'none',
                                            borderRadius: '50px',
                                        }}>
                                            <AccountCircleIcon />
                                        </IconButton>
                                        <Typography sx={{ color: '#6D7C89', fontWeight: 600, marginLeft: 1 }}>Tổng người dùng</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            <Typography>Trong tháng vừa rồi</Typography>
                                            <Typography sx={{ fontSize: '35px', color: '#215BFF' }}>12</Typography>
                                            <Typography>Tăng 18.9% <ArrowDropUpIcon /></Typography>
                                        </Box>
                                        <Box sx={{ marginRight: 3 }}>
                                            <CircularProgressWithLabel value={80} color={'#215BFF'} />
                                        </Box>
                                    </Box>

                                </Grid2>
                                <Grid2 item size={12} sx={{ padding: 3, height: '209px', background: 'white', borderRadius: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton sx={{
                                            background: '#215BFF',
                                            color: 'white',  // Thay đổi màu icon SVG
                                            pointerEvents: 'none',
                                            borderRadius: '50px',
                                        }}>
                                            <AccountCircleIcon />
                                        </IconButton>
                                        <Typography sx={{ color: '#6D7C89', fontWeight: 600, marginLeft: 1 }}>Người dùng mới</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            <Typography>Trong tháng vừa rồi</Typography>
                                            <Typography sx={{ fontSize: '35px', color: '#215BFF' }}>12</Typography>
                                            <Typography>Tăng 18.9% <ArrowDropUpIcon /></Typography>
                                        </Box>
                                        <SsidChartIcon sx={{ fontSize: '80px', marginRight: 3 }} />
                                    </Box>
                                </Grid2>
                            </Grid2>
                            <Grid2 item size={4} sx={{
                                background: 'white',
                                borderRadius: '1rem',
                                padding: 3
                            }}>
                                <Typography sx={{ color: '#6D7C89', fontWeight: 600 }}>Những người dùng tiêu biểu</Typography>
                                <List sx={{ paddingTop: 2, paddingBottom: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    {userList.map((item) => (
                                        <ListItem sx={{ width: '100%', padding: 0, paddingRight: 3 }}>
                                            <ListItemAvatar>
                                                <Avatar alt={"Nguyễn Văn An"} sx={{ background: item.color }} />
                                            </ListItemAvatar>
                                            <ListItemText primary={item.name} secondary="TP. Hồ Chí Minh" />
                                            <Typography>{item.booking}</Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid2>
                            <Grid2 item size={4} sx={{
                                background: 'white',
                                borderRadius: '1rem',
                                padding: 3,
                            }}>
                                <PaymentMethodStats />
                            </Grid2>
                        </Grid2>
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
                            display: 'flex',
                            justifyContent: 'left'
                        }}>
                            <TextField
                                onChange={(e) => { setKeySearch(e.target.value) }}
                                autoComplete="off"
                                placeholder="Tìm kiếm"
                                variant="outlined"
                                value={keySearch}
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
                        </Box>
                        <TableContainer component={Box} sx={{ maxHeight: 'none' }}>
                            <Table stickyHeader className='owner-table' aria-label="simple table">
                                <TableHead>
                                    <TableRow className={classes.tablerowcus}>
                                        <TableCell width={'300px'}>Họ tên</TableCell>
                                        <TableCell>Ngày sinh</TableCell>
                                        <TableCell width={'600px'}>Địa chỉ</TableCell>
                                        <TableCell align='center'>Số điện thoại</TableCell>
                                        <TableCell align='center'>Giới tính</TableCell>
                                        {/* <TableCell align='center'>Trạng thái</TableCell> */}
                                        <TableCell align='center'>Xem thông tin</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users?.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { borderBottom: 0 },
                                            }}
                                            className={classes.tablerowcus}
                                        >
                                            <TableCell component="th" scope="row" sx={{ paddingTop: '10px', paddingBottom: '10px' }} >
                                                <Grid2 container alignItems='center'>
                                                    <Grid2 item>
                                                        <Avatar alt={user.fullName} src='.' className={classes.avatar} />
                                                    </Grid2>
                                                    <Grid2 sx={{ marginLeft: 2 }}>
                                                        <Typography className={classes.name}>{user.fullName}</Typography>
                                                    </Grid2>
                                                </Grid2>
                                            </TableCell>
                                            <TableCell>
                                                <Typography className={classes.name}>{formatDate(user.dateOfBirth)}</Typography>
                                            </TableCell>
                                            <TableCell className={classes.name}>{user.address}</TableCell>
                                            <TableCell align='center' className={classes.name}>
                                                {user.phoneNumber}
                                            </TableCell>
                                            <TableCell align='center' className={classes.name}>
                                                {user.gender === 0 ? 'Nam' : 'Nữ'}
                                            </TableCell>
                                            {/* <TableCell align='center'>
                                                <Typography
                                                    className={classes.status}
                                                // style={{
                                                //     background: ((user.role === 'Active' && 'rgb(119, 220, 48)') || (row.status === 'Block' && 'rgb(245, 59, 71)'))
                                                // }}
                                                >{user.role}
                                                </Typography>
                                            </TableCell> */}
                                            <TableCell align='center'>
                                                <IconButton
                                                    onClick={() => handleViewInfo(user)}
                                                    aria-label="delete" sx={{
                                                        color: 'rgb(33, 82, 255)'
                                                    }}>
                                                    <RiInformationFill />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <TablePagination className='custom-page'
                                                rowsPerPageOptions={[5, 10, 15, 25]}
                                                component="div"
                                                count={totalUsers}
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
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        )
    );
}

export default UserTable;
