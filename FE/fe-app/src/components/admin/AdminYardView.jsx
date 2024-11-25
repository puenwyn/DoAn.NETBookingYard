import { Box, Button, Dialog, Grid2, IconButton, ImageList, ImageListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import React, { useState } from "react";
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddYardDetailForm from "./AddYardDetailForm";
import LockIcon from '@mui/icons-material/Lock';
import CustomTextField from "../CustomTextField";

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

const itemData = [
    {
        img: `${process.env.PUBLIC_URL}/assets/sunset.jpg`,
        title: 'Breakfast',
    },
    {
        img: `${process.env.PUBLIC_URL}/assets/village.jpg`,
        title: 'Burger',
    },
    {
        img: `${process.env.PUBLIC_URL}/assets/waterfall.jpg`,
        title: 'Camera',
    },
    {
        img: `${process.env.PUBLIC_URL}/assets/plain.jpg`,
        title: 'Coffee',
    },
];

const StandardImageList = () => {
    const [images, setImages] = useState(itemData); // Danh sách ảnh
    const [selectedImage, setSelectedImage] = useState(null); // Ảnh được chọn để hiển thị trong Dialog
    const [dialogOpen, setDialogOpen] = useState(false); // Trạng thái Dialog

    const handleAddImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newImage = {
                img: URL.createObjectURL(file), // Tạo URL từ file
                title: file.name,
            };
            setImages((prevImages) => [...prevImages, newImage]); // Thêm ảnh vào danh sách
        }
    };

    const handleDeleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Xóa ảnh
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
                        key={item.img}
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
                            src={item.img} // Đảm bảo lấy trực tiếp img URL từ item
                            alt={item.title}
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover', // Đảm bảo ảnh không bị méo
                                cursor: 'pointer',
                            }}
                            onClick={() => handleClickOpen(item.img)} // Mở Dialog khi click vào ảnh
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
                            onClick={() => handleDeleteImage(index)}
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
                        src={selectedImage} // Đảm bảo hiển thị ảnh đúng trong Dialog
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

const yardInfo = [
    { label: 'Tên sân', value: 'Sân bóng bàn ABC' },
    { label: 'Loại sân', value: 'Sân bóng chuyền' },
    { label: 'Địa chỉ', value: '273 An Dương Vương, Phường 3, Quận 5, TP. HCM' },
    { label: 'Mô tả', value: 'Sân này đẹp rộng thoáng mát Sân này đẹp rộng thoáng mát Sân này đẹp rộng thoáng mát Sân này đẹp rộng thoáng mát Sân này đẹp rộng thoáng mát' }
]

const AdminYardView = ({ close }) => {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(true);
    const [openYardDetail, setOpenYardDetail] = useState(false);
    const classes = useStyles();

    const data = [
        {
            id: 1,
            tenSan: 'Sân A',
            khu: 'Khu 1',
            moTa: 'Sân cỏ nhân tạo',
            sucChua: 10,
            gia: '100,000 VND',
            giaGioVang: '150,000 VND'
        },
        {
            id: 2,
            tenSan: 'Sân A',
            khu: 'Khu 1',
            moTa: 'Sân cỏ nhân tạo',
            sucChua: 10,
            gia: '100,000 VND',
            giaGioVang: '150,000 VND'
        },
        {
            id: 3,
            tenSan: 'Sân A',
            khu: 'Khu 1',
            moTa: 'Sân cỏ nhân tạo',
            sucChua: 10,
            gia: '100,000 VND',
            giaGioVang: '150,000 VND'
        },
    ];

    const handleEditChange = () => {
        setEdit(!edit);
    }

    const handleOpenYardDetail = () => {
        setOpenYardDetail(true);
    }

    const setBackYardDetail = () => {
        setOpenYardDetail(false);
    }

    return (
        <Box sx={{ width: '100%', height: '100%', padding: 3 }}>
            <AddYardDetailForm open={openYardDetail} handleClose={setBackYardDetail} />
            <Box sx={{ width: '100%', height: '250px', background: 'red', borderRadius: '1rem' }}>

            </Box>
            <Box sx={{ width: '100%', height: '400px', marginTop: 3 }}>
                <Grid2 container spacing={3}>
                    <Grid2 item size={4} sx={{ background: 'white', padding: 3, borderRadius: '1rem' }}>
                        <Typography sx={{ color: '#6D7C89', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>Danh sách ảnh</Typography>
                        <StandardImageList open={open} setOpen={setOpen} />
                    </Grid2>
                    <Grid2 item size={8} sx={{ background: 'white', padding: 3, borderRadius: '1rem' }}>
                        <Typography sx={{ color: '#6D7C89', fontWeight: 600, textTransform: 'uppercase' }}>Thông tin tổng quan</Typography>
                        <Box sx={{ width: '100%' }}>
                            {yardInfo.map((info) => (
                                <InfoViewEdit title={info.label} textfield={info.value} readOnly={edit} />
                            ))}
                        </Box>
                        <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => {
                            alert(edit);
                            handleEditChange();
                        }}>Sửa</Button>
                    </Grid2>
                </Grid2>
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
                            {data.map((yard, index) => (
                                <TableRow key={index} className={classes.tableFont}>
                                    <TableCell className={classes.tablecell}>{yard.tenSan}</TableCell>
                                    <TableCell>{yard.khu}</TableCell>
                                    <TableCell className={classes.tablecell}>{yard.moTa}</TableCell>
                                    <TableCell>{yard.sucChua}</TableCell>
                                    <TableCell>{yard.gia}</TableCell>
                                    <TableCell>{yard.giaGioVang}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={handleOpenYardDetail}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton onClick={() => { alert(yard.id) }}>
                                            <LockIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'right', marginBottom: 3 }}>
                    <Button variant="outlined" onClick={close}>Thoát</Button>
                    <Button sx={{ marginLeft: 1 }} variant="contained">Lưu</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminYardView;