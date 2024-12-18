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

    const [keySearch, setKeySearch] = useState('');
    useEffect(() => {
        if (keySearch === '') {
            fetchOwners();
        } else {
            fetchOwnersBySearch();
        }
    }, [page, rowsPerPage, refresh])

    const fetchOwnersBySearch = async () => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/Yard/admin/search?key=${keySearch}&pageIndex=${page + 1}&pageSize=${rowsPerPage}`);
            const data = await response.json();
            setYards(data.results);
            setTotalPage(data.totalPages);
            setTotalYard(data.totalRecords);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchOwners = async () => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/Yard/admin?page=${page}&size=${rowsPerPage}`);
            const data = await response.json();
            setYards(data.results);
            setTotalPage(data.totalPages);
            setTotalYard(data.totalRecords);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchYardAdminView = async (id) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/Yard/admin/${id}`);
            if (!response.ok) {
                throw new Error("Could not fetch yard details");
            }
            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    useEffect(() => {
        setPage(0);
        if (keySearch === '') {
            fetchOwners();
        } else {
            fetchOwnersBySearch();
        }
    }, [keySearch])
    return (
        <YardAdminContext.Provider value={{ yards, totalPage, page, setPage, rowsPerPage, setRowsPerPage, totalYard, loading, error, setRefresh, setKeySearch, keySearch, fetchYardAdminView }}>
            {children}
        </YardAdminContext.Provider>
    )
}

export const useYardAdmin = () => {
    return useContext(YardAdminContext);
}