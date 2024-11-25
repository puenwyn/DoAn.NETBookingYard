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

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/owners?page=${page}&size=${rowsPerPage}`);
                const data = await response.json();
                setOwners(data.owners);
                setTotalPage(data.totalPages);
                setTotalOwners(data.totalOwners);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchOwners();
    }, [page, rowsPerPage])

    
    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/owners/select`);
                const data = await response.json();
                setOwnerSelect(data); // Set đúng data
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
            const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`);
            setSelectedOwner(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const addOwner = async (newOwnerData) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/owners`, {
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
            const response = await fetch(`http://localhost:8080/api/v1/owners/${id}/isLocked`, {
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

    return (
        <OwnerContext.Provider value={{ owners, totalPage, page, setPage, rowsPerPage, setRowsPerPage, loading, error, totalOwners, addOwner, updateOwnerLocked, ownerSelect }}>
            {children}
        </OwnerContext.Provider>
    )
}

export const useOwner = () => {
    return useContext(OwnerContext);
}