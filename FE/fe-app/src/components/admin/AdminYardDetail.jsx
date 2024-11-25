import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemIcon, ListItemText, ListSubheader, MenuItem, Paper, Select, Snackbar, Step, StepLabel, Stepper, Switch, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";
import '../../styles/components/adminYardDetail.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AddressPicker from "./AddressPicker";
import CustomTextField from "../CustomTextField";
import AddYardDetailForm from "./AddYardDetailForm";
import { AddressContext, AddressProvider } from "../../context/AddressContext";
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { CiWifiOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FaCarAlt, FaMotorcycle } from "react-icons/fa";
import { IoRestaurantOutline, IoFastFood } from "react-icons/io5";
import { RiDrinks2Fill } from "react-icons/ri";
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import { useYardTypeContext, YardTypeProvider } from "../../context/YardTypeContext";
import { useUser } from "../../context/UserContext";
import { useOwner } from "../../context/OwnerContext";
import { formatNumber } from "../../utils/FormatNumber";
import { useAmenityContext } from "../../context/AmenityContext";
import Swal from "sweetalert2";
import { useYardContext } from "../../context/YardContext";
import { transferText } from "../../utils/TransferText";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ImageUploaderSlider = ({ onImagesChange, files }) => {
    const [imageFiles, setImageFiles] = useState(files || []);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        onImagesChange(imageFiles);
    }, [imageFiles]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = files.filter((file) => !imageFiles.some((existingFile) => existingFile.name === file.name));

        if (newFiles.length > 0) {
            setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else {
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleDeleteImage = (index) => {
        const updatedFiles = imageFiles.filter((_, i) => i !== index);
        setImageFiles(updatedFiles);
        onImagesChange(updatedFiles);
    };

    return (
        <div>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleCloseSnackbar} severity="warning">
                    File đã tồn tại!
                </Alert>
            </Snackbar>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} ref={fileInputRef} />
            {imageFiles.length > 0 && (
                <Slider {...settings}>
                    {imageFiles.map((file, index) => {
                        const imageUrl = URL.createObjectURL(file); // Tạo URL cho file
                        return (
                            <div className="image-container mt-3" key={index} style={{ position: 'relative' }}>
                                <img
                                    src={imageUrl}
                                    alt={`uploaded-preview-${index}`}
                                    style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                                />
                                <IconButton
                                    className="image-delete-btn"
                                    aria-label="delete"
                                    size="small"
                                    onClick={() => handleDeleteImage(index)}
                                    sx={{
                                        background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
                                        position: 'absolute',
                                        top: '25px',
                                        transform: 'translateX(10px)',
                                        color: 'white',
                                        zIndex: 10,
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        );
                    })}
                </Slider>
            )}
        </div>
    );
};


function SwitchListSecondary({ onCheckedChange, checkList }) {
    const [checked, setChecked] = React.useState(checkList || []);
    const { amenities, loadingAmenities, errorAmenities } = useAmenityContext();

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        onCheckedChange(newChecked);
    };

    const icon = [
        null,
        <CiWifiOn className='me-1 fs-4' />,
        <FaCarAlt className='me-1 fs-4' />,
        <FaMotorcycle className='me-1 fs-4' />,
        <IoRestaurantOutline className='me-1 fs-4' />,
        <RiDrinks2Fill className='me-1 fs-4' />,
        <IoFastFood className='me-1 fs-4' />
    ]

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 1 }}
            subheader={<ListSubheader><Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }}>Danh sách tiện ích</Typography></ListSubheader>}
        >
            <Grid container columnSpacing={12}>
                {amenities.map((amenity) => (
                    <Grid item xs={6} key={amenity.id}>
                        <ListItem>
                            <ListItemIcon>
                                {icon[amenity.id]}
                            </ListItemIcon>
                            <ListItemText sx={{ marginLeft: 1 }} id={amenity.id} primary={amenity.name} />
                            <Switch
                                edge="end"
                                onChange={handleToggle(amenity.id)}
                                checked={checked.includes(amenity.id)}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-wifi',
                                }}
                            />
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </List>
    );
}

const steps = [
    'Nhập thông tin sân',
    'Thêm chi tiết sân',
    'Thêm dịch vụ tiện ích'
]

