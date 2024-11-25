import { Avatar, Box, Button, Divider, Grid2, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { formatDate } from "../../utils/FormatDate";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const UserInfoDetail = ({ title, info, update }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(info);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Box sx={{
            width: '100%',
            minHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 2
        }}>
            <Box sx={{
                width: '120px'
            }}>
                <Typography sx={{
                    fontWeight: 500
                }}>{title}</Typography>
            </Box>
            <TextField
                sx={{
                    width: 'calc(100% - 180px)',  // adjust width to accommodate the button
                    color: update ? 'rgb(33, 87, 255)' : ''
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                InputProps={{
                    readOnly: !isEditing,
                }}
                variant="outlined"
                size="small"
            />
            <Button onClick={handleEditClick} sx={{ marginLeft: 1 }}>
                {isEditing ? 'Save' : 'Edit'}
            </Button>
        </Box>
    );
};

const AdminUserDetail = ({ user, onClose }) => {
    const defaultUser = {
        fullName: "David Adam",
        role: "Manager",
        birthDate: "02-10-2000",
        gender: "Nam",
        phone: "0987654321",
        address: "273 An Dương Vương, phường 4, quận 5, Thành phố Hồ Chí Minh",
        email: "nguyenvanA@gmail.com",
        account: "hihihaha",
        status: "Active"
    };

    const userInfo = user || defaultUser;

    const userList = [
        { name: 'Nguyễn Văn An', booking: 19, color: '#BEE9FF' },
        { name: 'Trần Văn Bình', booking: 17, color: '#D0F0B8' },
        { name: 'Phan Văn Cường', booking: 16, color: '#FFEAB8' },
        { name: 'Huỳnh Gia Hưng', booking: 10, color: '#FFCDCE' },
        { name: 'Võ Văn Tài', booking: 7, color: '#E0CFFE' }
    ];

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            padding: 3,
            marginBottom: 3
        }}>
            {/* Header with background and avatar */}
            <Box sx={{
                width: '100%',
                height: '250px',
                borderRadius: '1rem',
                background: 'white',
                position: 'relative'
            }}>
                <Box sx={{
                    width: '100%',
                    height: '150px',
                    background: `linear-gradient(310deg, rgba(33, 82, 255, 0.6), rgba(33, 212, 253, 0.6)) 50% center / cover, 
                    url(${process.env.PUBLIC_URL}/assets/laptop.jpg) transparent`,
                    borderTopLeftRadius: '1rem',
                    borderTopRightRadius: '1rem',
                    backgroundSize: 'cover',
                    backdropFilter: 'saturate(200%) blur(30px)',
                }}>
                    {user ? (
                        "xin chào"
                    ) : null}

                </Box>
                <Box sx={{
                    width: '100%',
                    height: '100px',
                    paddingLeft: '180px',
                    paddingY: 2
                }}>
                    <Typography variant="h5">{userInfo.fullName}</Typography>
                    <Typography>{user ? 'Người dùng' : 'Admin'}</Typography>
                </Box>
                <Box sx={{
                    width: '130px',
                    height: '130px',
                    background: !user
                        ? `url(${process.env.PUBLIC_URL}/assets/pancake.jpg)`
                        : user.gender === 0
                            ? `url(${process.env.PUBLIC_URL}/assets/maleavatar.png)`
                            : `url(${process.env.PUBLIC_URL}/assets/femaleavatar.png)`,
                    backgroundSize: 'cover',
                    borderRadius: '100px',
                    border: '6px solid rgba(255, 255, 255, 1)',
                    position: 'absolute',
                    bottom: '5%',
                    left: '2%'
                }} />
            </Box>

            {/* Detail information */}
            <Box sx={{
                width: '100%',
                marginTop: 3,
                paddingBottom: 4
            }}>
                <Grid2 container spacing={4}>
                    <Grid2 item size={8} sx={{
                        padding: 3,
                        borderRadius: '1rem',
                        background: 'white',
                    }}>
                        <Typography
                            sx={{
                                fontFamily: '"Inter", sans-serif !important',
                                fontSize: '14px',
                                color: 'rgba(58, 65, 111, 0.7)',
                                marginBottom: 3
                            }}
                        >
                            THÔNG TIN CƠ BẢN
                        </Typography>
                        <UserInfoDetail title="Ngày sinh" info={formatDate(userInfo.birthDate)} />
                        <UserInfoDetail title="Giới tính" info={userInfo.gender === 0 ? 'Nam' : 'Nữ'} />

                        <Typography
                            sx={{
                                fontFamily: '"Inter", sans-serif !important',
                                fontSize: '14px',
                                color: 'rgba(58, 65, 111, 0.7)',
                                marginBottom: 3,
                                marginTop: 4
                            }}
                        >
                            THÔNG TIN LIÊN HỆ
                        </Typography>
                        <UserInfoDetail title="Số điện thoại" info={userInfo.phone} update={true} />
                        <UserInfoDetail title="Địa chỉ" info={userInfo.address} update={false} />
                        <UserInfoDetail title="Email" info={userInfo.email} update={true} />
                    </Grid2>
                    <Grid2 item size={4} sx={{
                        padding: 3,
                        borderRadius: '1rem',
                        background: 'white',
                    }}>
                        <Typography variant="h5" sx={{ fontSize: '1.125rem', fontWeight: 500 }}>Những hoạt động gần đây</Typography>
                        <List sx={{ paddingTop: 2, paddingBottom: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            {userList.map((item, index) => (
                                <ListItem key={index} sx={{ width: '100%', padding: 0, paddingRight: 3 }}>
                                    <ListItemAvatar>
                                        <Avatar alt={item.name} sx={{ background: item.color }} />
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary="TP. Hồ Chí Minh" />
                                    <Typography>{item.booking}</Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
};

export default AdminUserDetail;
