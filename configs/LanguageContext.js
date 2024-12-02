import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { setupMomentLocale } from '../utils/momentSetup';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const router = useRouter();
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage && storedLanguage !== language) {
            setLanguage(storedLanguage);
            router.replace(router.pathname, router.asPath, { locale: storedLanguage, shallow: false });
        }
        
        setupMomentLocale(language);
    }, [language]);

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
        router.replace(router.pathname, router.asPath, { locale: newLanguage }); // Sử dụng replace thay vì push
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'vi' : 'en';
        changeLanguage(newLanguage);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.altKey && event.key === 'l') {
                event.preventDefault();
                toggleLanguage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggleLanguage]);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
