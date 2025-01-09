import React, { createContext, useContext, useEffect, useState } from 'react';
import AOS from "aos";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [explorerHidden, setExplorerHidden] = useState(false);
    const [chatboxHidden, setChatboxHidden] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(null);
    const [enableAnimation, setEnableAnimation] = useState(true);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        setCurrentTheme(storedTheme);

        const storedGlobal = JSON.parse(localStorage.getItem('global')) || {};
        setChatboxHidden(storedGlobal.chatboxHidden ?? false);
        setEnableAnimation(storedGlobal.enableAnimation ?? false);

        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.shiftKey && event.key === 'C') {
                event.preventDefault();
                setChatboxHidden((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const storedGlobal = JSON.parse(localStorage.getItem('global')) || {};
        localStorage.setItem('global', JSON.stringify({ ...storedGlobal, enableAnimation, chatboxHidden }));
    }, [chatboxHidden, enableAnimation]);

    useEffect(() => {
        if (enableAnimation) {
            AOS.init({
                offset: 25,
                duration: 800,
                easing: 'ease-in-out',
                once: true,
            });
            document.documentElement.classList.remove('disable-animation');
        } else {
            document.documentElement.classList.add('disable-animation');
        }

        return () => {
            AOS.refreshHard();
        };
    }, [enableAnimation]);

    return (
        <GlobalContext.Provider value={{
            explorerHidden, setExplorerHidden,
            chatboxHidden, setChatboxHidden,
            currentTheme, setCurrentTheme,
            enableAnimation, setEnableAnimation,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
