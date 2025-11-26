import { useEffect, useRef } from 'react';
import { CameraControls, CameraControlsImpl, Grid, useHelper } from '@react-three/drei';
import { useCamera } from '@/providers/CameraProvider';
import { Torch } from '@/components/Models/Torch';
import {
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    PointLight,
    PointLightHelper,
} from 'three';

const { ACTION } = CameraControlsImpl;

function Floor() {
    return (
        <mesh position={[0, 0.125, 4]}>
            <boxGeometry args={[8, 0.25, 8]} />
            <meshStandardMaterial color="#A6703E" />
        </mesh>
    );
}

function BackWall() {
    return (
        <mesh position={[0, 2, -0.25]}>
            <boxGeometry args={[8, 4, 0.5]} />
            <meshStandardMaterial color="#808080" />
        </mesh>
    );
}

function Roof() {
    return (
        <mesh position={[0, 3.875, 4]}>
            <boxGeometry args={[8, 0.25, 8]} />
            <meshStandardMaterial color="#643A16" />
        </mesh>
    );
}

function Board() {
    return (
        <group>
            {/* Top */}
            <mesh position={[0, 3, 0.0625]}>
                <boxGeometry args={[4, 0.125, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Bottom */}
            <mesh position={[0, 1, 0.0625]}>
                <boxGeometry args={[4, 0.125, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Right */}
            <mesh position={[1.9375, 2, 0.0625]}>
                <boxGeometry args={[0.125, 1.875, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Left */}
            <mesh position={[-1.9375, 2, 0.0625]}>
                <boxGeometry args={[0.125, 1.875, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Center */}
            <mesh position={[0, 2, 0.0625]}>
                <boxGeometry args={[3.75, 2, 0.0125]} />
                <meshStandardMaterial color="#f1d29c" />
            </mesh>
        </group>
    );
}

export function Scene() {
    const { cameraControlsRef, isCameraLocked } = useCamera();
    const rightDirLightRef = useRef<DirectionalLight>(null);
    const leftDirLightRef = useRef<DirectionalLight>(null);
    const hemiLightRef = useRef<HemisphereLight>(null);
    const leftTorchLight = useRef<PointLight>(null);
    const rightTorchLight = useRef<PointLight>(null);

    useHelper(rightDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 0.25, 'red');
    useHelper(leftDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 0.25, 'red');
    useHelper(hemiLightRef as React.RefObject<HemisphereLight>, HemisphereLightHelper, 0.25, 'red');
    useHelper(leftTorchLight as React.RefObject<PointLight>, PointLightHelper, 0.25, 'red');
    useHelper(rightTorchLight as React.RefObject<PointLight>, PointLightHelper, 0.25, 'red');

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(
            0, // posX
            2, // posY
            12, // posZ
            0, // lookAtX
            2, // lookAtY
            0, // lookAtZ
            false
        );

        controls.smoothTime = 1.1;
    }, [cameraControlsRef]);

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

            {/* Right Torch - now at scale 1 */}
            <pointLight ref={rightTorchLight} position={[3, 2.5, 0.25]} intensity={1} color="#ffb84d" />
            <Torch position={[3, 2, 0.25]} scale={1} />

            {/* Left Torch */}
            <pointLight ref={leftTorchLight} position={[-3, 2.5, 0.25]} intensity={1} color="#ffb84d" />
            <Torch position={[-3, 2, 0.25]} scale={1} />

            <Roof />
            <BackWall />
            <Floor />
            <Board />
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
