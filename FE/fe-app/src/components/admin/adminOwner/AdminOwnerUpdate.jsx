import { Box, Button, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Switch, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "../../CustomTextField";
import { AddressProvider } from "../../../context/AddressContext";
import AddressPicker from "../AddressPicker";

const AdminOwnerUpdate = ({ onClose }) => {

    const [formIsErrorData, setformIsErrorData] = React.useState({
        firstName: null,
        lastName: null,
        username: null,
        hashedPassword: null,
        confirmPassword: null,
        fullName: null,
        dateOfBirth: null,
        address: null,
        phoneNumber: null,
        gender: null,
        isLocked: null,
    })

    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        username: '',
        hashedPassword: '',
        confirmPassword: '',
        fullName: '',
        dateOfBirth: '',
        address: '',
        phoneNumber: '',
        gender: 'male',
        isLocked: 0,
    })

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
    
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        }}>
            <Paper sx={{
                boxShadow: 'rgba(145, 158, 171, 0.3) 0px 0px 2px 0px',
                borderRadius: '1rem',
                padding: 3,
                marginBottom: 5,
                overflow: 'hidden',
                position: 'relative',
                width: '800px'
            }}>
                <Typography variant='h6' sx={{
                    fontWeight: 600,
                    background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', // Màu gradient
                    WebkitBackgroundClip: 'text', // Clip nền cho chữ
                    WebkitTextFillColor: 'transparent', // Làm màu chữ trong suốt
                    display: 'inline-block', // Đảm bảo gradient áp dụng đúng cho chữ
                }}>Thông tin chủ sân</Typography>
                <Box sx={{
                    width: '100%'
                }}>
                    <div>
                        <FormControl action='/them' sx={{
                            width: '100%'
                        }}>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <CustomTextField
                                    label={'Họ và tên đệm *'}
                                    placeholder={'Nguyễn Văn'}
                                    password={false}
                                    regex={/^(?!\s)([A-Za-zÀ-ỹ\s]+)(?<!\s)$/}
                                    width={'48%'}
                                    error={'Vui lòng nhập'}
                                    // name='fullName' // Thêm name
                                    // value={formData.fullName} // Kết nối với state
                                    // onChange={(value, isValid) => handleFieldChange('firstName', value, isValid)}
                                    // setValid={formIsErrorData.firstName}
                                />
                                <CustomTextField
                                    label={'Tên *'}
                                    placeholder={'An'}
                                    password={false}
                                    regex={/^[\w\s\u00C0-\u1EF9]*$/u}
                                    width={'48%'}
                                    error={'Vui lòng nhập'}
                                    // name='username' // Thêm name
                                    // value={formData.username} // Kết nối với state
                                    // onChange={(value, isValid) => handleFieldChange('lastName', value, isValid)} // Gọi hàm xử lý
                                    // setValid={formIsErrorData.lastName}
                                />
                            </Box>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <CustomTextField
                                    label={'Tên đăng nhập *'}
                                    placeholder={'Tên đăng nhập'}
                                    password={false}
                                    regex={/^[a-zA-Z0-9]{3,}$/}
                                    error={'Vui lòng nhập'}
                                    width={'31%'}
                                    // name='username' // Thêm name
                                    // value={formData.username} // Kết nối với state
                                    // onChange={(value, isValid) => handleFieldChange('username', value, isValid)}
                                    // setValid={formIsErrorData.username} 
                                />
                                <CustomTextField
                                    label={'Mật khẩu *'}
                                    placeholder={'******'}
                                    password={true}
                                    regex={/^.{6,}$/}
                                    error={'Vui lòng nhập'}
                                    width={'31%'}
                                    // name='hashedPassword' // Thêm name
                                    // value={formData.hashedPassword} // Kết nối với state
                                    // onChange={(value, isValid) => handleFieldChange('hashedPassword', value, isValid)}
                                    // setValid={formIsErrorData.hashedPassword} 
                                />
                                <CustomTextField
                                    label={'Xác nhận mật khẩu *'}
                                    placeholder={'******'}
                                    password={true}
                                    regex={/^.{6,}$/}
                                    confirmPassword={true}
                                    width={'31%'}
                                    // hashedPassword={formData.hashedPassword}
                                    // onChange={(value, isValid) => handleFieldChange('confirmPassword', value, isValid)}
                                    // name='confirmPassword' // Thêm name
                                    // value={formData.confirmPassword}
                                    // error={formData.confirmPassword === formData.hashedPassword ? '' : 'Mật khẩu chưa trùng khớp'}
                                    // setValid={formIsErrorData.confirmPassword} 
                                />
                            </Box>
                            <AddressProvider>
                                <AddressPicker handleChangeAddress={onChangeAddress} />
                            </AddressProvider>
                            <CustomTextField
                                label={'Ngày sinh *'}
                                placeholder={'******'}
                                type={"date"}
                                regex={/^(?:19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/}
                                error={'Vui lòng nhập'}
                                width={'31%'}
                                // name='dateOfBirth' // Thêm name
                                // value={formData.dateOfBirth} // Kết nối với state
                                // onChange={(value, isValid) => handleFieldChange('dateOfBirth', value, isValid)}
                                // setValid={formIsErrorData.dateOfBirth} 
                            />
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <CustomTextField
                                    label={'Nhập số điện thoại *'}
                                    placeholder={'+84'}
                                    password={false}
                                    regex={/^(03|08|09)\d{8}$/} // Giả sử chỉ cho phép số
                                    error={'Vui lòng nhập số điện thoại'}
                                    width={'31%'}
                                    // name='phoneNumber' // Thêm name
                                    // value={formData.phoneNumber} // Kết nối với state
                                    // onChange={(value, isValid) => handleFieldChange('phoneNumber', value, isValid)} // Gọi hàm xử lý
                                    // setValid={formIsErrorData.phoneNumber} 
                                />
                                <Box sx={{
                                    width: '31%'
                                }}>
                                    <Typography sx={{
                                        marginTop: 3,
                                        fontSize: '14px',
                                        fontWeight: 600
                                    }}>Giới tính *</Typography>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        // name="gender"
                                        // value={formData.gender} // Kết nối với state
                                        onChange={() => {}} // Gọi hàm xử lý
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                        <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                    </RadioGroup>
                                </Box>
                                <Box sx={{

                                    marginTop: 3,
                                    width: '31%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'right',
                                }}>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        fontWeight: 600
                                    }}>Khóa tài khoản *</Typography>
                                    <Switch
                                        // checked={formData.isLocked === 1} // Kết nối với state
                                        // onChange={(e) => setFormData({ ...formData, isLocked: e.target.checked ? 1 : 0 })} // Cập nhật trạng thái
                                    />
                                </Box>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'right'
                            }}>
                                <Button variant='outlined'
                                    onClick={onClose}>Hủy</Button>
                                <Button variant='contained'
                                    onClick={() => {
                                        // handleSubmit();
                                    }}
                                    sx={{
                                        marginLeft: 1
                                    }}>Xác nhận</Button>
                            </Box>
                        </FormControl>
                    </div>
                </Box>
            </Paper>
        </Box>
    )
}

export default AdminOwnerUpdate;