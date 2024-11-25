import React from "react";
import { Avatar, Box, CircularProgress, colors, Grid2, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { BarChart2 } from "./BarChart";
import LineChart from "./LineChart";
import { DoughnutChart2 } from "./DoughnutChart";

const AnalyticBasic = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '150px',
            padding: 3,
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '1rem',
        }}>
            <Typography variant="h6" sx={{
                fontSize: '1rem !important'
            }}>Visitor</Typography>
            <Typography variant="h4" sx={{
                fontWeight: 600,
                background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', // Màu gradient
                WebkitBackgroundClip: 'text', // Clip nền cho chữ
                WebkitTextFillColor: 'transparent', // Làm màu chữ trong suốt
                display: 'inline-block',
            }}>
                24.532
            </Typography>
            <Box sx={{
                display: 'flex',
            }}>
                <Typography sx={{
                    fontSize: '0.8125rem'
                }}>
                    + 12%
                </Typography>
                <Typography sx={{
                    fontSize: '0.8125rem',
                    marginLeft: 2
                }}>
                    Since LastWeek
                </Typography>
            </Box>
        </Box>
    )
}

const ProgressStats = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '50px',
            display: 'flex',
            alignItems: 'center',

        }}>
            <Box sx={{
                width: '200px'
            }}>
                Số lượng người dùng
            </Box>
            <LinearProgress
                variant="determinate"
                value={80}
                sx={{
                    marginLeft: 2,
                    width: 'calc(100% - 200px)',
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 5, // Bo góc bên phải khi đạt 100%
                        background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))'
                    }
                }} />
        </Box>
    )
}

export const CircularProgressWithLabel = (props) => {
    const { value, color = 'primary.main', ...otherProps } = props; // Thêm prop color

    return (
        <Box position="relative" display="inline-flex">
            {/* Vòng tròn nền cho phần còn lại */}
            <CircularProgress
                variant="determinate"
                value={100} // Giá trị 100% cho vòng nền
                size={50} // Thay đổi size ở đây để điều chỉnh kích thước
                thickness={4} // Điều chỉnh độ dày của vòng tròn nếu cần
                sx={{
                    color: 'lightgray', // Màu cho phần còn lại
                }}
            />
            {/* Vòng tròn chính với giá trị thực */}
            <CircularProgress
                variant="determinate"
                value={value} // Sử dụng value từ props
                size={50} // Thay đổi size ở đây để điều chỉnh kích thước
                thickness={4} // Điều chỉnh độ dày của vòng tròn nếu cần
                sx={{
                    position: 'absolute',
                    left: 0,
                    color: color, // Sử dụng màu sắc được truyền vào
                }}
                {...otherProps}
            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ transform: 'translate(-50%, -50%)', fontSize: '0.95rem', color: 'black' }} // Đặt màu chữ để dễ thấy
            >
                <span>{`${Math.round(value)}%`}</span>
            </Box>
        </Box>
    );
};

