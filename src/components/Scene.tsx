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

export function Scene() {
    const { cameraControlsRef, isCameraLocked } = useCamera();
    const rightDirLightRef = useRef<DirectionalLight>(null);
    const leftDirLightRef = useRef<DirectionalLight>(null);
    const hemiLightRef = useRef<HemisphereLight>(null);
    const leftTorchLight = useRef<PointLight>(null);
    const rightTorchLight = useRef<PointLight>(null);

    useHelper(rightDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 1, 'red');
    useHelper(leftDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 1, 'red');
    useHelper(hemiLightRef as React.RefObject<HemisphereLight>, HemisphereLightHelper, 1, 'red');
    useHelper(leftTorchLight as React.RefObject<PointLight>, PointLightHelper, .25, 'red');
    useHelper(rightTorchLight as React.RefObject<PointLight>, PointLightHelper, .25, 'red');

    useEffect(() => {
        const controls = cameraControlsRef.current;
        if (!controls) return;

        // Camera now starts much closer — everything is 8× smaller
        controls.setLookAt(
            0, // posX
            1.875, // posY (15 → 15/8)
            6.25, // posZ (50 → 50/8)
            0, // lookAtX
            1.875, // lookAtY (15 → 15/8)
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
            <directionalLight ref={rightDirLightRef} position={[5, 1.875, 1.875]} intensity={0.5} />
            <directionalLight ref={leftDirLightRef} position={[-5, 1.875, 1.875]} intensity={0.5} />
            <hemisphereLight
                ref={hemiLightRef}
                position={[0, 1.875, 10]}
                intensity={2}
                color="#fff2e2"
                groundColor="#4a341f"
            />

            {/* Right Torch - now at scale 1 */}
            <pointLight ref={rightTorchLight} position={[2.125, 1.75, 0.4375]} intensity={1} color="#ffb84d" />
            <Torch position={[2.125, 1.25, 0.4375]} scale={1} />

            {/* Left Torch */}
            <pointLight ref={leftTorchLight} position={[-2.125, 1.75, 0.4375]} intensity={1} color="#ffb84d" />
            <Torch position={[-2.125, 1.25, 0.4375]} scale={1} />

            {/* Roof */}
            <mesh position={[0, 3.8125, 5]}>
                <boxGeometry args={[10, 0.125, 10.5]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Back Wall */}
            <mesh position={[0, 1.875, 0]}>
                <boxGeometry args={[10, 3.75, 0.5]} />
                <meshStandardMaterial color="#808080" />
            </mesh>

            {/* Floor */}
            <mesh position={[0, 0.03125, 5.25]}>
                <boxGeometry args={[10, 0.0625, 10]} />
                <meshStandardMaterial color="#A6703E" />
            </mesh>

            {/* Quest Board - scaled down */}
            <group>
                {/* Top */}
                <mesh position={[0, 2.5, 0.3125]}>
                    <boxGeometry args={[3.75, 0.125, 0.125]} />
                    <meshStandardMaterial color="#643A16" />
                </mesh>

                {/* Bottom */}
                <mesh position={[0, 0.625, 0.3125]}>
                    <boxGeometry args={[3.75, 0.125, 0.125]} />
                    <meshStandardMaterial color="#643A16" />
                </mesh>

                {/* Sides */}
                <mesh position={[1.8125, 1.5625, 0.3125]}>
                    <boxGeometry args={[0.125, 1.75, 0.125]} />
                    <meshStandardMaterial color="#643A16" />
                </mesh>
                <mesh position={[-1.8125, 1.5625, 0.3125]}>
                    <boxGeometry args={[0.125, 1.75, 0.125]} />
                    <meshStandardMaterial color="#643A16" />
                </mesh>

                {/* Center panel */}
                <mesh position={[0, 1.5625, 0.28125]}>
                    <boxGeometry args={[3.5, 1.75, 0.03125]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
            </group>

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
