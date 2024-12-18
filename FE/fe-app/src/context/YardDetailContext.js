import { createContext, useContext } from "react";

export const YardDetailContext = createContext();
export const YardDetailProvider = ({ children }) => {
    const addYardDetail = async (newData) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/YardDetail/admin`, {
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

    const updateYardDetailLocked = async (id) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/YardDetail/admin/${id}/isLocked`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                return false;
            }
            const updatedOwner = await response.json();
            return updatedOwner;
        } catch (err) {
            return false;
        }
    };

    const updateYardDetail = async (id, yardDetail) => {
        try {
            const response = await fetch(`https://localhost:7071/api/v1/YardDetail/admin/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(yardDetail)
            });
            if (!response.ok) {
                return false;
            }

            const updatedOwner = await response.json();
            return updatedOwner;
        } catch (err) {
            return false;
        }
    };
    return (
        <YardDetailContext.Provider value={{addYardDetail, updateYardDetailLocked, updateYardDetail}}>
            {children}
        </YardDetailContext.Provider>
    )
}

export const useYardDetailContext = () => {
    return useContext(YardDetailContext);
}