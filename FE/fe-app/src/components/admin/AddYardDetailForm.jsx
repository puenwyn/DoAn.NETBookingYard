import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../CustomTextField";

// const AddYardDetailForm = ({ open, handleClose }) => {

//     const [formData, setFormData] = useState({
//         tenSan: '',
//         khuVuc: '',
//         sucChua: '',
//         ghiChu: '',
//         gia: '',
//         giapeak: '',
//     });

//     return (
//         <React.Fragment>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">
//                     {<Typography variant='h6' sx={{
//                         fontWeight: 600,
//                         background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))', // Màu gradient
//                         WebkitBackgroundClip: 'text', // Clip nền cho chữ
//                         WebkitTextFillColor: 'transparent', // Làm màu chữ trong suốt
//                         display: 'inline-block', // Đảm bảo gradient áp dụng đúng cho chữ
//                     }}>Thêm thông tin chi tiết sân</Typography>}
//                 </DialogTitle>
//                 <DialogContent>
//                     <CustomTextField
//                         label={"Nhập tên sân"}
//                         placeholder={"Nhập tên sân"}
//                         password={false}
//                         regex={/^[a-zA-Z]{3,}$/}
//                         error={"Vui lòng nhập đúng định dạng"}
//                         width={"500px"} />
//                     <Box sx={{
//                         display: 'flex',
//                         width: '100%',
//                         justifyContent: 'space-between'
//                     }}>
//                         <CustomTextField
//                             label={"Nhập khu vực"}
//                             placeholder={"Nhập khu vực"}
//                             password={false}
//                             regex={/^[a-zA-Z]{3,}$/}
//                             error={"Vui lòng nhập đúng định dạng"}
//                             width={"245px"} />
//                         <CustomTextField
//                             label={"Nhập sức chứa"}
//                             placeholder={"Nhập sức chứa"}
//                             password={false}
//                             regex={/^[a-zA-Z]{3,}$/}
//                             error={"Vui lòng nhập đúng định dạng"}
//                             width={"245px"} />
//                     </Box>
//                     <CustomTextField
//                         label={"Nhập sức chứa"}
//                         placeholder={"Nhập sức chứa"}
//                         password={false}
//                         regex={/^[a-zA-Z]{3,}$/}
//                         error={"Vui lòng nhập đúng định dạng"}
//                         width={"500px"}
//                         multiline={true} />
//                     <Box sx={{
//                         display: 'flex',
//                         width: '100%',
//                         justifyContent: 'space-between'
//                     }}>
//                         <CustomTextField
//                             label={"Nhập khu vực"}
//                             placeholder={"Nhập khu vực"}
//                             password={false}
//                             regex={/^[a-zA-Z]{3,}$/}
//                             error={"Vui lòng nhập đúng định dạng"}
//                             width={"245px"} />
//                         <CustomTextField
//                             label={"Nhập sức chứa"}
//                             placeholder={"Nhập sức chứa"}
//                             password={false}
//                             regex={/^[a-zA-Z]{3,}$/}
//                             error={"Vui lòng nhập đúng định dạng"}
//                             width={"245px"} />
//                     </Box>
//                 </DialogContent>
//                 <DialogActions sx={{
//                     padding: 4
//                 }}>
//                     <Button onClick={handleClose}>Disagree</Button>
//                     <Button
//                         variant='contained'
//                         sx={{
//                             //33, 82, 255
//                             background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
//                             color: 'white',
//                             boxShadow: 'none',
//                             '&:hover': {
//                                 boxShadow: 'none'
//                             },
//                         }}>Thêm</Button>
//                 </DialogActions>
//             </Dialog>
//         </React.Fragment>
//     )
// }

const AddYardDetailForm = ({ open, handleClose, handleAddDetail }) => {
    const [formData, setFormData] = useState({
        tenSan: '',
        khuVuc: '',
        sucChua: '',
        ghiChu: '',
        gia: '',
        giapeak: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(`Thay đổi: ${name} = ${value}`); // Kiểm tra xem hàm có được gọi không
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // Kiểm tra dữ liệu nhập
        if (!formData.tenSan || !formData.khuVuc || !formData.sucChua) {
            alert("Vui lòng điền đủ thông tin!");
            return; // Ngăn không cho tiếp tục nếu chưa đủ thông tin
        }

        // Gọi handleAddDetail với dữ liệu từ form
        handleAddDetail({
            name: formData.tenSan,
            area: formData.khuVuc,
            capacity: formData.sucChua,
        });
        handleClose(); // Đóng form sau khi thêm
        setFormData({ // Reset formData sau khi đóng
            tenSan: '',
            khuVuc: '',
            sucChua: '',
            ghiChu: '',
            gia: '',
            giapeak: '',
        });
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
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
                        regex={/^[a-zA-Z\s]{3,}$/}
                        error="Vui lòng nhập tên hợp lệ"
                        width="500px"
                        onChange={handleChange}
                    />

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <CustomTextField
                            label="Nhập khu vực"
                            placeholder="Nhập khu vực"
                            regex={/^[a-zA-Z\s]{3,}$/}
                            error="Vui lòng nhập khu vực hợp lệ"
                            width="245px"
                            onChange={handleChange}
                        />
                        <CustomTextField
                            label="Nhập sức chứa"
                            placeholder="Nhập sức chứa"
                            regex={/^\d+$/}
                            error="Vui lòng nhập số lượng hợp lệ"
                            width="245px"
                            onChange={handleChange}
                        />
                    </Box>

                    <CustomTextField
                        label="Ghi chú"
                        placeholder="Nhập ghi chú"
                        multiline={true}
                        regex={/^.{0,500}$/}
                        error="Ghi chú không được quá 500 ký tự"
                        width="500px"
                        onChange={handleChange}
                    />

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <CustomTextField
                            label="Giá"
                            placeholder="Nhập giá"
                            regex={/^\d+(\.\d{1,2})?$/}
                            error="Vui lòng nhập giá hợp lệ"
                            width="245px"
                            onChange={handleChange}
                        />
                        <CustomTextField
                            label="Giá cao điểm"
                            placeholder="Nhập giá cao điểm"
                            regex={/^\d+(\.\d{1,2})?$/}
                            error="Vui lòng nhập giá hợp lệ"
                            width="245px"
                            onChange={handleChange}
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