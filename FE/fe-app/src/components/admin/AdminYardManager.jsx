import React, { useState, useEffect, useRef, useContext } from "react";
import '../../styles/components/adminYardManager.css';
import Paper from '@mui/material/Paper';
import { Box, Button, CircularProgress, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Grid2, Grow, Icon, IconButton, InputAdornment, LinearProgress, MenuItem, MenuList, Popper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography, styled } from "@mui/material";
import { YardTypeContext, YardTypeProvider } from "../../context/YardTypeContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAdd, IoIosSearch } from "react-icons/io";
import { FaTrophy } from "react-icons/fa6";
import { useYardAdmin } from "../../context/YardAdminContext";
import { OwnerProvider } from "../../context/OwnerContext";
import { AmenityProvider } from "../../context/AmenityContext";
import { YardProvider } from "../../context/YardContext";
import CollapsibleTable from "./adminYardManager/YardDetailTable";
import YardTypeForm from "./adminYardManager/YardTypeForm";
import AdminYardDetail from "./AdminYardDetail";
import AdminYardView from "./AdminYardView";
import Swal from 'sweetalert2';
import { makeStyles } from '@mui/styles';
import { DoughnutChart2 } from "./DoughnutChart";
import { BarChart } from "./BarChart";

const useStyles = makeStyles((theme) => ({
    tablerowcus: {
        border: 'none',
        '& td, & th': { // Áp dụng cho tất cả các ô
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
        },
        borderBottom: '1px solid rgb(229, 234, 239)'
    },
}));

const ProgressStats = ({ title, value, color }) => {
    return (
        <>
            <Typography>{title}</Typography>
            <Box sx={{
                width: '100%',
                height: '20px',
                display: 'flex',
                alignItems: 'center',

            }}>
                <LinearProgress
                    variant="determinate"
                    value={value}
                    sx={{
                        width: '80%',
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 5, // Bo góc bên phải khi đạt 100%
                            background: color
                        }
                    }} />
                <Typography sx={{ width: '20%', textAlign: 'center' }}>{value}%</Typography>
            </Box>
        </>
    )
}

const AdminYardOverview = () => {

    const dataset = [
        { label: 'Sân 1', stat: 10 },
        { label: 'Sân 2', stat: 7 },
        { label: 'Sân 3', stat: 5 },
        { label: 'Sân 4', stat: 2 },
        { label: 'Sân 5', stat: 8 },
    ]

    const dataset2 = [
        { label: 'Red', stat: 31 },
        { label: 'Blue', stat: 28 },
        { label: 'Yellow', stat: 6 },
        { label: 'Green', stat: 9 },
        { label: 'Orange', stat: 7 },
        { label: 'Purple', stat: 11 },
    ]
    

    return (
        <Box sx={{ width: '100%' }}>
            <Grid2 container sx={{ width: '100%', height: '100%' }}>
                <Grid2 item container spacing={3} sx={{ width: '100%', height: '250px' }}>
                    <Grid2 item size={6}
                        sx={{
                            background: 'white',
                            borderRadius: '1rem',
                            padding: 3,
                            boxShadow: '4px 4px 16px rgba(0, 0, 0, .05)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    sx={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '8px',
                                        background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        '&:hover': {
                                            backgroundColor: 'rgba(58, 65, 111, 0.2)', // Màu nền khi hover
                                        },
                                        pointerEvents: 'none',
                                        color: 'white',
                                        boxShadow: 'none'
                                    }}
                                >{<FaTrophy style={{ fontSize: '16px' }} />}</IconButton>
                                <Typography sx={{ marginLeft: 1, color: '#6D7C89', fontWeight: 600 }}>Tổng số sân</Typography>
                            </Box>
                            <Typography variant='h4' sx={{
                                fontWeight: 600,
                                background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', // Màu gradient
                                WebkitBackgroundClip: 'text', // Clip nền cho chữ
                                WebkitTextFillColor: 'transparent', // Làm màu chữ trong suốt
                                display: 'inline-block', // Đảm bảo gradient áp dụng đúng cho chữ
                            }}>100</Typography>
                        </Box>
                        <ProgressStats title={"Số sân hoạt động"} value={80} color={'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))'} />
                        <ProgressStats title={"Số sân bị khóa"} value={20} color={'linear-gradient(310deg, rgba(255, 0, 0, 1), rgba(255, 100, 100, 1))'} />
                    </Grid2>
                    <Grid2 item size={6} sx={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: 3,
                        boxShadow: '4px 4px 16px rgba(0, 0, 0, .05)',
                    }}>
                        <Typography sx={{ color: '#6D7C89', fontWeight: 600 }}>Loại sân được đặt nhiều nhất</Typography>
                        <Box sx={{
                            marginTop: 3, display: 'flex', justifyContent: 'space-around'
                        }}>
                            <DoughnutChart2 dataset={dataset2} full={false} />
                        </Box>
                    </Grid2>
                </Grid2>
                <Grid2 item container sx={{
                    background: 'white',
                    borderRadius: '1rem',
                    padding: 3,
                    boxShadow: '4px 4px 16px rgba(0, 0, 0, .05)',
                    marginTop: 3,
                    width: '100%',
                    height: '226px'
                }}>
                    <Typography sx={{ marginLeft: 1, color: '#6D7C89', fontWeight: 600 }}>Sân được đặt nhiều nhất</Typography>
                    <Box sx={{ width: '100%', paddingBottom: 3 }}>
                        <BarChart dataset={dataset} horizontal={true} />
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    )
}

