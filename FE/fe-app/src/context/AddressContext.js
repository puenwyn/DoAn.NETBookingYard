import React, { createContext, useContext, useEffect, useState } from "react";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    // Gọi API để lấy danh sách tỉnh/thành phố
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/p');
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchProvinces();
    }, []);

    // Gọi API để lấy danh sách quận/huyện dựa trên tỉnh thành đã chọn
    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedProvince) return;

            try {
                // Sử dụng ID của tỉnh để gọi API
                const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
                const data = await response.json();
                setDistricts(data.districts); // Dữ liệu quận huyện sẽ được lưu vào state

            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        };

        fetchDistricts();
    }, [selectedProvince]);

    useEffect(() => {
        const fetchWards = async () => {
            if (!selectedDistrict) return;

            try {
                const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
                const data = await response.json();
                setWards(data.wards);
            } catch (error) {
                console.error("Error fetching wards:", error)
            }
        }

        fetchWards();
    }, [selectedDistrict]);

    return (
        <AddressContext.Provider value={{
            provinces,
            districts,
            wards,
            selectedProvince,
            selectedDistrict,
            selectedWard,
            setSelectedProvince,
            setSelectedDistrict,
            setSelectedWard
        }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => {
    return useContext(AddressContext);
};