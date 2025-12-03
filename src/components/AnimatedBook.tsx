import { useRef } from 'react';
import { CameraControls, CameraControlsImpl, useHelper } from '@react-three/drei';
import { useCameraControls } from '@/providers/CameraProvider';
import { DirectionalLightHelper, HemisphereLight, HemisphereLightHelper, type DirectionalLight } from 'three';
import { Book } from './Book';

const { ACTION } = CameraControlsImpl;

export function AnimatedBook() {
    const { cameraControlsRef, isCameraLocked, showHelpers } = useCameraControls();
    const dirLightRef = useRef<DirectionalLight>(null);
    const hemiLightRef = useRef<HemisphereLight>(null);

    useHelper(
        showHelpers ? (dirLightRef as React.RefObject<DirectionalLight>) : false,
        DirectionalLightHelper,
        1,
        'red'
    );
    useHelper(
        showHelpers ? (hemiLightRef as React.RefObject<HemisphereLight>) : false,
        HemisphereLightHelper,
        1,
        'red'
    );

    return (
        <>
            {/* Camera */}
            <CameraControls
                ref={cameraControlsRef}
                mouseButtons={{
                    left: isCameraLocked ? ACTION.NONE : ACTION.ROTATE,
                    middle: ACTION.DOLLY,
                    right: isCameraLocked ? ACTION.NONE : ACTION.TRUCK,
                    wheel: ACTION.DOLLY,
                }}
                touches={{
                    one: ACTION.TOUCH_ROTATE,
                    two: ACTION.TOUCH_DOLLY_TRUCK,
                    three: ACTION.TOUCH_DOLLY_TRUCK,
                }}
            />

            {/* Lights */}
            <ambientLight intensity={2.75} />
            <directionalLight ref={dirLightRef} position={[5, 2, 3]} intensity={1} castShadow={true} />

            {/* Scene */}
            <Book />
        </>
    );
}
