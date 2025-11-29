'use client';

import { createContext, useContext, useState, type ReactNode, type RefObject, useRef } from 'react';
import type { CameraControlsImpl } from '@react-three/drei';
import type CameraControlsType from 'camera-controls';

type CameraContext = {
    cameraControlsRef: RefObject<CameraControlsImpl | null>;
    isCameraLocked: boolean;
    toggleCameraLock: () => void;
    showHelpers: boolean;
    toggleShowHelpers: () => void;
    start: (enableTransition?: boolean) => void;
    end: () => void;
    overhead: () => void;
    inside: () => void;
};

const CameraContext = createContext<CameraContext | undefined>(undefined);

export function useCamera() {
    const context = useContext(CameraContext);

    if (!context) {
        throw new Error('useCamera must be used within a CameraProvider');
    }

    return context;
}

export function CameraProvider({ children }: { children: ReactNode }) {
    const [showHelpers, setShowHelpers] = useState<boolean>(false);
    const [isCameraLocked, setIsCameraLocked] = useState<boolean>(false);
    const cameraControlsRef = useRef<CameraControlsType>(null);

    function toggleCameraLock() {
        setIsCameraLocked((prev) => !prev);
    }

    function toggleShowHelpers() {
        setShowHelpers((prev) => !prev);
    }

    function start(enableTransition = false) {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(
            0, // posX
            2.5, // posY
            12, // posZ
            0, // lookAtX
            2.5, // lookAtY
            0, // lookAtZ
            enableTransition
        );
    }

    function end() {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(
            0, // posX
            2.5, // posY
            6, // posZ
            0, // lookAtX
            2.5, // lookAtY
            0, // lookAtZ
            true
        );
    }

    function overhead() {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(0, 24, 48, 0, 0, -24, true);
    }

    function inside() {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(0, -6, 32, 0, 12, 4, true);
    }

    return (
        <CameraContext.Provider
            value={{
                cameraControlsRef,
                isCameraLocked,
                toggleCameraLock,
                showHelpers,
                toggleShowHelpers,
                start,
                end,
                overhead,
                inside,
            }}
        >
            {children}
        </CameraContext.Provider>
    );
}
