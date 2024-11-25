import { Box } from "@mui/material";
import React from "react";
import { CustomComboBox } from "./AdminYardDetail";
import CustomTextField from "../CustomTextField";

const AddressPicker = () => {
    return (
        <Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <CustomComboBox
                    labelTitle={"Chọn tỉnh/thành phố *"}
                    options={['Pizza', 'Burgers', 'Sushi', 'Salad']}
                    error={"Vui lòng chọn"}
                    width={'31%'}
                />
                <CustomComboBox
                    labelTitle={"Chọn quận/huyện *"}
                    options={['Pizza', 'Burgers', 'Sushi', 'Salad']}
                    error={"Vui lòng chọn"}
                    width={'31%'}
                />
                <CustomComboBox
                    labelTitle={"Chọn tên đường *"}
                    options={['Pizza', 'Burgers', 'Sushi', 'Salad']}
                    error={"Vui lòng chọn"}
                    width={'31%'}
                />
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <CustomTextField
                    label={'Nhập địa chỉ nhà *'}
                    placeholder={'273A'}
                    password={false}
                    regex={/^[a-zA-Z]{3,}$/}
                    error={'Vui lòng nhập'}
                    width={'31%'} />
                <CustomTextField
                    label={'Xác nhận địa chỉ *'}
                    placeholder={''}
                    password={false}
                    regex={/^[a-zA-Z]{3,}$/}
                    error={'Vui lòng nhập'}
                    width={'65.5%'}
                    readOnly={true} />
            </Box>
        </Box>

    )
}

export default AddressPicker;