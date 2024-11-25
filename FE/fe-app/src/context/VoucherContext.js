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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/vouchers?page=${page}&size=${rowsPerPage}`);
                const data = await response.json();
                setVouchers(data.vouchers);
                setTotalPage(data.totalPages);
                setTotalVouchers(data.totalVouchers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [page, rowsPerPage])

    return (
        <VoucherContext.Provider value={{ vouchers, totalPage, page, setPage, rowsPerPage, setRowsPerPage, loading, error, totalVouchers }}>
            {children}
        </VoucherContext.Provider>
    )
}

export const useVoucher = () => {
    return useContext(VoucherContext);
}