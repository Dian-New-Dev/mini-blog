import { createContext, useState, ReactNode } from "react";

interface LoginContextProps {
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (value: boolean) => void;
}

export const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginContextProvider = ({ children }:{children: ReactNode}) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    return (
        <LoginContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn}}>
            {children}
        </LoginContext.Provider>
    );
};