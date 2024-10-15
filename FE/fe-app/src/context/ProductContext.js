import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://api.example.com/products?page=${page + 1}&limit=${rowsPerPage}`);
                const data = await response.json();
                setProducts(data.products);
                setTotalCount(data.totalCount);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [page, rowsPerPage]);

    return (
        <ProductContext.Provider value={{ products, totalCount, page, setPage, rowsPerPage, setRowsPerPage }}>
            {children}
        </ProductContext.Provider>
    );
};
