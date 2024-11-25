import React, { useState, useContext, createContext } from 'react';

export const YardContext = createContext();

export const YardProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const createYard = async (newYard) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/yards`, {
                method: 'POST',
                body: newYard, 
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Thêm sân mới không thành công!");
            }

            const createdYard = await response.json();
            return { status: 'success', yard: createdYard };
        } catch (err) {
            setError(err.message);
            return { status: 'error', message: err.message };
        }
    };

    return (
        <YardContext.Provider value={{ createYard }}>
            {children}
        </YardContext.Provider>
    )
}

export const useYardContext = () => {
    return useContext(YardContext);
}