import { createContext, useContext, useEffect, useState } from "react";

export const YardTypeContext = createContext();

export const YardTypeProvider = ({ children }) => {
    const [yardTypes, setYardTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchYardTypes = async () => {
            try {
                const response = await fetch(`https://localhost:7071/api/v1/YardType`);
                const data = await response.json();
                setYardTypes(data);
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        }
        fetchYardTypes();
    }, [])

    const addYardType = async (newYardTypeData) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/YardType/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newYardTypeData),
            });
            
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Thêm loại sân mới không thành công!");
            }
    
            const addedYardType = await response.json();
            // Assuming you have a setter function for the list of yard types, similar to setOwners
            setYardTypes((prevYardTypes) => [...prevYardTypes, addedYardType]);
            return { status: 'success', addedYardType };
        } catch (err) {
            setError(err.message);  // Assuming you have an error state handler
            return { status: 'error', message: err.message };
        }
    };

    const updateYardType = async (id, updateYardType, isDelete) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/YardType/admin/${id}`, {
                method: isDelete ? 'PATCH' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateYardType),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Sửa loại sân không thành công!");
            }
            const updatedYardType = await response.json();
            if (isDelete) {
                setYardTypes((prevYardType) => prevYardType.filter(yardType => yardType.id !== updatedYardType.id));
            } else {
                setYardTypes((prevYardType) => prevYardType.map(yardType => yardType.id === updatedYardType.id ? updatedYardType : yardType));
            }
            return { status: 'success', updatedYardType };
        } catch (err) {
            setError(err.message);
            return { status: 'error', message: err.message };
        }
    };

    return (
        <YardTypeContext.Provider value={{ yardTypes, loading, error, addYardType, updateYardType }}>
            {children}
        </YardTypeContext.Provider>
    )

    
};

export const useYardTypeContext = () => {
    return useContext(YardTypeContext);
}