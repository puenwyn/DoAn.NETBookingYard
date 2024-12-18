import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";

export const OwnerContext = createContext();

export const OwnerProvider = ({ children }) => {
    const [owners, setOwners] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalOwners, setTotalOwners] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [ownerSelect, setOwnerSelect] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [keySearch, setKeySearch] = useState('');

    useEffect(() => {
        if (keySearch === '') {
            fetchOwners();
        } else {
            fetchOwnersBySearch();
        }
    }, [page, rowsPerPage])

    useEffect(() => {
        setPage(0);
        if (keySearch === '') {
            fetchOwners();
        } else {
            fetchOwnersBySearch();
        }
    }, [keySearch])

    const fetchOwners = async () => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/owner/admin?pageIndex=${page + 1}&pageSize=${rowsPerPage}`);
            const data = await response.json();
            setOwners(data.results);
            setTotalPage(data.totalPages);
            setTotalOwners(data.totalRecords);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchOwnersBySearch = async () => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/Owner/admin/search?key=${keySearch}&pageIndex=${page + 1}&pageSize=${rowsPerPage}`);
            const data = await response.json();
            setOwners(data.results);
            setTotalPage(data.totalPages);
            setTotalOwners(data.totalRecords);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await fetch(`https://localhost:7071/api/v1/owner/admin/select`);
                const data = await response.json();
                setOwnerSelect(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOwners();
    }, []);

    const getOwnerDetail = async (id) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/owner/admin/${id}`);
            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const addOwner = async (newOwnerData) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/owner/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOwnerData),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Thêm chủ sân mới không thành công!");
            }
            const addedOwner = await response.json();
            setOwners((prevOwners) => [...prevOwners, addedOwner]);
            setTotalOwners((prevTotal) => prevTotal + 1);
            return { status: 'success', addedOwner };
        } catch (err) {
            setError(err.message);
            return { status: 'error', message: err.message };
        }
    };

    const updateOwnerLocked = async (id) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/owner/admin/${id}/isLocked`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Khóa tài khoản này không thành công!");
            }
            const updatedOwner = await response.json();
            setOwners((prevOwners) => prevOwners.map(owner => owner.id === updatedOwner.id ? updatedOwner : owner));
            return { status: 'success', updatedOwner };
        } catch (err) {
            setError(err.message);
            return { status: 'error', message: err.message };
        }
    };

    const updateOwner = async (id, owner) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/owner/admin/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(owner)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Sửa tài khoản này không thành công!");
            }

            const updatedOwner = await response.json();
            setOwners((prevOwners) => prevOwners.map((o) => o.id === updatedOwner.id ? updatedOwner : o));
            return { status: 'success', updatedOwner };
        } catch (err) {
            setError(err.message);
            return { status: 'error', message: err.message };
        }
    };

    return (
        <OwnerContext.Provider value={{ owners, totalPage, page, setPage, rowsPerPage, setRowsPerPage, loading, error, totalOwners, addOwner, updateOwnerLocked, ownerSelect, getOwnerDetail, updateOwner, setKeySearch, keySearch }}>
            {children}
        </OwnerContext.Provider>
    )
}

export const useOwner = () => {
    return useContext(OwnerContext);
}