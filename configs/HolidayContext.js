import { createContext, useContext, useState, useEffect } from 'react';

const HolidayContext = createContext();

export const HolidayProvider = ({ children }) => {
    const [isBirthday, setIsBirthday] = useState(false);

    useEffect(() => {
        const today = new Date();
        const birthday = { day: 25, month: 0 }; // Ngày và tháng sinh
        if (today.getDate() === birthday.day && today.getMonth() === birthday.month) {
            setIsBirthday(true);
        }
    }, []);

    return (
        <HolidayContext.Provider value={{
            isBirthday
        }}>
            {children}
        </HolidayContext.Provider>
    );
};

export const useHoliday = () => useContext(HolidayContext);
