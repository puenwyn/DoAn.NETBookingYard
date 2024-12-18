import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { OwnerContext } from "./OwnerContext";

export const UserContext = createContext();

const GET_USERS = `https://localhost:8080/api/v1/users`;

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [keySearch, setKeySearch] = useState('');

    useEffect(() => {
        if (keySearch === '') {
            fetchUsers();
        } else {
            fetchUsersBySearch();
        }
    }, [page, rowsPerPage])

    useEffect(() => {
        setPage(0);
        if (keySearch === '') {
            fetchUsers();
        } else {
            fetchUsersBySearch();
        }
    }, [keySearch])

    const fetchUsers = async () => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/user/admin?pageIndex=${page + 1}&pageSize=${rowsPerPage}`);
            const data = await response.json();
            setUsers(data.results);
            setTotalPage(data.totalPages);
            setTotalUsers(data.totalRecords);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchUsersBySearch = async () => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/user/admin/search?key=${keySearch}&pageIndex=${page + 1}&pageSize=${rowsPerPage}`);
            const data = await response.json();
            setUsers(data.results);
            setTotalPage(data.totalPages);
            setTotalUsers(data.totalRecords);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getUserDetail = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:7071/api/v1/users/${id}`);
            setSelectedUser(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createNewUser = async (newUserData) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                return { status: 'error', message: errorData.message || 'Something went wrong' };
            }

            const createdUser = await response.json();
            return {
                status: 'success',
                user: createdUser,
            };
        } catch (err) {
            console.error('Error creating user:', err);

            return {
                status: 'error',
                message: err.message || 'An unknown error occurred',
            };
        }
    };


    return (
        <UserContext.Provider value={{ users, totalPage, page, setPage, rowsPerPage, setRowsPerPage, loading, error, totalUsers, getUserDetail, createNewUser, keySearch, setKeySearch }} >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}