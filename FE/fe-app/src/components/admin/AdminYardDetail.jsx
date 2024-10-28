import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";
import '../../styles/components/adminYardDetail.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AddressPicker from "./AddressPicker";
import CustomTextField from "../CustomTextField";
import AddYardDetailForm from "./AddYardDetailForm";

const ImageUploaderSlider = () => {
    const [images, setImages] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => prevImages.concat(imageUrls));
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
            />
            {images.length > 0 && (
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={image}
                                alt={`uploaded-preview-${index}`}
                                style={{ width: '100%', height: '400px', backgroundSize: 'cover' }}
                            />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

const steps = [
    'Nhập thông tin sân',
    'Thêm chi tiết sân',
    'Thêm dịch vụ tiện ích'
]

// const CustomTextField = ({ label, placeholder, password, regex, error, width }) => {
//     const [inputValue, setInputValue] = useState('');
//     const [isValid, setIsValid] = useState(null);

//     const handleChange = (e) => {
//         const value = e.target.value;
//         setInputValue(value);

//         if (regex.test(value)) {
//             setIsValid(true);
//         } else {
//             setIsValid(false);
//         }
//     }

//     return (
//         <div className="d-flex flex-column px-2 mt-3" style={{ width: width }}>
//             <span className="mb-1 fw-bold" style={{ fontSize: '14px' }}>{label}</span>
//             <TextField
//                 endAdo
//                 placeholder={placeholder}
//                 value={inputValue}
//                 onChange={handleChange}
//                 variant="outlined"
//                 type={!password ? 'text' : 'password'}
//                 InputProps={{
//                     sx: {
//                         padding: 0,
//                         height: '40px',
//                         fontSize: '15px'
//                     },
//                     endAdornment: (
//                         <InputAdornment position="end">
//                             {isValid === null ? null : ( // Nếu chưa kiểm tra thì không hiện icon
//                                 isValid ? (
//                                     <FaCheck style={{ color: 'rgb(102, 212, 50)', marginRight: '8px' }} /> // Icon màu xanh cho đúng
//                                 ) : (
//                                     <MdOutlineErrorOutline style={{ color: 'rgb(253, 92, 112)', marginRight: '8px' }} /> // Icon màu đỏ cho sai
//                                 )
//                             )}
//                         </InputAdornment>
//                     )
//                 }}
//                 sx={{
//                     "& .MuiOutlinedInput-root": {
//                         "& fieldset": {
//                             borderColor: isValid === null ? "rgb(186, 193, 204)" : (isValid ? "rgb(102, 212, 50)" : "rgb(253, 92, 112)"), // Nếu hợp lệ thì xanh, ngược lại đỏ
//                             borderWidth: '2px',
//                         },
//                         "&:hover fieldset": {
//                             borderColor: isValid === null ? "rgb(186, 193, 204)" : (isValid ? "rgb(102, 212, 50)" : "rgb(253, 92, 112)"), // Màu viền khi hover
//                         },
//                         "&.Mui-focused fieldset": {
//                             borderColor: isValid === null ? "rgb(53, 202, 238)" : (isValid ? "rgb(102, 212, 50)" : "rgb(253, 92, 112)"), // Màu viền khi focus
//                             boxShadow: isValid === null ? "0 0 3px rgba(53, 202, 238, 0.9)" : (isValid ? "0 0 3px rgba(102, 212, 50, 0.9)" : "0 0 3px rgba(253, 92, 112, 0.9)"), // Box shadow theo điều kiện
//                             borderWidth: '2px',
//                         },
//                         borderRadius: '0.5rem'
//                     },
//                 }}
//             />
//             {isValid === null ? '' : (!isValid ? <span className="mt-1 fw-bold" style={{ display: 'block', color: 'rgb(253, 92, 112)', fontSize: '13px' }}>{error}</span> : '')}
//         </div>
//     )
// }

export const CustomComboBox = ({ labelTitle, options, error, width }) => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    }

    return (
        <div className="d-flex flex-column mt-3" style={{ width: width }}>
            <span className="mb-1 fw-bold" style={{ fontSize: '14px' }}>{labelTitle}</span>
            <FormControl variant="outlined" error={isValid === false} fullWidth>
                <Select
                    value={inputValue}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(selected) => selected ? selected : <span style={{ color: 'gray', fontStyle: 'regular' }}>Chọn một giá trị</span>}
                    sx={{
                        height: '40px',
                        fontSize: '15px',
                        borderRadius: '0.5rem', // Border radius
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
                >
                    <MenuItem value="" disabled>Chọn một giá trị</MenuItem>
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))}
                </Select>
                {isValid === null ? '' : (!isValid ? <span className="mt-1 fw-bold" style={{ display: 'block', color: 'rgb(253, 92, 112)', fontSize: '13px' }}>{error}</span> : '')}
            </FormControl>
        </div>
    );
}

const AdminYardDetail = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [yardDetails, setYardDetails] = useState([]);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
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
        setYardDetails((prevDetails) => [...prevDetails, newDetail]); // Cập nhật danh sách chi tiết sân
    };

    return (
        <div className='yard-detail mt-3 w-100'>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    <form>
                        {activeStep === 0 && (
                            <div className='form-input d-flex flex-wrap'>
                                <CustomTextField 
                                    label="Nhập email" 
                                    placeholder="Nhập email" 
                                    password={true} 
                                    regex={/^[a-zA-Z]{3,}$/} 
                                    error="Vui lòng nhập đúng định dạng" 
                                    width="50%" 
                                />
                                <CustomComboBox 
                                    labelTitle="Chọn một món ăn" 
                                    options={['Pizza', 'Burgers', 'Sushi', 'Salad']} 
                                    error="Vui lòng chọn một món ăn" 
                                    width="50%" 
                                />
                            </div>
                        )}
                        {activeStep === 1 && <ImageUploaderSlider />}
                        {activeStep === 2 && (
                            <Box>
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Thêm chi tiết sân
                                </Button>
                                {/* Danh sách các chi tiết sân đã thêm */}
                                <List sx={{ marginTop: 2, width: '100%', bgcolor: 'background.paper' }}>
                                    {yardDetails.map((detail, index) => (
                                        <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                                            <ListItemText
                                                primary={`Tên sân: ${detail.name}`}
                                                secondary={`Khu vực: ${detail.area} - Sức chứa: ${detail.capacity}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </form>
                    <div className='stepper-button mt-5 d-flex justify-content-between'>
                        <Button onClick={handleBack} disabled={activeStep === 0}>Back</Button>
                        <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>Next</Button>
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