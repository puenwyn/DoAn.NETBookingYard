import React, { createContext, useState } from "react";

export const OwnerContext = createContext();

export const OwnerProvider = ({ children }) => {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await axios.get('https://localhost:7292/api/v1/owner');
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