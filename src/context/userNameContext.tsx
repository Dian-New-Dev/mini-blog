import { createContext, useState, ReactNode, FC } from "react";

interface UserNameContextProps {
    userNameCtx: string;
    setUserNameCtx: (value: string) => void;
}

export const UserNameContext = createContext<UserNameContextProps | undefined>(undefined);

export const UserNameContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [userNameCtx, setUserNameCtx] = useState<string>(""); // Inicializa como string vazia

    return (
        <UserNameContext.Provider value={{ userNameCtx, setUserNameCtx }}>
            {children}
        </UserNameContext.Provider>
    );
};