export const CustomComboBox = ({ labelTitle, options, error, width, onChange, zIndex }) => {
    const [inputValue, setInputValue] = useState(''); // Sử dụng inputValue để lưu ID
    const [inputLabel, setInputLabel] = useState(''); // inputLabel để lưu label hiển thị
    const [isValid, setIsValid] = useState(null);
    const [isTouched, setIsTouched] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        const selectedOption = options.find(option => option.value === value); // Tìm option đã chọn
        setInputValue(value);  // Cập nhật giá trị ID
        setInputLabel(selectedOption ? selectedOption.label : ''); // Cập nhật label tương ứng
        setIsTouched(true);
        onChange(value, selectedOption.label);  // Gửi giá trị ID lên bên ngoài
    };

    React.useEffect(() => {
        if (isTouched) {
            setIsValid(inputValue ? true : false); // Kiểm tra hợp lệ
        }
    }, [inputValue, isTouched]);

    return (
        <div className="d-flex flex-column px-2 mt-3" style={{ width: width }}>
            <span className="mb-1 fw-bold" style={{ fontSize: '14px' }}>{labelTitle}</span>
            <FormControl variant="outlined" error={isValid === false} fullWidth>
                <Select
                    value={inputValue}  // Gán giá trị ID vào value
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(selected) => {
                        // Khi giá trị đã chọn là rỗng, hiển thị "Chọn một giá trị"
                        return selected ? inputLabel : <span style={{ color: 'gray', fontStyle: 'regular' }}>Chọn một giá trị</span>;
                    }}
                    sx={{
                        height: '40px',
                        fontSize: '15px',
                        borderRadius: '0.5rem',
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: isValid === null ? "rgb(244, 244, 244)" : (isValid ? "rgb(102, 212, 50)" : "rgb(253, 92, 112)"),
                            borderWidth: '2px',
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: isValid === null ? "rgb(244, 244, 244)" : (isValid ? "rgb(102, 212, 50)" : "rgb(253, 92, 112)"),
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: isValid === null ? "rgb(53, 202, 238)" : (isValid ? "rgb(102, 212, 50)" : "rgb(253, 92, 112)"),
                        },
                    }}
                    MenuProps={{
                        sx: { zIndex: zIndex }
                    }}
                >
                    <MenuItem value="" disabled>Chọn một giá trị</MenuItem>
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label} {/* Hiển thị tên, chứ không phải ID */}
                        </MenuItem>
                    ))}
                </Select>
                {isValid === null ? '' : (!isValid ? <span className="mt-1 fw-bold" style={{ display: 'block', color: 'rgb(253, 92, 112)', fontSize: '13px' }}>{error}</span> : '')}
            </FormControl>
        </div>
    );
};


