'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type HudContext = {
    showKeyboard: boolean;
    lockHud: boolean;
    perspectiveKeyboard: boolean;
    ergoKeyboard: boolean;
    toggleKeyboard: (state?: boolean) => void;
    toggleHudLock: (state?: boolean) => void;
    togglePerspectiveKeyboard: (state?: boolean) => void;
    toggleErgoKeyboard: (state?: boolean) => void;
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
    const [ergoKeyboard, setErgoKeyboard] = useState<boolean>(true);

    function toggleKeyboard(state?: boolean) {
        if (state === true || state === false) {
            setShowKeyboard(state);

            return;
        }

        setShowKeyboard((prev) => !prev);
    }

    function toggleHudLock(state?: boolean) {
        if (state === true || state === false) {
            setLockHud(state);

            return;
        }

        setLockHud((prev) => !prev);
    }

    function togglePerspectiveKeyboard(state?: boolean) {
        if (state === true || state === false) {
            setPerspectiveKeyboard(state);

            return;
        }

        setPerspectiveKeyboard((prev) => !prev);
    }

    function toggleErgoKeyboard(state?: boolean) {
        if (state === true || state === false) {
            setErgoKeyboard(state);

            return;
        }
        setErgoKeyboard((prev) => !prev);
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
                ergoKeyboard,
                toggleErgoKeyboard,
            }}
        >
            {children}
        </HudContext.Provider>
    );
}
