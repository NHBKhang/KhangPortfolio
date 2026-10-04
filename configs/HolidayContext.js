import { createContext, useContext, useState, useEffect } from 'react';

const HolidayContext = createContext();

export const HolidayProvider = ({ children }) => {
    const [isBirthday, setIsBirthday] = useState(false);

    useEffect(() => {
        const today = new Date();

        const birthdays = [
            { day: 29, month: 1 },
            { day: 23, month: 10 },
            { day: 5, month: 7 }
        ];

        const isBirthday = birthdays.some(
            birthday =>
                today.getDate() === birthday.day &&
                today.getMonth() === birthday.month - 1
        );

        setIsBirthday(isBirthday);
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
