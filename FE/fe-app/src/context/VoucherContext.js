import { createContext, useContext, useEffect, useState } from "react";

export const VoucherContext = createContext();

export const VoucherProvider = ({ children }) => {
    const [vouchers, setVouchers] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalVouchers, setTotalVouchers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [keySearch, setKeySearch] = useState('');

    useEffect(() => {
        if (keySearch === '') {
            fetchVouchers();
        } else {
            fetchVoucherBySearch();
        }
    }, [page, rowsPerPage])

    useEffect(() => {
        setPage(0);
        if (keySearch === '') {
            fetchVouchers();
        } else {
            fetchVoucherBySearch();
        }
    }, [keySearch])

    const fetchVouchers = async () => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/Voucher/admin?page=${page}&size=${rowsPerPage}`);
            const data = await response.json();
            setVouchers(data.results);
            setTotalPage(data.totalPages);
            setTotalVouchers(data.totalVouchers);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchVoucherBySearch = async () => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/Voucher/admin/search?key=${keySearch}&pageIndex=${page + 1}&pageSize=${rowsPerPage}`);
            const data = await response.json();
            setVouchers(data.results);
            setTotalPage(data.totalPages);
            setTotalVouchers(data.totalRecords);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const addVoucher = async (newVoucher) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/Voucher/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newVoucher),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Thêm chủ sân mới không thành công!");
            }
            const createdVoucher = await response.json();
            setVouchers((prevVoucher) => [...prevVoucher, createdVoucher]);
            setTotalVouchers((prevTotal) => prevTotal + 1);
            return { status: 'success', createdVoucher };
        } catch (err) {
            setError(err.message);
            return { status: 'error', message: err.message };
        }
    };

    return (
        <VoucherContext.Provider value={{ vouchers, totalPage, page, setPage, rowsPerPage, setRowsPerPage, loading, error, totalVouchers, keySearch, setKeySearch, addVoucher }}>
            {children}
        </VoucherContext.Provider>
    )
}

export const useVoucher = () => {
    return useContext(VoucherContext);
}