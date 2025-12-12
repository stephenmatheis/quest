'use client';

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

export type Keyboard = 'linear' | 'ortho' | 'ergo';

type HudContext = {
    showKeyboard: boolean;
    lockHud: boolean;
    perspectiveKeyboard: boolean;
    keyboard: Keyboard;
    toggleKeyboard: (state?: boolean) => void;
    toggleHudLock: (state?: boolean) => void;
    togglePerspectiveKeyboard: (state?: boolean) => void;
    setKeyboard: Dispatch<SetStateAction<Keyboard>>;
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
    const [keyboard, setKeyboard] = useState<Keyboard>('linear');

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

    return (
        <HudContext.Provider
            value={{
                showKeyboard,
                lockHud,
                perspectiveKeyboard,
                keyboard,
                toggleKeyboard,
                toggleHudLock,
                togglePerspectiveKeyboard,
                setKeyboard,
            }}
        >
            {children}
        </HudContext.Provider>
    );
}
