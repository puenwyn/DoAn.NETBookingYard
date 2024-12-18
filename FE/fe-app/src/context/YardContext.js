import React, { useState, useContext, createContext, useEffect } from 'react';

export const YardContext = createContext();

export const YardProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    

    const createYard = async (newYard) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/Yard/admin`, {
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

    const [yardsClientView, setYardsClientView] = useState([]);
    const [pageClientView, setPageClientView] = useState(0);
    const [rowPerPageClientView, setRowsPerPageClientView] = useState(12);
    const [totalYardsClientView, setTotalYardClientView] = useState();
    const [totalPagesYardsClientView, setTotalPagesYardClientView] = useState();

    useEffect(() => {
        const fetchYards = async () => {
            try {
                const response = await fetch(`https://localhost:7071/api/v1/Yard?page=${pageClientView}&size=${rowPerPageClientView}`);
                const data = await response.json();
                setYardsClientView(data.results);
                setTotalPagesYardClientView(data.totalPages);
                setTotalYardClientView(data.totalRecords);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchYards();
    }, [pageClientView, rowPerPageClientView])


    const fetchYardClientView = async (id) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/Yard/${id}`);
            if (!response.ok) {
                throw new Error("Could not fetch yard details");
            }
            const data = await response.json();
            return data; // Return the yard details
        } catch (err) {
            setError(err.message); // Handle error
            return null; // Return null if there's an error
        }
    };

    return (
        <YardContext.Provider value={{ createYard, yardsClientView, totalPagesYardsClientView, pageClientView, setPageClientView, fetchYardClientView }}>
            {children}
        </YardContext.Provider>
    )
}

export const useYardContext = () => {
    return useContext(YardContext);
}