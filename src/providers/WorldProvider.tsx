'use client';

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
    useEffect,
} from 'react';

type Mode = 'game' | 'type';

type WorldContext = {
    isCharacterMenuOpen: boolean;
    isGameMenuOpen: boolean;
    isQuestLogOpen: boolean;
    windowOrder: string[];
    mode: Mode;
    scanLines: boolean;
    bloom: boolean;
    setIsCharacterMenuOpen: Dispatch<SetStateAction<boolean>>;
    setIsGameMenuOpen: Dispatch<SetStateAction<boolean>>;
    setIsQuestLogOpen: Dispatch<SetStateAction<boolean>>;
    setWindowOrder: Dispatch<SetStateAction<string[]>>;
    bringToFront: (name: string) => void;
    setMode: Dispatch<SetStateAction<Mode>>;
    setScanLines: Dispatch<SetStateAction<boolean>>;
    setBloom: Dispatch<SetStateAction<boolean>>;
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
    const [mode, setMode] = useState<Mode>((localStorage.getItem('quest-mode') as Mode) || 'visual');
    const [scanLines, setScanLines] = useState<boolean>(
        localStorage.getItem('quest-scanLines') === 'true' ? true : false
    );

    const storedBloom = localStorage.getItem('quest-bloom');
    const [bloom, setBloom] = useState<boolean>(typeof storedBloom === 'string' ? JSON.parse(storedBloom) : true);

    function bringToFront(name: string) {
        setWindowOrder((prev) => [...prev.filter((n) => n !== name), name]);
    }

    useEffect(() => {
        localStorage.setItem('quest-mode', mode);
    }, [mode]);

    useEffect(() => {
        localStorage.setItem('quest-scanLines', scanLines.toString());
    }, [scanLines]);

    useEffect(() => {
        localStorage.setItem('quest-bloom', bloom.toString());
    }, [bloom]);

    return (
        <WorldContext.Provider
            value={{
                isCharacterMenuOpen,
                isGameMenuOpen,
                isQuestLogOpen,
                windowOrder,
                mode,
                scanLines,
                bloom,
                setIsCharacterMenuOpen,
                setIsGameMenuOpen,
                setIsQuestLogOpen,
                setWindowOrder,
                bringToFront,
                setMode,
                setScanLines,
                setBloom,
            }}
        >
            {children}
        </WorldContext.Provider>
    );
}
