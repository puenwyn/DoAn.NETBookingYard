import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, ImageList, ImageListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LockIcon from '@mui/icons-material/Lock';
import CustomTextField from "../CustomTextField";
import { formatNumber } from "../../utils/FormatNumber";
import { useYardDetailContext } from "../../context/YardDetailContext";
import Swal from "sweetalert2";
import { useYardImageContext } from "../../context/YardImageContext";

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
    }
}));

const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const length = bytes.byteLength;
    for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary); // Chuyển đổi thành base64
};

const StandardImageList = ({ open, setOpen, itemData, yardId }) => {
    const [images, setImages] = useState(itemData); // Danh sách ảnh
    const [selectedImage, setSelectedImage] = useState(null); // Ảnh được chọn để hiển thị trong Dialog
    const [dialogOpen, setDialogOpen] = useState(false); // Trạng thái Dialog
    const { createYardImage, deleteYardImage } = useYardImageContext();

    const handleAddImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const byteArray = new Uint8Array(reader.result);
                const base64String = arrayBufferToBase64(byteArray);
                const newImage = {
                    imageURL: base64String,
                    yardId: yardId
                };
                try {
                    const addResult = await createYardImage(newImage);
                    setImages((prevImages) => [...prevImages, addResult]);
                } catch (e) { }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleDeleteImage = async (id, length) => {
        if (length === 1) {
            Swal.fire({
                title: 'Không thể xóa!',
                text: `Cần giữ lại ít nhất là 1 hình`,
                icon: 'warning',
                confirmButtonText: 'OK',
                didOpen: (popup) => {
                    popup.style.zIndex = '10001';
                    const backdrop = document.querySelector('.swal2-container');
                    if (backdrop) { backdrop.style.zIndex = '10000'; }
                }
            });
        } else {
            try {
                const data = await deleteYardImage(id);
                setImages((prevImages) => prevImages.filter((image) => image.id !== id));
            } catch (e) { }
        }
    };

    const handleClickOpen = (image) => {
        setSelectedImage(image);
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setSelectedImage(null);
    };

    return (
        <>
            <ImageList
                sx={{
                    width: '100%',
                    maxHeight: 316,
                }}
                cols={3}
                rowHeight={100}
                gap={8} // Điều chỉnh khoảng cách giữa các phần tử
            >
                {images.map((item, index) => (
                    <ImageListItem
                        key={item.id}
                        sx={{
                            position: 'relative',
                            borderRadius: '0.5rem',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 100, // Đảm bảo chiều cao cố định cho mỗi item
                        }}
                    >
                        {/* Hình ảnh */}
                        <img
                            src={`data:image/png;base64,${item.imageURL}`} // Đảm bảo lấy trực tiếp img URL từ item
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover', // Đảm bảo ảnh không bị méo
                                cursor: 'pointer',
                            }}
                            onClick={() => handleClickOpen(item.imageURL)} // Mở Dialog khi click vào ảnh
                        />

                        {/* Nút Xóa */}
                        <IconButton
                            aria-label="delete"
                            size="small"
                            className="delete-icon"
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                                '&:hover .delete-icon': { opacity: 1 },
                                '&:hover': { opacity: 1 }, // Khi hover, hiển thị nút xóa
                            }}
                            onClick={() => handleDeleteImage(item.id, images.length)}
                        >
                            <DeleteIcon fontSize="small" color="#000000" />
                        </IconButton>
                    </ImageListItem>
                ))}

                {/* Ô Thêm ảnh */}
                <ImageListItem
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f0f0f0',
                        cursor: 'pointer',
                        borderRadius: '0.5rem',
                        height: 100,
                    }}
                >
                    <label htmlFor="add-image-input" style={{ textAlign: 'center', cursor: 'pointer' }}>
                        <AddPhotoAlternateIcon sx={{ fontSize: 40, color: '#9e9e9e' }} />
                    </label>
                    <input
                        id="add-image-input"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleAddImage}
                    />
                </ImageListItem>
            </ImageList>

            {/* Dialog hiển thị ảnh lớn */}
            {selectedImage && (
                <Dialog
                    open={dialogOpen}
                    onClose={handleClose}
                    maxWidth="md"
                    sx={{
                        zIndex: 10000,
                        position: 'fixed',
                        top: 0,
                        left: 0,
                    }}
                    BackdropProps={{
                        style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={`data:image/png;base64,${selectedImage}`} // Đảm bảo hiển thị ảnh đúng trong Dialog
                        alt="Selected"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Dialog>
            )}
        </>
    );
};



