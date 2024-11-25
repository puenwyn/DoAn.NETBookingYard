import React from 'react';
import '../../styles/components/adminOwner.css';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import CustomTextField from "../CustomTextField";
import AddressPicker from './AddressPicker';

const AdminOwner = () => {
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
                                    password={false}
                                    regex={/^[a-zA-Z]{3,}$/}
                                    error={'Vui lòng nhập'}
                                    width={'48%'} />
                                <CustomTextField
                                    label={'Tên *'}
                                    placeholder={'An'}
                                    password={false}
                                    regex={/^[a-zA-Z]{3,}$/}
                                    error={'Vui lòng nhập'}
                                    width={'48%'} />
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
                                    regex={/^[a-zA-Z]{3,}$/}
                                    error={'Vui lòng nhập'}
                                    width={'31%'} />
                                <CustomTextField
                                    label={'Mật khẩu *'}
                                    placeholder={'******'}
                                    password={true}
                                    regex={/^[a-zA-Z]{3,}$/}
                                    error={'Vui lòng nhập'}
                                    width={'31%'} />
                                <CustomTextField
                                    label={'Xác nhận mật khẩu *'}
                                    placeholder={'******'}
                                    password={true}
                                    regex={/^[a-zA-Z]{3,}$/}
                                    error={'Mật khẩu chưa trùng khớp'}
                                    width={'31%'} />
                            </Box>
                            <AddressPicker />
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <CustomTextField
                                    label={'Nhập số điện thoại *'}
                                    placeholder={'+84'}
                                    password={false}
                                    regex={/^[a-zA-Z]{3,}$/}
                                    error={'Mật khẩu chưa trùng khớp'}
                                    width={'31%'} />
                                <Box sx={{
                                    width: '31%'
                                }}>
                                    <Typography sx={{
                                        marginTop: 3,
                                        fontSize: '14px',
                                        fontWeight: 400
                                    }}>Giới tính *</Typography>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="male" control={<Radio />} label="Nữ" />
                                    </RadioGroup>
                                </Box>
                                <Box sx={{

                                    marginTop: 3,
                                    width: '31%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'right'
                                }}>
                                    <Typography sx={{
                                        fontSize: '14px',
                                        fontWeight: 400
                                    }}>Tình trạng *</Typography>
                                    <Switch defaultChecked />
                                </Box>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'right'
                            }}>
                                <Button variant='contained' sx={{
                                    background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
                                    color: 'white'
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