const AdminYardManager = () => {

    const [open, setOpen] = useState(false);
    const [selectedYard, setSelectedYard] = React.useState(null);
    const anchorRef = useRef(null);
    const [openRowId, setOpenRowId] = useState(null); // ID của dòng đang mở Popper
    const [anchorEl, setAnchorEl] = useState(null);
    const [isAddForm, setIsAddForm] = useState(false);
    const [isUpdateForm, setIsUpdateForm] = useState(false);
    const [isOpenYardType, setIsOpenYardType] = useState(false);
    const [action, setAction] = useState(true);
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);
    const classes = useStyles();

    const { yards, totalPage, page, setPage, rowsPerPage, setRowsPerPage, totalYard, setRefresh } = useYardAdmin();

    const handleToggle = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setOpenRowId((prevRowId) => (prevRowId === rowId ? null : rowId)); // Đóng nếu đã mở, mở nếu chưa
    };

    const handleClickAway = (event) => {
        // Đóng Popper khi bấm ra ngoài mà không thực hiện hành động "Sửa" hoặc "Xóa"
        if (anchorEl && !anchorEl.contains(event.target)) {
            setAnchorEl(null);
            setOpenRowId(null);
        }
    };

    const handleClose = async (event, id, name, isUpdate) => {
        if (anchorEl && anchorEl.contains(event.target)) {
            return;
        }
        setAnchorEl(null);
        setOpenRowId(null);
        if (isUpdate) {
            handleSetOpenYardType(false);
            setId(id);
            setName(name);
        } else {
            const result = await Swal.fire({
                title: 'Xác nhận',
                text: "Bạn có chắc chắn muốn xóa loại sân này?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
                didOpen: (popup) => {
                    popup.style.zIndex = '10001';
                    const backdrop = document.querySelector('.swal2-container');
                    if (backdrop) { backdrop.style.zIndex = '10000'; }
                }
            });
            if (result.isConfirmed) {
                const updatedYardType = {
                    id: id,
                    name: name,
                    isDelete: 1
                }
                console.log(updatedYardType);
                const updateResult = await updateYardType(id, updatedYardType, true);

                if (updateResult.status === 'success') {
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Đã xóa loại sân thành công.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        didOpen: (popup) => {
                            popup.style.zIndex = '10001';
                            const backdrop = document.querySelector('.swal2-container');
                            if (backdrop) { backdrop.style.zIndex = '10000'; }
                        }
                    })
                } else {
                    Swal.fire({
                        title: 'Thất bại!',
                        text: updateResult.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        didOpen: (popup) => {
                            popup.style.zIndex = '10001';
                            const backdrop = document.querySelector('.swal2-container');
                            if (backdrop) { backdrop.style.zIndex = '10000'; }
                        }
                    })
                }
            }
        }
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab' || event.key === 'Escape') {
            event.preventDefault();
            setAnchorEl(null);
            setOpenRowId(null);
        }
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleSetAddForm = () => {
        setIsAddForm(true);
    }

    const handleSetBackAddForm = () => {
        setIsAddForm(false);
    }

    const handleSetUpdateForm = () => {
        setIsUpdateForm(true);
    }

    const handleSetBackUpdateForm = () => {
        setIsUpdateForm(false);
    }

    const handleSetSaveAddForm = () => {
        setIsAddForm(false);
        setRefresh(prev => !prev);
    }

    const handleSetOpenYardType = (action) => {
        setIsOpenYardType((prev) => !prev);
        setAction(action);
    }

    const handleCloseYardTypeForm = () => {
        setIsOpenYardType(false);
    };

    const handleIconClick = (yard) => {
        setIsUpdateForm(true);
        alert(yard);
        setSelectedYard(yard); // Lưu thông tin sân được nhấn
    };


    const { yardTypes, loading, error, addYardType, updateYardType } = useContext(YardTypeContext);
    if (loading) {
        return <CircularProgress />
    }
    // if (error) {
    //     return <div>Error: {error}</div>
    // }

    return (
        <>
            {
                isAddForm ? (
                    <YardTypeProvider>
                        <OwnerProvider>
                            <AmenityProvider>
                                <YardProvider>
                                    <AdminYardDetail handleClose={handleSetBackAddForm} handleSave={handleSetSaveAddForm} />
                                </YardProvider>
                            </AmenityProvider>
                        </OwnerProvider>
                    </YardTypeProvider>
                ) : isUpdateForm ? (<AdminYardView close={handleSetBackUpdateForm} />) : (
                    <Box sx={{
                        width: '100%', padding: 3
                    }}>
                        <Box>
                            <Grid2 container sx={{ width: '100%' }} spacing={3}>
                                <Grid2 item size={7}>
                                    <AdminYardOverview />
                                </Grid2>
                                <Grid2 item size={5}>
                                    <Box sx={{
                                        background: 'white',
                                        borderRadius: '1rem',
                                        padding: 3,
                                        height: '500px',
                                        overflowY: 'auto',
                                        boxShadow: '4px 4px 16px rgba(0, 0, 0, .05)'
                                    }}>
                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#637381' }}>
                                                Danh sách loại sân
                                            </Typography>
                                            <IconButton
                                                onClick={() => handleSetOpenYardType(true)}
                                                sx={{ marginBottom: 2 }}>
                                                <IoIosAdd />

                                            </IconButton>
                                        </Box>
                                        <TableContainer>
                                            <Table aria-label="collapsible table">
                                                <TableHead>
                                                    <TableRow sx={{ background: '#F4F6F8', color: '#637381' }} className={classes.tablerowcus}>
                                                        <TableCell>Tên loại sân</TableCell>
                                                        <TableCell align="center">Tình trạng</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {yardTypes.map((row) => (
                                                        <TableRow key={row.id} className={classes.tablerowcus}>
                                                            <TableCell sx={{ paddingTop: '10px', paddingBottom: '10px' }}>{row.name}</TableCell>
                                                            <TableCell align="center"><IconButton
                                                                id="composition-button"
                                                                aria-controls={openRowId === row.id ? 'composition-menu' : undefined}
                                                                aria-haspopup="true"
                                                                onClick={(event) => handleToggle(event, row.id)}
                                                                sx={{ fontSize: '16px', paddingTop: '6px', paddingBottom: '6px' }}>
                                                                <BsThreeDotsVertical />
                                                            </IconButton>
                                                                <Popper
                                                                    open={openRowId === row.id}
                                                                    anchorEl={anchorEl}
                                                                    role={undefined}
                                                                    placement="bottom-start"
                                                                    transition
                                                                    disablePortal
                                                                    sx={{ zIndex: 100 }}
                                                                >
                                                                    {({ TransitionProps, placement }) => (
                                                                        <Grow
                                                                            {...TransitionProps}
                                                                            style={{
                                                                                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                                                                            }}
                                                                        >
                                                                            <Paper>
                                                                                <ClickAwayListener onClickAway={handleClickAway}>
                                                                                    <MenuList
                                                                                        autoFocusItem={openRowId === row.id}
                                                                                        id="composition-menu"
                                                                                        aria-labelledby="composition-button"
                                                                                        onKeyDown={handleListKeyDown}
                                                                                    >
                                                                                        <MenuItem onClick={(e) => handleClose(e, row.id, row.name, true)}>Sửa</MenuItem>
                                                                                        <MenuItem onClick={(e) => handleClose(e, row.id, row.name, false)}>Xóa</MenuItem>
                                                                                    </MenuList>
                                                                                </ClickAwayListener>
                                                                            </Paper>
                                                                        </Grow>
                                                                    )}
                                                                </Popper></TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Grid2>
                            </Grid2>
                            <Box sx={{
                                padding: 3,
                                background: 'white',
                                borderRadius: '1rem',
                                marginTop: 3,
                                boxShadow: '4px 4px 16px rgba(0, 0, 0, .05)'
                            }}>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#637381' }}>
                                    Danh sách sân
                                </Typography>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
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
                                        onClick={handleSetAddForm}
                                        variant="contained"
                                        sx={{ marginBottom: 2 }}>Thêm sân</Button>
                                </Box>
                                <CollapsibleTable
                                    yards={yards}
                                    page={page}
                                    setPage={setPage}
                                    rowsPerPage={rowsPerPage}
                                    setRowsPerPage={setRowsPerPage}
                                    totalYard={totalYard}
                                    onClick={handleIconClick}
                                />
                            </Box>
                        </Box>


                        <YardTypeForm open={isOpenYardType} onClose={handleCloseYardTypeForm} action={action} addYardType={addYardType} id={id} name={name} updateYardType={updateYardType} />
                    </Box>
                )
            }
        </>
    )
}

export default AdminYardManager;