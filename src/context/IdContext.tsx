import { createContext, FC, ReactNode, useState } from "react";

type Id = string | null;

export interface IdContextType {
    id: Id;
    toggleId: (id: Id) => void;
}

export const IdContext = createContext<IdContextType | undefined>(undefined);

export const IdProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [id, setId] = useState<Id>(null);

    const toggleId = (id: Id) => {
        setId((prevId) => (prevId === id ? null : id));
    };

    return (
        <IdContext.Provider value={{ id, toggleId }}>
            {children}
        </IdContext.Provider>
    );
};