import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "../CustomTextField";

const AddYardDetailForm = ({ open, handleClose, handleAddDetail }) => {

    const [formIsErrorData, setFormIsErrorData] = useState({
        name: null,
        location: null,
        capacity: null,
        description: null,
        price: null,
        pricePeak: null,
    })

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        capacity: '',
        description: '',
        price: '',
        pricePeak: '',
    });

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
                            value={formData.price} // Kết nối với state
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

export default AddYardDetailForm;