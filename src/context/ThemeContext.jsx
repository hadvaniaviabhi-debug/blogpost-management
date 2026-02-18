import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme =() =>useContext(ThemeContext);

export const ThemeProvider = ({children }) => {
    // check local storage or system preference on initial load
    const[theme,setTheme]=useState(()=>{
        const savedTheme=localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme',theme);
        localStorage.setItem('theme',theme);
    },[theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ?'dark':'light'));
    };
    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};