import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { act, useEffect, useState } from "react"; // Nhập useState
import { IoIosSearch } from "react-icons/io";
import { RiInformationFill } from "react-icons/ri";
import { VoucherContext } from "../../context/VoucherContext";
import { formatDate } from "../../utils/FormatDate";
import CustomTextField from "../CustomTextField";
import { CustomComboBox } from "./AdminYardDetail";

const AddVoucherForm = ({ open, handleClose, action }) => {

    const [validStartDate, setValidStartDate] = useState('');
    const [validEndDate, setValidEndDate] = useState('');

    const [formIsErrorData, setFormIsErrorData] = useState({
        name: null,
        type: null,
        discount: null,
        startDate: null,
        endDate: null,
    });

    const [formData, setFormData] = useState({
        name: '',
        type: 'percent',
        discount: '',
        startDate: '',
        endDate: '',
    });

    const handleFieldChange = (field, value, isValid) => {
        // Cập nhật giá trị trường
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
        const today = new Date();
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        // Kiểm tra ngày bắt đầu
        if (!formData.startDate) {
            setValidStartDate('Vui lòng chọn ngày bắt đầu');
            setFormIsErrorData((prevData) => ({ ...prevData, startDate: false }));
        } else if (startDate <= today) {
            setValidStartDate('Vui lòng chọn ngày bắt đầu lớn hơn ngày hiện tại');
            setFormIsErrorData((prevData) => ({ ...prevData, startDate: false }));
        } else {
            setValidStartDate('');
            setFormIsErrorData((prevData) => ({ ...prevData, startDate: true }));
        }

        // Kiểm tra ngày kết thúc
        if (!formData.endDate) {
            setValidEndDate('Vui lòng chọn ngày kết thúc');
            setFormIsErrorData((prevData) => ({ ...prevData, endDate: false }));
        } else if (endDate <= startDate) {
            setValidEndDate('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
            setFormIsErrorData((prevData) => ({ ...prevData, endDate: false }));
        } else {
            setValidEndDate('');
            setFormIsErrorData((prevData) => ({ ...prevData, endDate: true }));
        }
    }, [formData.startDate, formData.endDate]);

    const handleSubmit = () => {
        let isValidForm = true;

        if (!formData.name) {
            setFormIsErrorData((prevData) => ({ ...prevData, name: false }));
            isValidForm = false;
        } else {
            setFormIsErrorData((prevData) => ({ ...prevData, name: true }));
        }

        if (!formData.type) {
            setFormIsErrorData((prevData) => ({ ...prevData, type: false }));
            isValidForm = false;
        } else {
            setFormIsErrorData((prevData) => ({ ...prevData, type: true }));
        }

        if (!formData.discount) {
            setFormIsErrorData((prevData) => ({ ...prevData, discount: false }));
            isValidForm = false;
        } else {
            setFormIsErrorData((prevData) => ({ ...prevData, discount: true }));
        }

        const today = new Date();
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        // Kiểm tra ngày bắt đầu
        if (!formData.startDate) {
            setFormIsErrorData((prevData) => ({ ...prevData, startDate: false }));
            setValidStartDate('Vui lòng chọn ngày bắt đầu');
            isValidForm = false;
        } else if (startDate <= today) {
            setFormIsErrorData((prevData) => ({ ...prevData, startDate: false }));
            setValidStartDate('Vui lòng chọn ngày bắt đầu lớn hơn ngày hiện tại');
            isValidForm = false;
        } else {
            setFormIsErrorData((prevData) => ({ ...prevData, startDate: true }));
        }

        // Kiểm tra ngày kết thúc
        if (!formData.endDate) {
            setFormIsErrorData((prevData) => ({ ...prevData, endDate: false }));
            setValidEndDate('Vui lòng chọn ngày kết thúc');
            isValidForm = false;
        } else if (endDate <= startDate) {
            setFormIsErrorData((prevData) => ({ ...prevData, endDate: false }));
            setValidEndDate('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
            isValidForm = false;
        } else {
            setFormIsErrorData((prevData) => ({ ...prevData, endDate: true }));
        }

        alert(isValidForm); // Kiểm tra tính hợp lệ của form
        if (isValidForm) {
            alert(JSON.stringify())
            resetForm(); // Gọi hàm reset form
        }
    }

    const handleRadioChange = (target) => {
        const { name, value } = target; // Lấy tên và giá trị từ target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value, // Cập nhật giá trị cho loại
        }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            type: 'percent',
            discount: '',
            startDate: '',
            endDate: ''
        });
        setFormIsErrorData({
            name: null,
            type: null,
            discount: null,
            startDate: null,
            endDate: null
        });
        setValidStartDate('');
        setValidEndDate('');
    }

    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open]);

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
                        {action === true ? 'Thêm phiếu giảm giá' : 'Chỉnh sửa phiếu giảm giá'}
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <CustomTextField
                        label="Nhập tên giảm giá"
                        placeholder="Nhập tên giảm giá *"
                        regex={/^.{1,500}$/}
                        error="Vui lòng nhập tên hợp lệ"
                        width="500px"
                        name='name'
                        value={formData.name}
                        onChange={(value, isValue) => handleFieldChange('name', value, isValue)}
                        setValid={formIsErrorData.name}
                    />

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Box sx={{
                            width: '245px',
                            paddingLeft: 1
                        }}>
                            <Typography sx={{
                                marginTop: 3,
                                fontSize: '14px',
                                fontWeight: 600
                            }}>Giới tính *</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="type"
                                value={formData.type} // Kết nối với state
                                onChange={(e) => handleRadioChange(e.target)} // Gọi hàm xử lý
                            >
                                <FormControlLabel value="percent" control={<Radio />} label="%" />
                                <FormControlLabel value="vnd" control={<Radio />} label="VNĐ" />
                            </RadioGroup>
                        </Box>
                        <CustomTextField
                            label="Nhập số tiền (%) được giảm giá *"
                            placeholder="Nhập số tiền hoặc số % giảm giá"
                            regex={/^.{1,500}$/}
                            error="Vui lòng nhập tên hợp lệ"
                            width="245px"
                            name='discount'
                            value={formData.discount}
                            onChange={(value, isValid) => handleFieldChange('discount', value, isValid)}
                            setValid={formIsErrorData.discount}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <CustomTextField
                            label={'Chọn ngày bắt đầu *'}
                            placeholder={'******'}
                            type={"date"}
                            regex={/^(?:19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/}
                            name='startDate'
                            value={formData.startDate}
                            onChange={(value, isValid) => handleFieldChange('startDate', value, isValid)}
                            setValid={formIsErrorData.startDate}
                            error={validStartDate}
                            width={'245px'} />
                        <CustomTextField
                            label={'Chọn ngày kết thúc *'}
                            placeholder={'******'}
                            type={"date"}
                            regex={/^(?:19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/}
                            name='endDate'
                            value={formData.endDate}
                            onChange={(value, isValid) => handleFieldChange('endDate', value, isValid)}
                            setValid={formIsErrorData.endDate}
                            error={validEndDate}
                            width={'245px'} />
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

const AdminVoucherTable = () => {
    const { vouchers, loading, error } = React.useContext(VoucherContext);
    const [action, setAction] = useState(null);
    const [openAddVoucherForm, setOpenAddVoucherForm] = useState(false);

    const handleOpenAddVoucher = (action) => {
        setOpenAddVoucherForm(true);
        setAction(action);
    }

    const handleBackAddVoucher = () => {
        setOpenAddVoucherForm(false);
    }

    if (loading) {
        return <CircularProgress />;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box sx={{ padding: 3, width: '100%' }}>
            <Box sx={{
                padding: 3,
                width: '100%',
                background: 'white',
                borderRadius: '1rem'
            }}>
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
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{ boxShadow: 'none' }}
                        onClick={() => handleOpenAddVoucher(true)} // Open the AddVoucherForm
                    >
                        Thêm
                    </Button>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tên Giảm Giá</TableCell>
                                <TableCell align="center">Loại Giảm Giá</TableCell>
                                <TableCell align="center">Giảm Giá</TableCell>
                                <TableCell align="center">Ngày Bắt Đầu</TableCell>
                                <TableCell align="center">Ngày Kết Thúc</TableCell>
                                <TableCell align="center">Tùy chọn</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vouchers?.map((voucher) => (
                                <TableRow key={voucher.id}>
                                    <TableCell>{voucher.id}</TableCell>
                                    <TableCell>{voucher.name}</TableCell>
                                    <TableCell align="center">{voucher.type}</TableCell>
                                    <TableCell align="center">{voucher.discount}</TableCell>
                                    <TableCell align="center">{formatDate(voucher.startDate)}</TableCell>
                                    <TableCell align="center">{formatDate(voucher.endDate)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            aria-label="delete"
                                            sx={{
                                                color: 'rgb(33, 82, 255)'
                                            }}
                                            onClick={() => handleOpenAddVoucher(false)}
                                        >
                                            <RiInformationFill />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Render AddVoucherForm dialog */}
                <AddVoucherForm open={openAddVoucherForm} handleClose={handleBackAddVoucher} action={action} />
            </Box>
        </Box>
    )
}

export default AdminVoucherTable;
