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

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await axios.get('https://localhost:7094/Employees');
    //             setUsers(response.data);
    //         } catch (err) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     fetchUsers();
    // }, []);
    // return (
    //     <UserContext.Provider value={{ users, loading, error }}>
    //         {children}
    //     </UserContext.Provider>
    // )

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/users?page=${page}&size=${rowsPerPage}`);
                const data = await response.json();
                setUsers(data.users);
                setTotalPage(data.totalPages);
                setTotalUsers(data.totalUsers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, [page, rowsPerPage])

    const getUserDetail = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`);
            setSelectedUser(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createNewUser = async (newUserData) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/users`, {
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
        <UserContext.Provider value={{ users, totalPage, page, setPage, rowsPerPage, setRowsPerPage, loading, error, totalUsers, getUserDetail, createNewUser }} >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}