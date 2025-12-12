'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type HudContext = {
    showKeyboard: boolean;
    toggleKeyboard: () => void;
    lockHud: boolean;
    toggleHudLock: () => void;
    perspectiveKeyboard: boolean;
    togglePerspectiveKeyboard: () => void;
};

const HudContext = createContext<HudContext | undefined>(undefined);

export function useHud() {
    const context = useContext(HudContext);

    if (!context) {
        throw new Error('useHud must be used within a HudProvider');
    }

    return context;
}

export function HudProvider({ children }: { children: ReactNode }) {
    const [showKeyboard, setShowKeyboard] = useState<boolean>(true);
    const [lockHud, setLockHud] = useState(true);
    const [perspectiveKeyboard, setPerspectiveKeyboard] = useState<boolean>(false);

    function toggleKeyboard() {
        setShowKeyboard((prev) => !prev);
    }

    function toggleHudLock() {
        setLockHud((prev) => !prev);
    }

    function togglePerspectiveKeyboard() {
        setPerspectiveKeyboard((prev) => !prev);
    }

    return (
        <HudContext.Provider
            value={{
                showKeyboard,
                toggleKeyboard,
                lockHud,
                toggleHudLock,
                perspectiveKeyboard,
                togglePerspectiveKeyboard,
            }}
        >
            {children}
        </HudContext.Provider>
    );
}