const AdminChart = () => {

    const user = [
        { name: 'Nguyễn Văn An', booking: 19, color: '#BEE9FF' },
        { name: 'Trần Văn Bình', booking: 17, color: '#D0F0B8' },
        { name: 'Phan Văn Cường', booking: 16, color: '#FFEAB8' },
        { name: 'Huỳnh Gia Hưng', booking: 10, color: '#FFCDCE' },
        { name: 'Võ Văn Tài', booking: 7, color: '#E0CFFE' }
    ]

    const items = [
        { id: 1, primary: 'Sân 1', secondary: 'Thông tin thêm 1', progress: 70, color: '#8C57FF' },
        { id: 2, primary: 'Sân 2', secondary: 'Thông tin thêm 2', progress: 50, color: '#56CA00' },
        { id: 3, primary: 'Sân 3', secondary: 'Thông tin thêm 3', progress: 30, color: '#FF4C51' },
        { id: 4, primary: 'Sân 4', secondary: 'Thông tin thêm 4', progress: 95, color: '#16B1FF' },
    ];

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            padding: 3,

            marginBottom: 3
        }}>
            <Box sx={{
                width: '100%',
                display: 'flex'
            }}>
                <Grid2 container sx={{ width: '40%' }} spacing={3}>
                    <Grid2 item size={6}>
                        <AnalyticBasic />
                    </Grid2>
                    <Grid2 item size={6}>
                        <AnalyticBasic />
                    </Grid2>
                    <Grid2 item size={6}>
                        <AnalyticBasic />
                    </Grid2>
                    <Grid2 item size={6}>
                        <AnalyticBasic />
                    </Grid2>
                </Grid2>
                <Box sx={{
                    width: '60%',
                    marginLeft: 3,
                    background: 'white',
                    borderRadius: '1rem',
                    padding: 3
                }}>
                    <Typography variant="h5" sx={{ fontSize: '1.125rem', fontWeight: 500 }}>Tổng doanh thu trong tháng</Typography>
                    <ProgressStats />
                    <ProgressStats />
                </Box>
            </Box>
            <Box sx={{
                width: '100%',
                height: '400px',
                marginTop: 3,
                display: 'flex'
            }}>
                <Box sx={{
                    width: '453.66px',
                    height: '400px',
                    background: 'white',
                    borderRadius: '1rem',
                    padding: 3,
                }}>
                    <Typography variant="h5" sx={{ fontSize: '1.125rem', fontWeight: 500 }}>Khách hàng tiêu biểu</Typography>
                    <List sx={{ paddingTop: 2, paddingBottom: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {user.map((item) => (
                            <ListItem sx={{ width: '100%', padding: 0, paddingRight: 3 }}>
                                <ListItemAvatar>
                                    <Avatar alt={"Nguyễn Văn An"} sx={{ background: item.color }} />
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary="TP. Hồ Chí Minh" />
                                <Typography>{item.booking}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{
                    width: 'calc(100% - 477.66px)',
                    height: '400px',
                    marginLeft: 3,
                    background: 'white',
                    borderRadius: '1rem',
                    padding: 3
                }}>
                    <Typography variant="h5" sx={{ fontSize: '1.125rem', fontWeight: 500 }}>Thống kê lượt đặt sân tuần</Typography>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 3,
                        position: 'relative',
                    }}>
                        <BarChart2 />
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                width: '100%',
                height: '400px',
                marginTop: 3,
                display: 'flex',
            }}>
                <Box sx={{
                    width: 'calc(100% - 477.66px)',
                    height: '400px',
                    background: 'white',
                    borderRadius: '1rem',
                    padding: 3
                }}>
                    <Typography variant="h5" sx={{ fontSize: '1.125rem', fontWeight: 500 }}>Thống kê lượt đặt sân tuần</Typography>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        padding: 3,
                        position: 'relative',
                    }}>
                        <LineChart />

                    </Box>
                </Box>
                <Box sx={{
                    width: '477.66px',
                    height: '400px',
                    background: 'white',
                    marginLeft: 3,
                    borderRadius: '1rem'
                }}>

                </Box>
            </Box>
            <Box sx={{
                width: '100%',
                height: '450px',
                marginTop: 3,
                display: 'flex',
            }}>
                <Grid2 container spacing={3} sx={{
                    width: '100%',
                    height: '100%'
                }}>
                    <Grid2 item size={4} sx={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: 3
                    }}>
                        <Typography variant="h5" sx={{ fontSize: '1.125rem', fontWeight: 500 }}>Thống kê loại sân</Typography>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 3,
                            position: 'relative'
                        }}>
                            <DoughnutChart2 />
                        </Box>
                        <Box sx={{
                            width: '100%',
                            height: '70px',
                            background: 'rgba(33, 184, 254, 0.2)',
                            borderRadius: '1rem'
                        }}>

                        </Box>
                    </Grid2>
                    <Grid2 item size={4} sx={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: 3
                    }}>
                        <Typography variant="h5" sx={{ fontSize: '1.125rem', fontWeight: 500 }}>Danh sách đặt sân</Typography>
                        {/* <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Item One" value="1" />
                                        <Tab label="Item Two" value="2" />
                                        <Tab label="Item Three" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">Item One</TabPanel>
                                <TabPanel value="2">Item Two</TabPanel>
                                <TabPanel value="3">Item Three</TabPanel>
                            </TabContext>
                        </Box> */}
                    </Grid2>
                    <Grid2 item size={4} sx={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: 3
                    }}>
                        <Typography variant="h5" sx={{ fontSize: '1.125rem', fontWeight: 500 }}>Lượt đánh giá sân</Typography>
                        <List sx={{ width: '100%', marginTop: 2, marginBottom: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            {items.map((item) => (
                                <ListItem sx={{ width: '100%', padding: 0, marginBottom: 2 }} key={item.id}>
                                    <CircularProgressWithLabel value={item.progress} color={item.color} />
                                    <ListItemText primary={item.primary} secondary={item.secondary} sx={{ ml: 2 }} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    )
}

export default AdminChart;