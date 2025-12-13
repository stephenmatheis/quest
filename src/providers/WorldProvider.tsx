'use client';

import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { Vector2, Vector3 } from 'three';

type WorldContext = {
    isCharacterMenuOpen: boolean;
    isGameMenuOpen: boolean;
    isQuestLogOpen: boolean;
    windowOrder: string[];
    pointerPos: Vector2;
    hitPos: Vector3;
    setIsCharacterMenuOpen: Dispatch<SetStateAction<boolean>>;
    setIsGameMenuOpen: Dispatch<SetStateAction<boolean>>;
    setIsQuestLogOpen: Dispatch<SetStateAction<boolean>>;
    setWindowOrder: Dispatch<SetStateAction<string[]>>;
    bringToFront: (name: string) => void;
    setPointerPos: Dispatch<SetStateAction<Vector2>>;
    setHitPos: Dispatch<SetStateAction<Vector3>>;
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
    const [pointerPos, setPointerPos] = useState<Vector2>(new Vector2());
    const [hitPos, setHitPos] = useState<Vector3>(new Vector3());

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
                pointerPos,
                hitPos,
                setIsCharacterMenuOpen,
                setIsGameMenuOpen,
                setIsQuestLogOpen,
                setWindowOrder,
                bringToFront,
                setPointerPos,
                setHitPos,
            }}
        >
            {children}
        </WorldContext.Provider>
    );
}
