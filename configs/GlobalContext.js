import React, { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [explorerHidden, setExplorerHidden] = useState(false);
    const [chatboxHidden, setChatboxHidden] = useState(false);

    useEffect(() => {
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
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
