'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Keyboard = 'linear' | 'ortho' | 'ergo';

type HudContext = {
    showKeyboard: boolean;
    lockHud: boolean;
    perspectiveKeyboard: boolean;
    keyboard: Keyboard;
    toggleKeyboard: (state?: boolean) => void;
    toggleHudLock: (state?: boolean) => void;
    togglePerspectiveKeyboard: (state?: boolean) => void;
    setKeyboard: (keyboard: Keyboard) => void;
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
    const [showKeyboard, setShowKeyboard] = useState<boolean>(
        localStorage.getItem('quest-showKeyboard') === 'true' ? true : false || false
    );
    const [lockHud, setLockHud] = useState(localStorage.getItem('quest-lockHud') === 'true' ? true : false || false);
    const [perspectiveKeyboard, setPerspectiveKeyboard] = useState<boolean>(
        localStorage.getItem('quest-perspectiveKeyboard') === 'true' ? true : false || false
    );
    const [keyboard, setSelectedKeyboard] = useState<Keyboard>(
        (localStorage.getItem('quest-keyboard') as Keyboard) || 'linear'
    );

    function toggleKeyboard(state?: boolean) {
        if (state === true || state === false) {
            setShowKeyboard(state);

            return;
        }

        setShowKeyboard((prev) => {
            return !prev;
        });
    }

    function toggleHudLock(state?: boolean) {
        if (state === true || state === false) {
            setLockHud(state);

            return;
        }

        setLockHud((prev) => {
            return !prev;
        });
    }

    function togglePerspectiveKeyboard(state?: boolean) {
        if (state === true || state === false) {
            setPerspectiveKeyboard(state);

            return;
        }

        setPerspectiveKeyboard((prev) => {
            return !prev;
        });
    }

    function setKeyboard(keyboard: Keyboard) {
        setSelectedKeyboard(keyboard);
    }

    useEffect(() => {
        localStorage.setItem('quest-showKeyboard', showKeyboard.toString());
    }, [showKeyboard]);

    useEffect(() => {
        localStorage.setItem('quest-showKeyboard', showKeyboard.toString());
    }, [lockHud]);

    useEffect(() => {
        localStorage.setItem('quest-showKeyboard', showKeyboard.toString());
    }, [perspectiveKeyboard]);

    useEffect(() => {
        localStorage.setItem('quest-showKeyboard', keyboard);
    }, [keyboard]);

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
