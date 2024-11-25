import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomComboBox } from "./AdminYardDetail";
import CustomTextField from "../CustomTextField";
import { useAddress } from "../../context/AddressContext";

const AddressPicker = ({ handleChangeAddress, setValid, houseAddressText, fullAddressText }) => {
    const {
        provinces,
        districts,
        wards,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        setSelectedProvince,
        setSelectedDistrict,
        setSelectedWard
    } = useAddress();

    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        setIsValid(setValid);
    }, [setValid])

    const [houseAddress, setHouseAddress] = useState(houseAddressText || ''); // Địa chỉ nhà
    const [fullAddress, setFullAddress] = useState(fullAddressText || ''); // Địa chỉ xác nhận đầy đủ

    useEffect(() => {
        handleChangeAddress(fullAddress);
    }, [fullAddress])

    const handleHouseAddressChange = (value, isValid) => {
        if (isValid) {
            setHouseAddress(value);
        } else {
            setHouseAddress('');
        }
    };

    useEffect(() => {
        console.log("Địa chỉ đầy đủ:", fullAddress); // Kiểm tra giá trị fullAddress
    }, [fullAddress]);

    // Sử dụng useEffect để cập nhật fullAddress mỗi khi dữ liệu thay đổi
    useEffect(() => {
        if (houseAddress && selectedWard && selectedDistrict && selectedProvince) {
            const selectedWardName = wards.find(ward => ward.code === selectedWard)?.name || '';
            const selectedDistrictName = districts.find(district => district.code === selectedDistrict)?.name || '';
            const selectedProvinceName = provinces.find(province => province.code === selectedProvince)?.name || '';
            setFullAddress(`${houseAddress}, ${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`);
            console.log(fullAddress);
        }
        // else {
        //     setFullAddress(''); // Đặt lại nếu chưa đủ dữ liệu
        // }
    }, [houseAddress, selectedWard, selectedDistrict, selectedProvince, wards, districts, provinces]);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <CustomComboBox
                    labelTitle={"Chọn tỉnh/thành phố *"}
                    options={provinces.map(province => ({ value: province.code, label: province.name }))}
                    error={"Vui lòng chọn"}
                    width={'31%'}
                    onChange={(value) => {
                        setSelectedProvince(value); // Cập nhật tỉnh/thành phố
                        setSelectedDistrict(''); // Đặt lại quận/huyện khi tỉnh/thành phố thay đổi
setSelectedWard(''); // Đặt lại phường/xã khi tỉnh/thành phố thay đổi
                    }}
                />
                <CustomComboBox
                    labelTitle={"Chọn quận/huyện *"}
                    options={selectedProvince ? districts.map(district => ({ value: district.code, label: district.name })) : []}
                    error={"Vui lòng chọn"}
                    width={'31%'}
                    onChange={(value) => {
                        setSelectedDistrict(value); // Cập nhật quận/huyện
                        setSelectedWard(''); // Đặt lại phường/xã khi quận/huyện thay đổi
                    }}
                />
                <CustomComboBox
                    labelTitle={"Chọn phường/xã *"}
                    options={selectedDistrict ? wards.map(ward => ({ value: ward.code, label: ward.name })) : []}
                    error={"Vui lòng chọn"}
                    width={'31%'}
                    onChange={(value) => {
                        setSelectedWard(value); // Cập nhật phường/xã
                    }}
                />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <CustomTextField
                    label={'Nhập địa chỉ nhà *'}
                    placeholder={'273A'}
                    password={false}
                    text={houseAddress}
                    regex={/^[\w\s\u00C0-\u1EF9]*$/u}
                    error={'Vui lòng nhập'}
                    onChange={handleHouseAddressChange} // Sử dụng hàm mới
                    width={'31%'}
                    setValid={isValid}
                />
                <CustomTextField
                    label={'Xác nhận địa chỉ *'}
                    placeholder={''}
                    password={false}
                    text={fullAddress} // Sử dụng fullAddress
                    regex={/^[\w\s,]*$/}
                    error={'Vui lòng nhập'}
                    width={'65.5%'}
                    readOnly={true} // Làm cho ô xác nhận chỉ đọc
                    setValid={isValid}
                />
            </Box>
        </Box>
    );
};


export default AddressPicker;