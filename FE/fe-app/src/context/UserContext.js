import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7094/Employees');
                setUsers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);
    return (
        <UserContext.Provider value={{ users, loading, error }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}