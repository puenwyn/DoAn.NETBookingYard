import React, { createContext, useContext, useEffect, useState } from 'react';

export const AmenityContext = createContext();

export const AmenityProvider = ({ children }) => {
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAmenity = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/v1/amenities');
                const data = await res.json();
                setAmenities(data);
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        }
        fetchAmenity();
    }, [])

    return (
        <AmenityContext.Provider value={{ amenities, loading, error }}>
            {children}
        </AmenityContext.Provider>
    )
}

export const useAmenityContext = () => {
    return useContext(AmenityContext);
}