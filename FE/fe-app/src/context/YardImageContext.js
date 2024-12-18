import { createContext, useContext } from "react";

export const YardImageContext = createContext();
export const YardImageProvider = ({ children }) => {
    const createYardImage = async (newData) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/YardImage/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            if (!response.ok) {
                return false;
            }
            const addedOwner = await response.json();
            return addedOwner;
        } catch (err) {
            return false;
        }
    };

    const deleteYardImage = async (id) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/YardImage/admin/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                return false;
            }
            const addedOwner = await response.json();
            return addedOwner;
        } catch (err) {
            return false;
        }
    };
    return <YardImageContext.Provider value={{ createYardImage, deleteYardImage}}>
        {children}
    </YardImageContext.Provider>
}

export const useYardImageContext = () => {
    return useContext(YardImageContext);
}