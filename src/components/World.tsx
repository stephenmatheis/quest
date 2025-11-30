import { useRef } from 'react';
import { CameraControls, CameraControlsImpl, Grid, useHelper } from '@react-three/drei';
import { DirectionalLight, DirectionalLightHelper, HemisphereLight, HemisphereLightHelper } from 'three';
import { useCamera } from '@/providers/CameraProvider';

const { ACTION } = CameraControlsImpl;

export function World() {
    const { cameraControlsRef, isCameraLocked, showHelpers } = useCamera();
    const rightDirLightRef = useRef<DirectionalLight>(null);
    const leftDirLightRef = useRef<DirectionalLight>(null);
    const hemiLightRef = useRef<HemisphereLight>(null);

    useHelper(
        showHelpers ? (rightDirLightRef as React.RefObject<DirectionalLight>) : false,
        DirectionalLightHelper,
        0.25,
        'red'
    );
    useHelper(
        showHelpers ? (leftDirLightRef as React.RefObject<DirectionalLight>) : false,
        DirectionalLightHelper,
        0.25,
        'red'
    );
    useHelper(
        showHelpers ? (hemiLightRef as React.RefObject<HemisphereLight>) : false,
        HemisphereLightHelper,
        0.25,
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
            <directionalLight ref={rightDirLightRef} position={[6, 2, 2]} intensity={1} />
            <directionalLight ref={leftDirLightRef} position={[-6, 2, 2]} intensity={1} />
            <hemisphereLight
                ref={hemiLightRef}
                position={[0, 2, 10]}
                intensity={3}
                color="#fff2e2"
                groundColor="#4a341f"
            />

            {/* Helper */}
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
        </>
    );
}
