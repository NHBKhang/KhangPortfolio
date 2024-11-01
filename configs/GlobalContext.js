import React, { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [explorerHidden, setExplorerHidden] = useState(false);
    const [chatboxHidden, setChatboxHidden] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        setCurrentTheme(storedTheme);

        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'C') {
                event.preventDefault();
                setChatboxHidden(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <GlobalContext.Provider value={{
            explorerHidden, setExplorerHidden,
            chatboxHidden, setChatboxHidden,
            currentTheme, setCurrentTheme
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