const InfoViewEdit = ({ title, textfield, readOnly }) => {

    const [value, setValue] = useState(textfield);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 3
        }}>
            <Typography sx={{
                width: '100px'
            }}>
                {title}
            </Typography>
            <TextField
                fullWidth
                label={title}
                multiline={title === 'Mô tả' || false}
                rows={title === 'Mô tả' ? 4 : 1}
                value={value}
                InputProps={{
                    readOnly: readOnly ? true : false,
                    sx: {
                        paddingY: title === 'Mô tả' ? '10px' : 0,
                        height: title === 'Mô tả' ? "auto" : "45px",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "red", // Màu border bình thường
                            borderWidth: "2px", // Độ dày border bình thường
                        },
                        "&:hover fieldset": {
                            borderColor: "darkblue", // Màu border khi hover
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "green", // Màu border khi focus
                            borderWidth: "2px", // Độ dày border khi focus (nếu muốn tùy chỉnh thêm)
                        },
                    },
                }}
                onChange={handleChange}
                variant="outlined"
            />
        </Box>
    )
}

const AdminYardView = ({ close, yardOke }) => {
    const [yard, setYard] = useState(yardOke);
    const { updateYardDetailLocked, updateYardDetail, addYardDetail } = useYardDetailContext();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(true);
    const [openYardDetail, setOpenYardDetail] = useState(false);
    const classes = useStyles();
    const [yardDetailSelect, setYardDetailSelect] = useState(null);

    const handleEditChange = () => {
        setEdit(!edit);
    }

    const handleOpenYardDetail = (id) => {
        if (id == null) {
            const yardDetail = {
                id: '',
                yardId: yard.id,
                name: '',
                location: '',
                capacity: '',
                description: '',
                price: '',
                pricePeak: '',
                isDelete: 0
            };
            setYardDetailSelect(yardDetail);
        } else {
            const yardDetailTmp = yard.yardDetails.find(yardDetail => yardDetail.id === id);
            const yardDetail = {
                id: id,
                yardId: yard.id,
                name: yardDetailTmp.name,
                location: yardDetailTmp.location,
                capacity: yardDetailTmp.capacity,
                description: yardDetailTmp.description,
                price: yardDetailTmp.price,
                pricePeak: yardDetailTmp.pricePeak,
                isDelete: yardDetailTmp.isDelete
            };
            setYardDetailSelect(yardDetail)
        }
        setOpenYardDetail(true);
    }

    const handleAddDetail = (newDetail) => {
        if (newDetail.id === '') {
            const data = {
                yardId: newDetail.yardId,
                name: newDetail.name,
                location: newDetail.location,
                capacity: newDetail.capacity,
                description: newDetail.description,
                price: newDetail.price,
                pricePeak: newDetail.pricePeak,
                isDelete: newDetail.isDelete
            }
            Swal.fire({
                title: 'Xác nhận',
                text: `Bạn có muốn thêm chi tiết sân: ${data.name} không?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Có, thêm chi tiết sân',
                cancelButtonText: 'Hủy',
                didOpen: (popup) => {
                    popup.style.zIndex = '10001';
                    const backdrop = document.querySelector('.swal2-container');
                    if (backdrop) { backdrop.style.zIndex = '10000'; }
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const addResult = await addYardDetail(data);
                        if (addResult) {
                            Swal.fire({
                                title: 'Thành công!',
                                text: `Chi tiết sân ${data.name} đã được thêm thành công.`,
                                icon: 'success',
                                confirmButtonText: 'OK',
                                didOpen: (popup) => {
                                    popup.style.zIndex = '10001';
                                    const backdrop = document.querySelector('.swal2-container');
                                    if (backdrop) { backdrop.style.zIndex = '10000'; }
                                }
                            }).then(() => {
                                setYard((prevDetails) => {
                                    return {
                                        ...prevDetails,
                                        yardDetails: prevDetails.yardDetails.concat(newDetail)
                                    }
                                });
                            });
                        } else {
                            Swal.fire({
                                title: 'Thất bại!',
                                text: `Không thể thêm chi tiết sân. Lỗi: ${addResult.message}`,
                                icon: 'error',
                                confirmButtonText: 'OK',
                                didOpen: (popup) => {
                                    popup.style.zIndex = '10001';
                                    const backdrop = document.querySelector('.swal2-container');
                                    if (backdrop) { backdrop.style.zIndex = '10000'; }
                                }
                            });
                        }
                    } catch (error) {
                        Swal.fire({
                            title: 'Thất bại!',
                            text: `Đã có lỗi khi thêm chi tiết sân. Lỗi: ${error.message}`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                            didOpen: (popup) => {
                                popup.style.zIndex = '10001';
                                const backdrop = document.querySelector('.swal2-container');
                                if (backdrop) { backdrop.style.zIndex = '10000'; }
                            }
                        });
                    }
                }
            });
        } else {
            const data = {
                yardId: newDetail.yardId,
                name: newDetail.name,
                location: newDetail.location,
                capacity: newDetail.capacity,
                description: newDetail.description,
                price: newDetail.price,
                pricePeak: newDetail.pricePeak,
                isDelete: newDetail.isDelete
            }
            Swal.fire({
                title: 'Xác nhận',
                text: `Bạn có muốn cập nhật chi tiết sân này không?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Có, cập nhật chi tiết sân',
                cancelButtonText: 'Hủy',
                didOpen: (popup) => {
                    popup.style.zIndex = '10001';
                    const backdrop = document.querySelector('.swal2-container');
                    if (backdrop) { backdrop.style.zIndex = '10000'; }
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const addResult = await updateYardDetail(newDetail.id, data);
                        if (addResult) {
                            Swal.fire({
                                title: 'Thành công!',
                                text: `Chi tiết sân đã được cập nhật thành công.`,
                                icon: 'success',
                                confirmButtonText: 'OK',
                                didOpen: (popup) => {
                                    popup.style.zIndex = '10001';
                                    const backdrop = document.querySelector('.swal2-container');
                                    if (backdrop) { backdrop.style.zIndex = '10000'; }
                                }
                            }).then(() => {
                                setYard((prevDetails) => {
                                    return {
                                        ...prevDetails,
                                        yardDetails: prevDetails.yardDetails.map(yardDetail =>
                                            yardDetail.id === newDetail.id ? newDetail : yardDetail
                                        )
                                    }
                                });
                            });
                        } else {
                            Swal.fire({
                                title: 'Thất bại!',
                                text: `Không thể cập nhật chi tiết sân. Lỗi: ${addResult.message}`,
                                icon: 'error',
                                confirmButtonText: 'OK',
                                didOpen: (popup) => {
                                    popup.style.zIndex = '10001';
                                    const backdrop = document.querySelector('.swal2-container');
                                    if (backdrop) { backdrop.style.zIndex = '10000'; }
                                }
                            });
                        }
                    } catch (error) {
                        Swal.fire({
                            title: 'Thất bại!',
                            text: `Đã có lỗi khi cập nhật chi tiết sân. Lỗi: ${error.message}`,
                            icon: 'error',
                            confirmButtonText: 'OK',
                            didOpen: (popup) => {
                                popup.style.zIndex = '10001';
                                const backdrop = document.querySelector('.swal2-container');
                                if (backdrop) { backdrop.style.zIndex = '10000'; }
                            }
                        });
                    }
                }
            });
        }
    };

    const setBackYardDetail = () => {
        setOpenYardDetail(false);
    }

    const handleLock = (id, isLocked) => {
        Swal.fire({
            title: 'Xác nhận',
            text: `Bạn có chắc chắn muốn ${isLocked === 1 ? 'mở' : ''} khóa chi tiết sân này không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Có, ${isLocked === 1 ? 'mở' : ''} khóa chi tiết sân này`,
            cancelButtonText: 'Hủy',
            didOpen: (popup) => {
                popup.style.zIndex = '10001';
                const backdrop = document.querySelector('.swal2-container');
                if (backdrop) { backdrop.style.zIndex = '10001'; }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const lockResult = await updateYardDetailLocked(id);
                if (lockResult) {
                    Swal.fire({
                        title: 'Thành công!',
                        text: `Chi tiết sân này đã được ${isLocked === 1 ? 'mở' : ''} khóa thành công.`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                        didOpen: (popup) => {
                            popup.style.zIndex = '10001';
                            const backdrop = document.querySelector('.swal2-container');
                            if (backdrop) { backdrop.style.zIndex = '10001'; }
                        }
                    }).then(() => {
                        setYard((prevDetails) => {
                            // Kiểm tra xem prevDetails và prevDetails.yardDetails có tồn tại không
                            if (prevDetails && prevDetails.yardDetails) {
                                return {
                                    ...prevDetails, // Giữ lại các thuộc tính khác của yard
                                    yardDetails: prevDetails.yardDetails.map(yardDetail =>
                                        yardDetail.id === lockResult.id ? lockResult : yardDetail
                                    )
                                };
                            }
                            return prevDetails; // Trả về giá trị cũ nếu không có yardDetails
                        });
                    });
                } else {
                    Swal.fire({
                        title: 'Thất bại!',
                        text: lockResult.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        didOpen: (popup) => {
                            popup.style.zIndex = '10001';
                            const backdrop = document.querySelector('.swal2-container');
                            if (backdrop) { backdrop.style.zIndex = '10001'; }
                        }
                    });
                }
            }
        });
    }

    return (
        <Box sx={{ width: '100%', height: '100%', padding: 3 }}>
            <AddYardDetailForm open={openYardDetail} handleClose={setBackYardDetail} handleAddDetail={handleAddDetail} yardDetail={yardDetailSelect} />
            <Box sx={{ display: 'flex', justifyContent: 'left', marginBottom: 3 }}>
                <Button variant="outlined" onClick={close}>Trở về</Button>
            </Box>
            <Box sx={{ width: '100%', marginTop: 3 }}>
                <Grid2 container spacing={3}>
                    <Grid2 item size={4} sx={{ background: 'white', padding: 3, borderRadius: '1rem' }}>
                        <Typography sx={{ color: '#6D7C89', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>Danh sách ảnh</Typography>
                        <StandardImageList open={open} setOpen={setOpen} itemData={yard.images} yardId={yard.id} />
                    </Grid2>
                    <Grid2 item size={8} sx={{ background: 'white', padding: 3, borderRadius: '1rem' }}>
                        <Typography sx={{ color: '#6D7C89', fontWeight: 600, textTransform: 'uppercase' }}>Thông tin tổng quan</Typography>
                        <Box sx={{ width: '100%' }}>
                            <InfoViewEdit title={"Tên sân"} textfield={yard.name} readOnly={edit} />
                            <InfoViewEdit title={"Chủ sân"} textfield={yard.owner.fullName} readOnly={true} />
                            <InfoViewEdit title={"Loại sân"} textfield={yard.yardType.name} readOnly={true} />
                            <InfoViewEdit title={"Địa chỉ"} textfield={yard.address} readOnly={edit} />
                            <InfoViewEdit title={"Mô tả"} textfield={yard.description} readOnly={edit} />
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            {edit ? (
                                <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => {
                                    handleEditChange();
                                }}>Sửa</Button>
                            ) : (
                                <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => {
                                    handleEditChange();
                                }}>Cập nhật</Button>
                            )}
                        </Box>
                    </Grid2>
                </Grid2>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                    <Button variant="contained" onClick={() => { handleOpenYardDetail(null) }}>Thêm chi tiết sân</Button>
                </Box>
                <TableContainer sx={{
                    borderRadius: '16px',
                    boxShadow: '4px 4px 16px rgba(0, 0, 0, .05)',
                    marginTop: 3,
                    background: 'white'
                }}>
                    <Table aria-label="yard table">
                        <TableHead sx={{ background: '#F4F6F8' }}>
                            <TableRow>
                                <TableCell>Tên sân</TableCell>
                                <TableCell>Khu</TableCell>
                                <TableCell>Mô tả</TableCell>
                                <TableCell>Sức chứa</TableCell>
                                <TableCell>Giá</TableCell>
                                <TableCell>Giá giờ vàng</TableCell>
                                <TableCell align="center">Tùy chọn</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {yard.yardDetails.map((yard) => (
                                <TableRow key={yard.id} className={classes.tableFont}>
                                    <TableCell className={classes.tablecell}>{yard.name}</TableCell>
                                    <TableCell>{yard.location}</TableCell>
                                    <TableCell className={classes.tablecell}>{yard.description}</TableCell>
                                    <TableCell textAlign='right'>{formatNumber(yard.capacity)}</TableCell>
                                    <TableCell textAlign='right'>{formatNumber(yard.price)} VNĐ</TableCell>
                                    <TableCell textAlign='right'>{formatNumber(yard.pricePeak)} VNĐ</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => { handleOpenYardDetail(yard.id) }}>
                                            <VisibilityIcon sx={{
                                                color: 'rgb(0,0,0)'
                                            }} />
                                        </IconButton>
                                        <IconButton onClick={() => { handleLock(yard.id, yard.isDelete) }}>
                                            <LockIcon
                                                sx={{
                                                    color: `${yard.isDelete === 0 ? 'rgb(0, 0, 0)' : 'rgb(245, 59, 71)'}`
                                                }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

const AddYardDetailForm = ({ open, handleClose, handleAddDetail, yardDetail }) => {

    const [formIsErrorData, setFormIsErrorData] = useState({
        name: null,
        location: null,
        capacity: null,
        description: null,
        price: null,
        pricePeak: null,
    })

    const [formData, setFormData] = useState({
        id: '',
        yardId: '',
        name: '',
        location: '',
        capacity: '',
        description: '',
        price: '',
        pricePeak: '',
        isDelete: ''
    });

    useEffect(() => {
        if (yardDetail != null) {
            setFormData({
                id: yardDetail.id,
                yardId: yardDetail.yardId,
                name: yardDetail.name,
                location: yardDetail.location,
                capacity: yardDetail.capacity,
                description: yardDetail.description,
                price: yardDetail.price,
                pricePeak: yardDetail.pricePeak,
                isDelete: yardDetail.isDelete
            });
        }
    }, [yardDetail]);

    const handleFieldChange = (field, value, isValid) => {
        if (isValid) {
            setFormData((prevData) => ({
                ...prevData,
                [field]: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [field]: '',
            }));
        }
    };

    const handleSubmit = () => {
        let isValidForm = true;
        if (formData.name === '') {
            setFormIsErrorData((prevData) => ({
                ...prevData,
                name: false,
            }));
            isValidForm = false;
        }

        if (formData.location === '') {
            setFormIsErrorData((prevData) => ({
                ...prevData,
                location: false,
            }));
            isValidForm = false;
        }

        if (formData.capacity === '') {
            setFormIsErrorData((prevData) => ({
                ...prevData,
                capacity: false,
            }));
            isValidForm = false;
        }

        if (formData.price === '') {
            setFormIsErrorData((prevData) => ({
                ...prevData,
                price: false,
            }));
            isValidForm = false;
        }

        if (formData.pricePeak === '') {
            setFormIsErrorData((prevData) => ({
                ...prevData,
                pricePeak: false,
            }));
            isValidForm = false;
        }

        if (isValidForm) {
            handleAddDetail(formData);
            resetForm();
            handleClose();
        }
    };

    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open]);

    const resetForm = () => {
        setFormData({
            name: '',
            location: '',
            capacity: '',
            description: '',
            price: '',
            pricePeak: '',
        });
        setFormIsErrorData({
            name: null,
            location: null,
            capacity: null,
            description: null,
            price: null,
            pricePeak: null,
        });
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    zIndex: 10000
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h6" sx={{
                        fontWeight: 600,
                        background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block',
                    }}>
                        Thêm thông tin chi tiết sân
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <CustomTextField
                        label="Nhập tên sân"
                        placeholder="Nhập tên sân"
                        regex={/^.{1,500}$/}
                        error="Vui lòng nhập tên hợp lệ"
                        width="500px"
                        name='name' // Thêm name
                        text={formData.name}
                        value={formData.name} // Kết nối với state
                        onChange={(value, isValid) => handleFieldChange('name', value, isValid)}
                        setValid={formIsErrorData.name}
                    />

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <CustomTextField
                            label="Nhập khu vực"
                            placeholder="Nhập khu vực"
                            regex={/^.{1,500}$/}
                            error="Vui lòng nhập khu vực hợp lệ"
                            width="245px"
                            name='location' // Thêm name
                            text={formData.location}
                            value={formData.location} // Kết nối với state
                            onChange={(value, isValid) => handleFieldChange('location', value, isValid)}
                            setValid={formIsErrorData.location}
                        />
                        <CustomTextField
                            label="Nhập sức chứa"
                            placeholder="Nhập sức chứa"
                            regex={/^\d+$/}
                            error="Vui lòng nhập số lượng hợp lệ"
                            width="245px"
                            name='capacity' // Thêm name
                            text={formData.capacity}
                            value={formData.capacity} // Kết nối với state
                            onChange={(value, isValid) => handleFieldChange('capacity', value, isValid)}
                            setValid={formIsErrorData.capacity}
                        />
                    </Box>

                    <CustomTextField
                        label="Ghi chú"
                        placeholder="Nhập ghi chú"
                        regex={/^.{0,500}$/}
                        multiline={true}
                        error="Ghi chú không được quá 500 ký tự"
                        width="500px"
                        name='description' // Thêm name
                        text={formData.description}
                        value={formData.description} // Kết nối với state
                        onChange={(value, isValid) => handleFieldChange('description', value, isValid)}
                    />

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <CustomTextField
                            label="Giá"
                            placeholder="Nhập giá"
                            regex={/^\d+(\.\d{1,2})?$/}
                            error="Vui lòng nhập giá hợp lệ"
                            width="245px"
                            name='price' // Thêm name
                            value={formData.price}
                            text={formData.price} // Kết nối với state
                            onChange={(value, isValid) => handleFieldChange('price', value, isValid)}
                            setValid={formIsErrorData.price}
                        />
                        <CustomTextField
                            label="Giá cao điểm"
                            placeholder="Nhập giá cao điểm"
                            regex={/^\d+(\.\d{1,2})?$/}
                            error="Vui lòng nhập giá hợp lệ"
                            width="245px"
                            name='pricePeak' // Thêm name
                            text={formData.pricePeak}
                            value={formData.pricePeak} // Kết nối với state
                            onChange={(value, isValid) => handleFieldChange('pricePeak', value, isValid)}
                            setValid={formIsErrorData.pricePeak}
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ padding: 4 }}>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
                            color: 'white',
                            boxShadow: 'none',
                            '&:hover': {
                                boxShadow: 'none'
                            },
                        }}
                    >
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default AdminYardView;