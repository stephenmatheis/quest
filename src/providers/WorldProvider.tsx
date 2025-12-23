'use client';

import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';

type Mode = 'insert' | 'visual';

type WorldContext = {
    isCharacterMenuOpen: boolean;
    isGameMenuOpen: boolean;
    isQuestLogOpen: boolean;
    windowOrder: string[];
    mode: Mode;
    setIsCharacterMenuOpen: Dispatch<SetStateAction<boolean>>;
    setIsGameMenuOpen: Dispatch<SetStateAction<boolean>>;
    setIsQuestLogOpen: Dispatch<SetStateAction<boolean>>;
    setWindowOrder: Dispatch<SetStateAction<string[]>>;
    bringToFront: (name: string) => void;
    setMode: Dispatch<SetStateAction<Mode>>;
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
    const [mode, setMode] = useState<Mode>('visual');

    function bringToFront(name: string) {
        setWindowOrder((prev) => [...prev.filter((n) => n !== name), name]);
    }

    return (
        <WorldContext.Provider
            value={{
                isCharacterMenuOpen,
                isGameMenuOpen,
                isQuestLogOpen,
                windowOrder,
                mode,
                setIsCharacterMenuOpen,
                setIsGameMenuOpen,
                setIsQuestLogOpen,
                setWindowOrder,
                bringToFront,
                setMode,
            }}
        >
            {children}
        </WorldContext.Provider>
    );
}
