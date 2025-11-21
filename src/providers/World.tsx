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

type WorldContext = {
    selectedVehicle: number;
    setSelectedVehicle: Dispatch<SetStateAction<number>>;
    cameraControlsRef: RefObject<CameraControlsImpl | null>;
    isCameraLocked: boolean;
    setIsCameraLocked: Dispatch<SetStateAction<boolean>>;
};

const WorldContext = createContext<WorldContext | undefined>(undefined);

export function useWorld() {
    const context = useContext(WorldContext);

    if (!context) {
        throw new Error('useWorld must be used within a WorldProvider');
    }

    return context;
}

export function WorldProvider({ children }: { children: ReactNode }) {
    const [selectedVehicle, setSelectedVehicle] = useState<number>(0);
    const [isCameraLocked, setIsCameraLocked] = useState<boolean>(false);
    const cameraControlsRef = useRef<CameraControlsType>(null);

    return (
        <WorldContext.Provider
            value={{
                selectedVehicle,
                setSelectedVehicle,
                cameraControlsRef,
                isCameraLocked,
                setIsCameraLocked,
            }}
        >
            {children}
        </WorldContext.Provider>
    );
}
