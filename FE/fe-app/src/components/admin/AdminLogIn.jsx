import { Box, boxClasses, Button, Checkbox, colors, Divider, FormControlLabel, Paper, Typography } from "@mui/material";
import CustomTextField from "../CustomTextField";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import '../../styles/components/adminLogin.css';
import { FaFacebook, FaTwitter } from "react-icons/fa6";

const styles = {
    backgroundImage: "url('/assets/sunset.jpg')",
};

const AdminLogIn = () => {

    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = () => {
        setIsLogin(!isLogin);
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>

            <Box sx={{
                position: 'absolute',
                top: '22%',
                left: '-15%',
                width: '600px',
                height: '600px',
                background: `url(${process.env.PUBLIC_URL}/assets/pngtreelogo.png)`,
                backgroundSize: 'cover',
                filter: 'blur(15px)'
            }}
            />
            <Box sx={{
                width: '450px',
                background: isLogin ? `url(${process.env.PUBLIC_URL}/assets/laptop.jpg)` : `url(${process.env.PUBLIC_URL}/assets/laptop2.jpg)`,
                borderRadius: '1rem',
                backgroundSize: 'cover',
                boxShadow: 'none'
            }}>
                <Paper sx={{
                    width: '100%',
                    height: '100%',
                    padding: 4,
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.922)',
                    backdropFilter: 'blur(0.1px)',
                    boxShadow: 'none',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.25rem 0rem',
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: '600' }}>
                            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                        </Typography>
                        <Link style={{ textDecoration: "none" }} component="span" href="#" underline="none" sx={{ color: 'white' }} onClick={handleLogin}>
                            <Typography component="span" sx={{ color: 'rgb(254, 128, 50)', fontSize: '14px', textDecoration: 'none !important' }}>
                                {isLogin ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
                            </Typography>
                        </Link>
                    </Box>
                    {isLogin === true && (
                        <Box>
                            <CustomTextField label={'Địa chỉ Email'} placeholder={'Nhập địa chỉ Email'} password={false} regex={/^[a-zA-Z]{3,}$/} error={'Vui lòng nhập'} width={'100%'} />
                            <CustomTextField label={'Mật khẩu'} placeholder={'******'} password={true} regex={/^[0-9]{6,}$/} error={'Vui lòng nhập'} width={'100%'} />
                            <Box sx={{
                                marginTop: 3,
                                padding: '0 5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox size="small" color="rgb(254, 128, 50)" defaultChecked />
                                    }
                                    label={<Typography sx={{ fontSize: '14px' }}>Nhớ mật khẩu</Typography>}
                                />
                                <Typography sx={{ fontSize: '14px' }}>Quên mật khẩu?</Typography>
                            </Box>
                            <Button
                                className='custom-button'
                                sx={{
                                    marginTop: 3,
                                    padding: '10px 0',
                                    background: 'linear-gradient(310deg, rgb(255, 182, 74), rgb(254, 128, 50))',
                                    width: '100%',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        background: 'linear-gradient(310deg, rgb(255, 202, 104), rgb(255, 158, 80))',
                                        boxShadow: 'none'
                                    },
                                }}
                                variant="contained"
                            >
                                Đăng nhập
                            </Button>
                            <Divider sx={{ marginTop: 3 }}>
                                <Typography sx={{ fontSize: '14px' }}>Đăng nhập với</Typography>
                            </Divider>
                            <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between' }}>
                                <Button startIcon={<FcGoogle />} sx={{
                                    width: '48%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'black',
                                    border: '1px solid rgb(186, 193, 204)',
                                    borderRadius: '0.5rem'
                                }}>Google</Button>
                                <Button startIcon={<FaFacebook style={{ color: 'rgb(8, 98, 246)' }} />} sx={{
                                    width: '48%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'black',
                                    border: '1px solid rgb(186, 193, 204)',
                                    borderRadius: '0.5rem'
                                }}>Facebook</Button>
                            </Box>
                        </Box>
                    )}
                    {isLogin === false && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <CustomTextField
                                    label={'Tên'}
                                    placeholder={'An'}
                                    password={false}
                                    regex={/^[a-zA-Z]{3,}$/}
                                    error={'Vui lòng nhập'}
                                    width={'48%'} />
                                <CustomTextField
                                    label={'Họ và tên đệm'}
                                    placeholder={'Nguyễn Văn'}
                                    password={false}
                                    regex={/^[a-zA-Z]{3,}$/}
                                    error={'Vui lòng nhập'}
                                    width={'48%'} />
                            </Box>
                            <CustomTextField
                                label={'Địa chỉ Email'}
                                placeholder={'Nhập địa chỉ Email'}
                                password={false}
                                regex={/^[a-zA-Z]{3,}$/}
                                error={'Vui lòng nhập'}
                                width={'100%'} />
                            <CustomTextField
                                label={'Địa chỉ Email'}
                                placeholder={'Nhập địa chỉ Email'}
                                password={false}
                                regex={/^[a-zA-Z]{3,}$/}
                                error={'Vui lòng nhập'}
                                width={'100%'} />
                            <CustomTextField
                                label={'Địa chỉ Email'}
                                placeholder={'Nhập địa chỉ Email'}
                                password={false}
                                regex={/^[a-zA-Z]{3,}$/}
                                error={'Vui lòng nhập'}
                                width={'100%'} />
                            <Typography sx={{ marginTop: 3, fontSize: '14px' }}>
                                Bằng cách Đăng ký, bạn đã đồng ý với
                                <Typography sx={{ color: 'rgb(254, 128, 50)', fontSize: '14px', display: 'inline' }}> Điều khoản dịch vụ </Typography> và
                                <Typography sx={{ color: 'rgb(254, 128, 50)', fontSize: '14px', display: 'inline' }}> Chính sách bảo mật </Typography> của chúng tôi
                            </Typography>
                            <Button
                                className='custom-button'
                                sx={{
                                    marginTop: 3,
                                    padding: '10px 0',
                                    background: 'linear-gradient(310deg, rgb(255, 182, 74), rgb(254, 128, 50))',
                                    width: '100%',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        background: 'linear-gradient(310deg, rgb(255, 202, 104), rgb(255, 158, 80))',
                                        boxShadow: 'none'
                                    },
                                }}
                                variant="contained"
                            >
                                Tạo tài khoản
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Box>
    )
}

export default AdminLogIn;