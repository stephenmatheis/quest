'use client';

import { createContext, useContext, useState, type ReactNode, type RefObject, useRef } from 'react';
import type { CameraControlsImpl } from '@react-three/drei';
import type CameraControlsType from 'camera-controls';

type CameraContext = {
    cameraControlsRef: RefObject<CameraControlsImpl | null>;
    isCameraLocked: boolean;
    showHelpers: boolean;
    enabled: boolean;
    toggleCameraLock: () => void;
    toggleShowHelpers: () => void;
    start: (enableTransition?: boolean) => void;
    end: () => void;
    overhead: () => void;
    inside: () => void;
    reset: () => void;
    toggleEnableCamera: (state: boolean) => void;
};

const CameraContext = createContext<CameraContext | undefined>(undefined);

export function useCameraControls() {
    const context = useContext(CameraContext);

    if (!context) {
        throw new Error('useCamera must be used within a CameraProvider');
    }

    return context;
}

export function CameraProvider({ children }: { children: ReactNode }) {
    const [showHelpers, setShowHelpers] = useState<boolean>(false);
    const [isCameraLocked, setIsCameraLocked] = useState<boolean>(false);
    const [enabled, setEnabled] = useState<boolean>(true);
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

    function reset() {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        // controls.setLookAt(0, 2, 20, 0, 2, 0, false);
        controls.setLookAt(0, 2, 31.8, 0, 2, 0, false);
    }

    function toggleEnableCamera(state: boolean) {
        if (state === true || state === false) {
            setEnabled(state);

            return;
        }

        setEnabled((prev) => !prev);
    }

    return (
        <CameraContext.Provider
            value={{
                cameraControlsRef,
                isCameraLocked,
                showHelpers,
                enabled,
                toggleCameraLock,
                toggleShowHelpers,
                start,
                end,
                overhead,
                inside,
                reset,
                toggleEnableCamera,
            }}
        >
            {children}
        </CameraContext.Provider>
    );
}
