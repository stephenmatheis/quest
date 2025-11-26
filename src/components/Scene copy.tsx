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

    useHelper(rightDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 2, 'red');
    useHelper(leftDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 2, 'red');
    useHelper(hemiLightRef as React.RefObject<HemisphereLight>, HemisphereLightHelper, 2, 'red');
    useHelper(leftTorchLight as React.RefObject<PointLight>, PointLightHelper, 2, 'red');
    useHelper(rightTorchLight as React.RefObject<PointLight>, PointLightHelper, 2, 'red');

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        // // start
        // controls.setLookAt(0, 4.5, 16, 0, 5, -10, false);

        // // end
        // requestAnimationFrame(() => {
        //     controls.setLookAt(0, 4.5, 11, 0, 5, -10, true);
        // });

        // start
        // controls.setLookAt(
        //     0, // positionX	number	Camera position x.
        //     15, // positionY	number	Camera position y.
        //     200, // positionZ	number	Camera position z.
        //     0, // targetX	number	Orbit center position x.
        //     0, // targetY	number	Orbit center position y.
        //     0, // targetZ	number	Orbit center position z.
        //     false // enableTransition	boolean	Whether to move smoothly or immediately
        // );

        // end
        controls.setLookAt(
            0, // positionX	number	Camera position x.
            15, // positionY	number	Camera position y.
            50, // positionZ	number	Camera position z.
            0, // targetX	number	Orbit center position x.
            15, // targetY	number	Orbit center position y.
            0, // targetZ	number	Orbit center position z.
            // true // enableTransition	boolean	Whether to move smoothly or immediately
            false // enableTransition	boolean	Whether to move smoothly or immediately
        );

        controls.smoothTime = 1.1; // cinematic walk speed

        // controls.minDistance = 2;a
        // controls.minPolarAngle = 0.2; // don’t look straight up
        // controls.maxPolarAngle = Math.PI / 2; // don’t go under floor
        // controls.smoothTime = 1.1; // cinematic walk speed

        // controls.draggingSmoothTime = 0.12; // snappy when user grabs
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
            <directionalLight ref={rightDirLightRef} position={[40, 15, 15]} intensity={0.5} />
            <directionalLight ref={leftDirLightRef} position={[-40, 15, 15]} intensity={0.5} />
            <hemisphereLight
                ref={hemiLightRef}
                // position={[0, 15, 30]}
                position={[0, 15, 80]}
                intensity={5}
                // color="#ffd4a3"
                color="#fff2e2"
                groundColor="#4a341f"
            />

            {/* Right Torch */}
            <pointLight ref={rightTorchLight} position={[17, 14, 3.5]} intensity={50} color="#ffb84d" />
            <Torch position={[17, 10, 3.5]} scale={8} />

            {/* Left Torch */}
            <pointLight ref={leftTorchLight} position={[-17, 14, 3.5]} intensity={50} color="#ffb84d" />
            <Torch position={[-17, 10, 3.5]} scale={8} />

            {/* Roof */}
            <group>
                <mesh position={[0, 30.5, 40]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[80, 1, 84]} />
                    <meshStandardMaterial color="#643A16" />
                </mesh>
            </group>

            {/* Back Wall */}
            <mesh position={[0, 15, 0]}>
                <boxGeometry args={[80, 30, 4]} />
                <meshStandardMaterial color="#808080" />
            </mesh>

            {/* Floor */}
            <mesh position={[0, 0.25, 42]}>
                <boxGeometry args={[80, 0.5, 80]} />
                <meshStandardMaterial color="#A6703E" />
            </mesh>

            {/* Quest Board */}
            <group>
                {/* Top */}
                <mesh position={[0, 20, 2.5]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[30, 1, 1]} />
                    <meshStandardMaterial color="#643A16" />
                </mesh>

                {/* Bottom */}
                <mesh position={[0, 5, 2.5]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[30, 1, 1]} />
                    <meshStandardMaterial color="#643A16" />
                </mesh>

                {/* Right */}
                <mesh position={[14.5, 12.5, 2.5]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[1, 14, 1]} />
                    <meshStandardMaterial color="#643A16" />
                </mesh>

                {/* Left */}
                <mesh position={[-14.5, 12.5, 2.5]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[1, 14, 1]} />
                    <meshStandardMaterial color="#643A16" />
                </mesh>

                {/* Center */}
                <mesh position={[-0, 12.5, 2.25]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[28, 14, 0.25]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
            </group>

            {/* Cutting Board */}
            {/* <CuttingBoard position={[0, 4.45, 0.68]} scale={[7.5, 1, 15.8]} rotation={[Math.PI / 2, Math.PI / 2, 0]} /> */}

            {/* Quests */}

            {/* <group>
                <group position={[5, 5.5, 1]}>
                    <Paper scale={4} rotation={[Math.PI / -1.175, Math.PI / 1, Math.PI / 1]} />
                    <Html>1</Html>
                </group>
                <Paper position={[2.7, 5.2, 1]} scale={4} rotation={[Math.PI / -1.175, Math.PI / 1, Math.PI / 1.1]} />
                <Paper position={[0, 5.5, 1]} scale={4} rotation={[Math.PI / -1.175, Math.PI / 1, Math.PI / 1.2]} />
                <Paper position={[-2.5, 5.3, 1]} scale={4} rotation={[Math.PI / -1.175, Math.PI / 1, Math.PI / 1.2]} />
                <Paper position={[-4.5, 5.4, 1]} scale={4} rotation={[Math.PI / -1.175, Math.PI / 1, Math.PI / 1.3]} />
                <Paper position={[-3.7, 3.3, 1]} scale={4} rotation={[Math.PI / -1.175, Math.PI / 1, Math.PI / 1.2]} />
            </group> */}

            {/* Left Knife */}
            {/* <Knife position={[-3, 6.25, 1.6]} scale={1} rotation={[Math.PI / 4, Math.PI / -3.5, Math.PI / 1]} /> */}

            <Grid
                position={[0, 0, 0]}
                cellSize={1}
                cellThickness={1}
                cellColor="#6f6f6f"
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#000000"
                followCamera={false}
                infiniteGrid={true}
            />
        </>
    );
}
