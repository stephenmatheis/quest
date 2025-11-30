import { useRef } from 'react';
import { CameraControls, CameraControlsImpl, Grid, useHelper } from '@react-three/drei';
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
                makeDefault
                camera={undefined}
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
            <ambientLight intensity={0.5} />
            <directionalLight ref={dirLightRef} position={[5, 2, 3]} intensity={2} castShadow={true} />
            <hemisphereLight
                ref={hemiLightRef}
                position={[0, 2, 5]}
                intensity={0.75}
                color="#ffffff"
                groundColor="brown"
            />

            <Book />

            {/* Helper */}
            {showHelpers && (
                <Grid
                    position={[0, 0, 0]}
                    cellSize={1}
                    cellThickness={1}
                    cellColor="#6f6f6f"
                    sectionSize={4}
                    sectionThickness={1}
                    sectionColor="#000000"
                    followCamera={false}
                    infiniteGrid={true}
                />
            )}
        </>
    );
}
