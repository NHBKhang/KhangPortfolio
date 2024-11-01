import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const router = useRouter();
    const [language, setLanguage] = useState(router.locale || 'en');

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage && storedLanguage !== language) {
            setLanguage(storedLanguage);
            router.push(router.pathname, router.asPath, { locale: storedLanguage, shallow: false });
        }
    }, [router, language]);

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
        router.push(router.pathname, router.asPath, { locale: newLanguage });
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'vi' : 'en';
        changeLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
