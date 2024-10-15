import { Button } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import '../styles/components/search.css';
import React, { useState, useEffect } from "react";

const Search = () => {
    const fullText = 'Tìm kiếm sân thể thao...';
    const [placeholder, setPlaceholder] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isDeleting) {
                setPlaceholder((prev) => prev.slice(0, -1)); 
                if (placeholder.length === 0) {
                    setIsDeleting(false); 
                    setIndex((prev) => (prev + 1) % fullText.length);
                }
            } else {
                setPlaceholder(fullText.slice(0, placeholder.length + 1));
                if (placeholder.length === fullText.length) {
                    setIsDeleting(true);
                }
            }
        }, isDeleting ? 50 : 50);

        return () => clearTimeout(timeout);
    }, [placeholder, isDeleting]);

    return (
        <form autoComplete='off' method='get'>
            <div className="search ms-3 me-3">
                <input type="text" name="timkiem" placeholder={placeholder} />
                <Button type='submit'><IoIosSearch /></Button>
            </div>
        </form>
    );
}

export default Search;