const AdminYardDetail = ({ handleClose, handleSave }) => {
    const { createYard } = useYardContext();
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [yardDetails, setYardDetails] = useState([]);

    const { yardTypes } = useYardTypeContext() || {};
    const { ownerSelect } = useOwner() || {};

    const [formIsErrorData, setformIsErrorData] = React.useState({
        name: null,
        description: null,
        type: null,
        owner: null,
        address: null,
        amenities: null,
        images: null,
        yard_details: null,
    })

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        owner: '',
        address: '',
        amenities: [],
        images: [],
        yard_details: [],
    })

    const handleChangeAmenities = (values) => {
        setFormData((prevData) => ({
            ...prevData,
            amenities: values,
        }));
    }

    const handleChangeImages = (values) => {
        setFormData((prevData) => ({
            ...prevData,
            images: values,
        }));
    };

    const handleFieldChange = (field, value, isValid) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: isValid ? value : prevData[field], // Không xóa nếu không hợp lệ
        }));
    };

    const onChangeAddress = (newAddress) => {
        setFormData((prevData) => ({
            ...prevData,
            address: newAddress,
        }));
        if (newAddress !== '') {
            setformIsErrorData((prevData) => ({
                ...prevData,
                address: true,
            }));
        }
    };

    const isStep1Valid = () => {
        return formData.name !== '' && formData.type !== '' && formData.owner !== '' && formData.address !== '' && formData.amenities.length > 0;
    };

    const isStep2Valid = () => {
        return formData.images.length > 0;
    };

    const isStepDefaultValid = () => {
        return formData.yard_details.length > 0;
    };

    const handleNextDisabled = (step) => {
        switch (step) {
            case 0:
                return !isStep1Valid();
            case 1:
                return !isStep2Valid();
            default:
                return !isStepDefaultValid();
        }
    }

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            type: '',
            owner: '',
            address: '',
            amenities: [],
            images: [],
            yard_details: [],
        });
        setformIsErrorData({
            name: null,
            description: null,
            type: null,
            owner: null,
            address: null,
            amenities: null,
            images: null,
            yard_details: null,
        })
    }

    const handleNext = async () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prevStep) => prevStep + 1);
            return;
        }

        if (activeStep === 2) {
            const result = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn có muốn thêm sân mới này không?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
            });

            if (result.isConfirmed) {
                const dataToSend = new FormData();
                dataToSend.append('name', formData.name);
                dataToSend.append('nameTransfermed', transferText(formData.name));
                dataToSend.append('description', formData.description);
                dataToSend.append('type', formData.type);
                dataToSend.append('owner', formData.owner);
                dataToSend.append('address', formData.address);
                dataToSend.append('amenities', formData.amenities);
                dataToSend.append('yardDetails', JSON.stringify(formData.yard_details));

                formData.images.forEach((image) => {
                    dataToSend.append('images', image);
                });
                const addResult = await createYard(dataToSend);

                if (addResult.status === 'success') {
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Đã thêm sân mới thành công.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        // Reset form hoặc chuyển trang
                        alert(JSON.stringify(addResult.yard, null, 2));
                        handleSave(addResult.yard);
                        resetForm();
                    });
                } else {
                    Swal.fire({
                        title: 'Thất bại!',
                        text: addResult.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            }
        } else {
            console.log(JSON.stringify(formData, null, 2));
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevStep) => prevStep - 1);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleAddDetail = (newDetail) => {
        // Cập nhật yardDetails trước
        setYardDetails((prevDetails) => {
            const updatedDetails = [...prevDetails, newDetail];

            // Cập nhật formData với yard_details mới
            setFormData((prevData) => ({
                ...prevData,
                yard_details: updatedDetails, // Sử dụng updatedDetails
            }));

            return updatedDetails; // Trả về updatedDetails
        });
    };

    return (
        <div className='yard-detail mt-3 w-100'>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
                    <Button
                        variant="contained"
                        onClick={handleClose}>
                        Hủy
                    </Button>
                </Box>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(step => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Paper
                    sx={{
                        boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.25rem 0rem',
                        borderRadius: '1rem',
                        marginTop: 2,
                        width: '60%',
                        padding: 3,
                        marginBottom: 5
                    }}
                >
                    <h5>Thêm sân mới</h5>
                    <h6>Nhập những thông tin dưới đây</h6>
                    {activeStep === 0 && (
                        <div className='form-input d-flex flex-wrap w-100'>
                            {/* Name */}
                            <CustomTextField
                                label={'Nhập tên sân *'}
                                placeholder={'Sân bóng bàn ABC'}
                                name='name'
                                text={formData.name}
                                value={formData.name}
                                onChange={(value, isValid) => handleFieldChange('name', value, isValid)}
                                regex={/^(?!\s)([A-Za-zÀ-ỹ0-9\s]+)(?<!\s)$/}
                                error={'Vui lòng nhập'}
                                width={'100%'}
                                setValid={formIsErrorData.name}
                            />

                            {/* Description */}
                            <CustomTextField
                                label={'Nhập mô tả sân'}
                                placeholder={'Nhập mô tả'}
                                regex={/^.{0,500}$/}
                                name='description' // Thêm name
                                text={formData.description}
                                value={formData.description} // Kết nối với state
                                onChange={(value, isValid) => handleFieldChange('description', value, isValid)}
                                error={'Vui lòng nhập'}
                                width={'100%'}
                                multiline={true}
                                setValid={formIsErrorData.description}
                            />

                            {/* Select Type, Owner */}
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <CustomComboBox
                                    labelTitle={"Chọn loại sân *"}
                                    options={yardTypes ? yardTypes.map(yardType => ({ value: yardType.id, label: yardType.name })) : []}
                                    error={"Vui lòng chọn"}
                                    width={'48%'}
                                    onChange={(value) => {
                                        handleFieldChange('type', value, true)
                                    }}
                                />
                                <CustomComboBox
                                    labelTitle={"Chọn chủ sở hữu *"}
                                    options={ownerSelect ? ownerSelect.map(owner => ({ value: owner.id, label: owner.fullName })) : []}
                                    error={"Vui lòng chọn"}
                                    width={'48%'}
                                    onChange={(value) => {
                                        handleFieldChange('owner', value, true)
                                    }}
                                />
                            </Box>

                            {/* Address */}
                            <AddressProvider>
                                <AddressPicker handleChangeAddress={onChangeAddress} setValid={formIsErrorData.address} houseAddressText={formData.address.split(',')[0]} fullAddressText={formData.address} />
                            </AddressProvider>

                            {/* AmenityList */}
                            <SwitchListSecondary onCheckedChange={handleChangeAmenities} checkList={formData.amenities} />
                        </div>
                    )}
                    {activeStep === 1 && <ImageUploaderSlider onImagesChange={handleChangeImages} files={formData.images} />}
                    {activeStep === 2 && (
                        <Box>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Thêm chi tiết sân
                            </Button>
                            {/* Danh sách các chi tiết sân đã thêm */}
                            <List sx={{ marginTop: 2, width: '100%', bgcolor: 'background.paper' }}>
                                <Grid container spacing={2}>
                                    {yardDetails.map((detail, index) => (
                                        // <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                                        //     <ListItemText
                                        //         primary={`Tên sân: ${detail.name}`}
                                        //         secondary={`Khu vực: ${detail.location} - Sức chứa: ${detail.capacity}`}
                                        //     />
                                        // </ListItem>
                                        <Grid item xs={6}>
                                            <Box key={index} sx={{
                                                paddingX: 2,
                                                paddingY: 1,
                                                border: '1px solid #757A9A',
                                                borderRadius: '1rem'
                                            }}>
                                                <Box sx={{ color: '#757A9A', display: 'flex', justifyContent: 'end' }}>
                                                    <Typography sx={{ color: 'black', marginLeft: 1 }}>
                                                        <IconButton sx={{
                                                            fontSize: '14px', border: '1px solid red', color: 'red',
                                                            '&:hover': {
                                                                backgroundColor: 'red', // Màu nền khi hover
                                                                borderColor: 'red', // Màu viền khi hover
                                                                color: 'white' // Màu chữ khi hover
                                                            }
                                                        }}
                                                            onClick={
                                                                () => {
                                                                    const newYardDetails = yardDetails.filter((_, i) => i !== index); // Lọc bỏ phần tử
                                                                    setYardDetails(newYardDetails);
                                                                    setFormData((prevData) => ({
                                                                        ...prevData,
                                                                        yard_details: newYardDetails,
                                                                    }));
                                                                }
                                                            }>
                                                            <IoMdClose />
                                                        </IconButton>
                                                    </Typography>
                                                </Box>
                                                <Typography sx={{ color: '#757A9A', display: 'flex', justifyContent: 'space-between' }}>Tên sân:
                                                    <Typography sx={{ color: 'black', marginLeft: 1 }}>{detail.name}</Typography>
                                                </Typography>
                                                <Typography sx={{ color: '#757A9A', display: 'flex', justifyContent: 'space-between' }}>Khu vực
                                                    <Typography sx={{ color: 'black', marginLeft: 1 }}>{detail.location}</Typography>
                                                </Typography>
                                                <Typography sx={{ color: '#757A9A', display: 'flex', justifyContent: 'space-between' }}>
                                                    Mô tả:
                                                    <Tooltip
                                                        title={detail.description}
                                                        slotProps={{
                                                            popper: {
                                                                modifiers: [
                                                                    {
                                                                        name: 'offset',
                                                                        options: {
                                                                            offset: [0, -14],
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                color: 'black',
                                                                marginLeft: 1,
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2, // Giới hạn ở 2 dòng
                                                                WebkitBoxOrient: 'vertical',
                                                                lineHeight: '1.5em', // Đảm bảo độ cao cho mỗi dòng
                                                                maxHeight: '3em', // 1.5em * 2 dòng
                                                                maxWidth: '200px' // Tăng chiều rộng để kiểm tra hiển thị
                                                            }}
                                                        >
                                                            {detail.description}
                                                        </Typography>
                                                    </Tooltip>
                                                </Typography>
                                                <Typography sx={{ color: '#757A9A', display: 'flex', justifyContent: 'space-between' }}>Sức chứa
                                                    <Typography sx={{ color: 'black', marginLeft: 1 }}>{detail.capacity}</Typography>
                                                </Typography>
                                                <Typography sx={{ color: '#757A9A', display: 'flex', justifyContent: 'space-between' }}>Giá giờ
                                                    <Typography sx={{ color: 'black', marginLeft: 1 }}>{formatNumber(detail.price)}</Typography>
                                                </Typography>
                                                <Typography sx={{ color: '#757A9A', display: 'flex', justifyContent: 'space-between' }}>Giá giờ vàng
                                                    <Typography sx={{ color: 'black', marginLeft: 1 }}>{formatNumber(detail.pricePeak)}</Typography>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </List>
                        </Box>
                    )}
                    <div className='stepper-button mt-5 d-flex justify-content-between'>
                        <Button onClick={handleBack} disabled={activeStep === 0}>Trở về</Button>
                        <Button onClick={handleNext} disabled={handleNextDisabled(activeStep)}>Tiếp theo</Button>
                    </div>
                </Paper>
            </Box>

            <AddYardDetailForm
                open={open}
                handleClose={handleCloseDialog}
                handleAddDetail={handleAddDetail} // Chuyển hàm để thêm chi tiết
            />
        </div>
    );
};


export default AdminYardDetail;