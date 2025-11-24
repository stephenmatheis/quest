'use client';

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
    type RefObject,
    useRef,
} from 'react';
import type { CameraControlsImpl } from '@react-three/drei';
import type CameraControlsType from 'camera-controls';

type CameraContext = {
    cameraControlsRef: RefObject<CameraControlsImpl | null>;
    isCameraLocked: boolean;
    setIsCameraLocked: Dispatch<SetStateAction<boolean>>;
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

    return (
        <CameraContext.Provider
            value={{
                cameraControlsRef,
                isCameraLocked,
                setIsCameraLocked,
            }}
        >
            {children}
        </CameraContext.Provider>
    );
}
