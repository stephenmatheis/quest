'use client';

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    type RefObject,
    useRef,
} from 'react';
import type { CameraControlsImpl } from '@react-three/drei';
import type CameraControlsType from 'camera-controls';

type CameraContext = {
    cameraControlsRef: RefObject<CameraControlsImpl | null>;
    isCameraLocked: boolean;
    toggleCameraLock: () => void;
    start: () => void;
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
    const [isCameraLocked, setIsCameraLocked] = useState<boolean>(false);
    const cameraControlsRef = useRef<CameraControlsType>(null);

    function toggleCameraLock() {
        setIsCameraLocked((prev) => !prev);
    }

    function start() {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(0, 4.5, 16, 0, 5, -10, true);
    }

    function end() {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(0, 4.5, 11, 0, 5, -10, true);
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
