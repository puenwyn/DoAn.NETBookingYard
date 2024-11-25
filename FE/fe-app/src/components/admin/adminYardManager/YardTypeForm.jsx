import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import CustomTextField from "../../CustomTextField";

const YardTypeForm = ({ open, onClose, action, addYardType, id, name, updateYardType }) => {

    const handleBackForm = () => {
        if (onClose) {
            onClose(); // Gọi hàm đóng từ AdminYardManager
            resetForm();
        }
    };

    const [formIsErrorData, setFormIsErrorData] = React.useState({
        name: null,
    })

    const [formData, setFormData] = React.useState({
        name: ''
    })

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

    useEffect(() => {
        if (!onClose) {
            resetForm();
        }
    }, [onClose]);

    const resetForm = () => {
        setFormData({
            name: ''
        });
        setFormIsErrorData({
            name: null // Reset trạng thái lỗi
        });
    };

    const handleActionForm = async (action) => {
        let isValidForm = true;
        if (formData.name === '') {
            setFormIsErrorData((prevData) => ({
                ...prevData,
                name: false,
            }));
            isValidForm = false;
        }

        if (isValidForm) {
            if (action === true) {  //Thêm
                const result = await Swal.fire({
                    title: 'Xác nhận',
                    text: "Bạn có chắc chắn muốn thêm loại sân này?",
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
                    const newYardType = {
                        name: formData.name,
                        isDelete: 0
                    }
                    console.log(newYardType);
                    const addResult = await addYardType(newYardType);

                    if (addResult.status === 'success') {
                        Swal.fire({
                            title: 'Thành công!',
                            text: 'Đã thêm loại sân thành công.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            didOpen: (popup) => {
                                popup.style.zIndex = '10001';
                                const backdrop = document.querySelector('.swal2-container');
                                if (backdrop) { backdrop.style.zIndex = '10000'; }
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                onClose();
                                resetForm();
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Thất bại!',
                            text: addResult.message,
                            icon: 'error',
                            confirmButtonText: 'OK',
                        })
                    }
                }
            }
            else { //Sửa
                const result = await Swal.fire({
                    title: 'Xác nhận',
                    text: "Bạn có chắc chắn muốn sửa loại sân này?",
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
                        name: formData.name,
                        isDelete: 0
                    }
                    console.log(updatedYardType);
                    const updateResult = await updateYardType(id, updatedYardType, false);

                    if (updateResult.status === 'success') {
                        Swal.fire({
                            title: 'Thành công!',
                            text: 'Đã sửa tên loại sân thành công.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            didOpen: (popup) => {
                                popup.style.zIndex = '10001';
                                const backdrop = document.querySelector('.swal2-container');
                                if (backdrop) { backdrop.style.zIndex = '10000'; }
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                onClose();
                                resetForm();
                            }
                        });
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
        }

    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleBackForm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ zIndex: 10000 }}
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h6" sx={{
                        fontWeight: 600,
                        background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block',
                    }}>
                        Thông tin loại sân
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    {action ? (
                        <CustomTextField
                            label={'Nhập tên loại sân *'}
                            placeholder={'Nhập tên loại sân'}
                            name='name' // Thêm name
                            value={formData.name} // Kết nối với state
                            onChange={(value, isValid) => handleFieldChange('name', value, isValid)} // Gọi hàm xử lý
                            password={false}
                            regex={/^.{1,500}$/}
                            error={'Vui lòng nhập'}
                            width={'500px'}
                            setValid={formIsErrorData.name} />
                    ) : (
                        <>
                            <CustomTextField
                                text={name}
                                label="Tên hiện tại"
                                placeholder="Nhập tên sân"
                                regex={/^.{1,500}$/}
                                error="Vui lòng nhập tên hợp lệ"
                                width="500px"
                                readOnly={true}
                            // name='name' // Thêm name
                            // value={formData.name} // Kết nối với state
                            // onChange={(value, isValid) => handleFieldChange('name', value, isValid)}
                            // setValid={formIsErrorData.name}
                            />
                            <CustomTextField
                                label={'Nhập tên loại sân mới *'}
                                placeholder={'Nhập tên loại sân mới'}
                                name='name' // Thêm name
                                value={formData.name} // Kết nối với state
                                onChange={(value, isValid) => handleFieldChange('name', value, isValid)} // Gọi hàm xử lý
                                password={false}
                                regex={/^.{1,500}$/}
                                error={'Vui lòng nhập'}
                                width={'500px'}
                                setValid={formIsErrorData.name} />
                        </>
                    )}
                </DialogContent>

                <DialogActions sx={{ padding: 4 }}>
                    <Button onClick={handleBackForm}>Hủy</Button>
                    <Button
                        onClick={() => handleActionForm(action)}
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
                        {action ? 'Thêm' : 'Sửa'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default YardTypeForm;