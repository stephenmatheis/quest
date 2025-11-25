import { useEffect, useRef } from 'react';
import { CameraControls, CameraControlsImpl, Grid, useHelper } from '@react-three/drei';
import { useCamera } from '@/providers/CameraProvider';
import { WoodFloor } from '@/components/Models/WoodFloor';
import { WoodenWall } from '@/components/Models/WoodenWall';
import { StoneWall } from '@/components/Models/StoneWall';
import { Torch } from '@/components/Models/Torch';
import { DirectionalLight, DirectionalLightHelper, HemisphereLight, HemisphereLightHelper } from 'three';

const { ACTION } = CameraControlsImpl;

export function Scene() {
    const { cameraControlsRef, isCameraLocked } = useCamera();
    const rightDirLightRef = useRef<DirectionalLight>(null);
    const leftDirLightRef = useRef<DirectionalLight>(null);
    const hemiLightRef = useRef<HemisphereLight>(null);

    useHelper(rightDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 2, 'red');
    useHelper(leftDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 2, 'red');
    useHelper(hemiLightRef as React.RefObject<HemisphereLight>, HemisphereLightHelper, 2, 'red');

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        // controls.setLookAt(0, 24, 48, 0, 0, -24, false);

        // start
        controls.setLookAt(0, 4.5, 16, 0, 5, -10, false);

        // end
        requestAnimationFrame(() => {
            controls.setLookAt(0, 4.5, 11, 0, 5, -10, true);
        });

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
            <directionalLight ref={rightDirLightRef} position={[20, 7, 12]} intensity={0.5} />
            <directionalLight ref={leftDirLightRef} position={[-20, 7, 12]} intensity={0.5} />
            <hemisphereLight
                ref={hemiLightRef}
                position={[0, 5, 16]}
                intensity={5}
                // color="#ffd4a3"
                color="#fff2e2"
                groundColor="#4a341f"
            />

            {/* Right Torch */}
            <pointLight position={[7.5, 6, 1]} intensity={15} color="#ffb84d" />
            <Torch position={[7.5, 5, 0.5]} scale={2} />

            {/* Left Torch */}
            <pointLight position={[-7.5, 6, 1]} intensity={15} color="#ffb84d" />
            <Torch position={[-7.5, 5, 0.5]} scale={2} />

            {/* Roof */}
            <group>
                {/* <mesh position={[-16, 10, 8]} rotation={[0, 0, Math.PI / -4]}> */}
                <mesh position={[0, 10, 8]} rotation={[0, 0, 0]}>
                    {/* <boxGeometry args={[1, 10, 20]} /> */}
                    <boxGeometry args={[32, 1, 16]} />
                    <meshStandardMaterial color="#643A16" />
                </mesh>
            </group>

            {/* Floor */}
            <group>
                <WoodFloor position={[-16, 0, 0]} />
                <WoodFloor position={[-12, 0, 0]} />
                <WoodFloor position={[-8, 0, 0]} />
                <WoodFloor position={[-4, 0, 0]} />
                <WoodFloor position={[0, 0, 0]} />
                <WoodFloor position={[4, 0, 0]} />
                <WoodFloor position={[8, 0, 0]} />
                <WoodFloor position={[12, 0, 0]} />
                <WoodFloor position={[16, 0, 0]} />

                <WoodFloor position={[-16, 0, 4]} />
                <WoodFloor position={[-12, 0, 4]} />
                <WoodFloor position={[-8, 0, 4]} />
                <WoodFloor position={[-4, 0, 4]} />
                <WoodFloor position={[0, 0, 4]} />
                <WoodFloor position={[4, 0, 4]} />
                <WoodFloor position={[8, 0, 4]} />
                <WoodFloor position={[12, 0, 4]} />
                <WoodFloor position={[16, 0, 4]} />

                <WoodFloor position={[-16, 0, 8]} />
                <WoodFloor position={[-12, 0, 8]} />
                <WoodFloor position={[-8, 0, 8]} />
                <WoodFloor position={[-4, 0, 8]} />
                <WoodFloor position={[0, 0, 8]} />
                <WoodFloor position={[4, 0, 8]} />
                <WoodFloor position={[8, 0, 8]} />
                <WoodFloor position={[12, 0, 8]} />
                <WoodFloor position={[16, 0, 8]} />

                <WoodFloor position={[-16, 0, 12]} />
                <WoodFloor position={[-12, 0, 12]} />
                <WoodFloor position={[-8, 0, 12]} />
                <WoodFloor position={[-4, 0, 12]} />
                <WoodFloor position={[0, 0, 12]} />
                <WoodFloor position={[4, 0, 12]} />
                <WoodFloor position={[8, 0, 12]} />
                <WoodFloor position={[12, 0, 12]} />
                <WoodFloor position={[16, 0, 12]} />
            </group>

            {/* Stone Wall */}
            <group>
                <StoneWall position={[-12, 0, 0]} scale={4} />
                <StoneWall position={[-8, 0, 0]} scale={4} />
                <StoneWall position={[-4, 0, 0]} scale={4} />
                <StoneWall position={[0, 0, 0]} scale={4} />
                <StoneWall position={[4, 0, 0]} scale={4} />
                <StoneWall position={[8, 0, 0]} scale={4} />
                <StoneWall position={[12, 0, 0]} scale={4} />

                <StoneWall position={[-12, 8, 0]} scale={4} />
                <StoneWall position={[-8, 8, 0]} scale={4} />
                <StoneWall position={[-4, 8, 0]} scale={4} />
                <StoneWall position={[0, 8, 0]} scale={4} />
                <StoneWall position={[4, 8, 0]} scale={4} />
                <StoneWall position={[8, 8, 0]} scale={4} />
                <StoneWall position={[12, 8, 0]} scale={4} />
            </group>

            {/* Board */}
            <WoodenWall position={[0, 2, 0.3]} scale={10} />

            {/* Helpers */}
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
