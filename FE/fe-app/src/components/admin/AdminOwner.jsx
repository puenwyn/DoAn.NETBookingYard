import React from 'react';
import '../../styles/components/adminOwner.css';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import CustomTextField from "../CustomTextField";
import AddressPicker from './AddressPicker';
import { AddressProvider } from '../../context/AddressContext';
import Swal from 'sweetalert2';
import { hashPassword } from '../../utils/HashPassword';

const AdminOwner = ({ setAddForm, addOwner, onClose }) => {

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

    React.useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            fullName: `${prevData.firstName} ${prevData.lastName}`
        }));
    }, [formData.firstName, formData.lastName]);


    const handleFieldChange = (field, value, isValid) => {
        if (isValid) {
            setFormData((prevData) => ({
                ...prevData,
                [field]: value,
                fullName: `${prevData.firstName} ${prevData.lastName}`, // Cập nhật fullName khi firstName hoặc lastName thay đổi
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [field]: '',
            }));
        }
    };

    const handleRadioChange = (target) => {
        const { name, value } = target; // Lấy tên và giá trị từ target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value, // Cập nhật giá trị cho gender
        }));
    };

    const handleSubmit = async () => {
        let isValidForm = true;
        if (formData.username === '') {
            setformIsErrorData((prevData) => ({
                ...prevData,
                username: false,
            }));
            isValidForm = false;
        }

        if (formData.hashedPassword === '') {
            setformIsErrorData((prevData) => ({
                ...prevData,
                hashedPassword: false,
            }));
            isValidForm = false;
        }

        if (formData.confirmPassword !== formData.hashedPassword) {
            setformIsErrorData((prevData) => ({
                ...prevData,
                confirmPassword: false,
            }));
            isValidForm = false;
        }

        if (formData.firstName === '') {
            setformIsErrorData((prevData) => ({
                ...prevData,
                firstName: false,
            }));
            isValidForm = false;
        }

        if (formData.lastName === '') {
            setformIsErrorData((prevData) => ({
                ...prevData,
                lastName: false,
            }));
            isValidForm = false;
        }

        if (formData.dateOfBirth === '') {
            setformIsErrorData((prevData) => ({
                ...prevData,
                dateOfBirth: false,
            }));
            isValidForm = false;
        }

        if (formData.phoneNumber === '') {
            setformIsErrorData((prevData) => ({
                ...prevData,
                phoneNumber: false,
            }));
            isValidForm = false;
        }

        if (formData.address === '') {
            setformIsErrorData((prevData) => ({
                ...prevData,
                address: false,
            }));
            isValidForm = false;
        }

        if (isValidForm) {
            const result = await Swal.fire({
                title: 'Xác nhận',
                text: "Bạn có chắc chắn muốn thêm chủ sân này?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
            });

            if (result.isConfirmed) {
                const newOwner = {
                    username: formData.username,
                    hashedPassword: await hashPassword(formData.hashedPassword),
                    fullName: formData.fullName,
                    dateOfBirth: formData.dateOfBirth,
                    address: formData.address,
                    phoneNumber: formData.phoneNumber,
                    gender: formData.gender === 'male' ? 0 : 1,
                    isLocked: formData.isLocked,
                }
                console.log(newOwner);
                const addResult = await addOwner(newOwner);

                if (addResult.status === 'success') {
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Đã thêm chủ sân thành công.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setAddForm(false);
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
    }


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
            height: '100%'
        }}>
            <Paper sx={{
                boxShadow: 'rgba(145, 158, 171, 0.3) 0px 0px 2px 0px',
                borderRadius: '1rem',
                padding: 2,
                marginBottom: 5,
                overflow: 'hidden',
                position: 'relative'
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
                    <div className='col-8'>
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
                                    name='fullName' // Thêm name
                                    value={formData.fullName} // Kết nối với state
                                    onChange={(value, isValid) => handleFieldChange('firstName', value, isValid)}
                                    password={false}
                                    regex={/^(?!\s)([A-Za-zÀ-ỹ\s]+)(?<!\s)$/}
                                    error={'Vui lòng nhập'}
                                    width={'48%'}
                                    setValid={formIsErrorData.firstName} />
                                <CustomTextField
                                    label={'Tên *'}
                                    placeholder={'An'}
                                    name='username' // Thêm name
                                    value={formData.username} // Kết nối với state
                                    onChange={(value, isValid) => handleFieldChange('lastName', value, isValid)} // Gọi hàm xử lý
                                    password={false}
                                    regex={/^[\w\s\u00C0-\u1EF9]*$/u}
                                    error={'Vui lòng nhập'}
                                    width={'48%'}
                                    setValid={formIsErrorData.lastName} />
                            </Box>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <CustomTextField
                                    label={'Tên đăng nhập *'}
                                    placeholder={'Tên đăng nhập'}
                                    name='username' // Thêm name
                                    value={formData.username} // Kết nối với state
                                    onChange={(value, isValid) => handleFieldChange('username', value, isValid)}
                                    password={false}
                                    regex={/^[a-zA-Z0-9]{3,}$/}
                                    error={'Vui lòng nhập'}
                                    width={'31%'}
                                    setValid={formIsErrorData.username} />
                                <CustomTextField
                                    label={'Mật khẩu *'}
                                    placeholder={'******'}
                                    name='hashedPassword' // Thêm name
                                    value={formData.hashedPassword} // Kết nối với state
                                    onChange={(value, isValid) => handleFieldChange('hashedPassword', value, isValid)}
                                    password={true}
                                    regex={/^.{6,}$/}
                                    error={'Vui lòng nhập'}
                                    width={'31%'}
                                    setValid={formIsErrorData.hashedPassword} />
                                <CustomTextField
                                    label={'Xác nhận mật khẩu *'}
                                    placeholder={'******'}
                                    name='confirmPassword' // Thêm name
                                    value={formData.confirmPassword}
                                    password={true}
                                    regex={/^.{6,}$/}
                                    confirmPassword={true}
                                    hashedPassword={formData.hashedPassword}
                                    onChange={(value, isValid) => handleFieldChange('confirmPassword', value, isValid)}
                                    error={formData.confirmPassword === formData.hashedPassword ? '' : 'Mật khẩu chưa trùng khớp'}
                                    width={'31%'}
                                    setValid={formIsErrorData.confirmPassword} />
                            </Box>
                            <AddressProvider>
                                <AddressPicker handleChangeAddress={onChangeAddress} setValid={formIsErrorData.address} />
                            </AddressProvider>
                            <CustomTextField
                                label={'Ngày sinh *'}
                                placeholder={'******'}
                                name='dateOfBirth' // Thêm name
                                value={formData.dateOfBirth} // Kết nối với state
                                type={"date"}
                                regex={/^(?:19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/}
                                onChange={(value, isValid) => handleFieldChange('dateOfBirth', value, isValid)}
                                error={'Vui lòng nhập'}
                                width={'31%'}
                                setValid={formIsErrorData.dateOfBirth} />
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <CustomTextField
                                    label={'Nhập số điện thoại *'}
                                    placeholder={'+84'}
                                    name='phoneNumber' // Thêm name
                                    value={formData.phoneNumber} // Kết nối với state
                                    onChange={(value, isValid) => handleFieldChange('phoneNumber', value, isValid)} // Gọi hàm xử lý
                                    password={false}
                                    regex={/^(03|08|09)\d{8}$/} // Giả sử chỉ cho phép số
                                    error={'Vui lòng nhập số điện thoại'}
                                    width={'31%'}
                                    setValid={formIsErrorData.phoneNumber} />
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
                                        name="gender"
                                        value={formData.gender} // Kết nối với state
                                        onChange={(e) => handleRadioChange(e.target)} // Gọi hàm xử lý
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
                                        checked={formData.isLocked === 1} // Kết nối với state
                                        onChange={(e) => setFormData({ ...formData, isLocked: e.target.checked ? 1 : 0 })} // Cập nhật trạng thái
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
                                        handleSubmit();
                                    }}
                                    sx={{
                                        marginLeft: 1
                                    }}>Xác nhận</Button>
                            </Box>
                        </FormControl>
                    </div>
                </Box>
                <Box sx={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    background: `url(${process.env.PUBLIC_URL}/assets/reacticon.png)`,
                    backgroundSize: 'cover',
                    filter: 'blur(5px)',
                    right: '-2%',
                    bottom: '-5%',
                    transform: 'rotate(10deg)'
                }} />
            </Paper>
        </Box>
    )
}

export default AdminOwner;