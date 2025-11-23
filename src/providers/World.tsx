'use client';

import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';

type WorldContext = {
    isCharacterMenuOpen: boolean;
    setIsCharacterMenuOpen: Dispatch<SetStateAction<boolean>>;
    isGameMenuOpen: boolean;
    setIsGameMenuOpen: Dispatch<SetStateAction<boolean>>;
    isQuestLogOpen: boolean;
    setIsQuestLogOpen: Dispatch<SetStateAction<boolean>>;
    windowOrder: string[];
    setWindowOrder: Dispatch<SetStateAction<string[]>>;
    bringToFront: (name: string) => void;
};

const WorldContext = createContext<WorldContext | undefined>(undefined);

export function useWorld() {
    const context = useContext(WorldContext);

    if (!context) {
        throw new Error('useWorld must be used within a WorldProvider');
    }

    return context;
}

export function WorldProvider({ children }: { children: ReactNode }) {
    const [isCharacterMenuOpen, setIsCharacterMenuOpen] = useState<boolean>(false);
    const [isGameMenuOpen, setIsGameMenuOpen] = useState<boolean>(false);
    const [isQuestLogOpen, setIsQuestLogOpen] = useState<boolean>(false);
    const [windowOrder, setWindowOrder] = useState<string[]>([]);

    function bringToFront(name: string) {
        setWindowOrder((prev) => [...prev.filter((n) => n !== name), name]);
    }

    return (
        <WorldContext.Provider
            value={{
                isCharacterMenuOpen,
                setIsCharacterMenuOpen,
                isGameMenuOpen,
                setIsGameMenuOpen,
                isQuestLogOpen,
                setIsQuestLogOpen,
                windowOrder,
                setWindowOrder,
                bringToFront,
            }}
        >
            {children}
        </WorldContext.Provider>
    );
}
