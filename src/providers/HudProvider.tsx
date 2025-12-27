'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Keyboard = 'linear' | 'ortho' | 'ergo';

type HudContext = {
    showHud: boolean;
    showKeyboard: boolean;
    lockHud: boolean;
    perspectiveKeyboard: boolean;
    keyboard: Keyboard;
    toggleHud: (state?: boolean) => void;
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
    const storedShowHud = localStorage.getItem('quest-showHud');
    const [showHud, setShowHud] = useState<boolean>(
        typeof storedShowHud === 'string' ? JSON.parse(storedShowHud) : true
    );

    const storedShowKeyboard = localStorage.getItem('quest-showKeyboard');
    const [showKeyboard, setShowKeyboard] = useState<boolean>(
        typeof storedShowKeyboard === 'string' ? JSON.parse(storedShowKeyboard) : true
    );
    const [lockHud, setLockHud] = useState(localStorage.getItem('quest-lockHud') === 'true' ? true : false);
    const [perspectiveKeyboard, setPerspectiveKeyboard] = useState<boolean>(
        localStorage.getItem('quest-perspectiveKeyboard') === 'true' ? true : false
    );
    const [keyboard, setSelectedKeyboard] = useState<Keyboard>(
        (localStorage.getItem('quest-keyboard') as Keyboard) || 'linear'
    );

    function toggleHud(state?: boolean) {
        if (state === true || state === false) {
            setShowHud(state);

            return;
        }

        setShowHud((prev) => {
            return !prev;
        });
    }

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
        localStorage.setItem('quest-showHud', showHud.toString());
    }, [showHud]);

    useEffect(() => {
        localStorage.setItem('quest-showKeyboard', showKeyboard.toString());
    }, [showKeyboard]);

    useEffect(() => {
        localStorage.setItem('quest-lockHud', lockHud.toString());
    }, [lockHud]);

    useEffect(() => {
        localStorage.setItem('quest-perspectiveKeyboard', perspectiveKeyboard.toString());
    }, [perspectiveKeyboard]);

    useEffect(() => {
        localStorage.setItem('quest-keyboard', keyboard);
    }, [keyboard]);

    return (
        <HudContext.Provider
            value={{
                showHud,
                showKeyboard,
                lockHud,
                perspectiveKeyboard,
                keyboard,
                toggleHud,
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
