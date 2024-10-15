import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => {
    return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };

