import React, { createContext, useState, useEffect, useContext } from "react";

export const YardAdminContext = createContext();

export const YardAdminProvider = ({ children }) => {
    const [yards, setYards] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalYard, setTotalYard] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/yards/admin-view?page=${page}&size=${rowsPerPage}`);
                const data = await response.json();
                setYards(data.yards);
                setTotalPage(data.totalPages);
                setTotalYard(data.totalYardAdmin);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchOwners();
    }, [page, rowsPerPage, refresh])
    return (
        <YardAdminContext.Provider value={{ yards, totalPage, page, setPage, rowsPerPage, setRowsPerPage, totalYard, loading, error, setRefresh }}>
            {children}
        </YardAdminContext.Provider>
    )
}

export const useYardAdmin = () => {
    return useContext(YardAdminContext);
}