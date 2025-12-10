'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type HudContext = {
    showKeyboard: boolean;
    toggleKeyboard: () => void;
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

    function toggleKeyboard() {
        setShowKeyboard((prev) => !prev);
    }

    useEffect(() => {
        console.log(showKeyboard);
    }, [showKeyboard]);

    return (
        <HudContext.Provider
            value={{
                showKeyboard,
                toggleKeyboard,
            }}
        >
            {children}
        </HudContext.Provider>
    );
}
