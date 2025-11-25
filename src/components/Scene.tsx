import { useEffect } from 'react';
import { CameraControls, CameraControlsImpl, Grid } from '@react-three/drei';
import { useCamera } from '@/providers/CameraProvider';
import { WoodFloor } from '@/components/Models/WoodFloor';
import { WoodenWall } from '@/components/Models/WoodenWall';
import { StoneWall } from '@/components/Models/StoneWall';
import { Torch } from '@/components/Models/Torch';

const { ACTION } = CameraControlsImpl;

export function Scene() {
    const { cameraControlsRef, isCameraLocked } = useCamera();

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        // 1. Start FAR away — as if you just opened the door and are standing at the entrance
        controls.setLookAt(
            0,
            4.5,
            16, // far back, slightly lower than final position
            0,
            5,
            -10, // already looking straight at the quest board
            false
        );

        // 2. One frame later → smooth cinematic walk-up to the board
        requestAnimationFrame(() => {
            controls.setLookAt(
                0,
                4.5,
                11, // final position: close enough to read quests comfortably
                0,
                5,
                -10, // looking right at the center of the WoodenWall
                true
            );
        });

        // Polish settings (feel free to copy-paste)
        controls.minDistance = 2;
        controls.maxDistance = 30;
        controls.minPolarAngle = 0.2; // don’t look straight up
        controls.maxPolarAngle = Math.PI / 2; // don’t go under floor
        controls.smoothTime = 1.1; // cinematic walk speed
        controls.draggingSmoothTime = 0.12; // snappy when user grabs
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

            <directionalLight
                position={[8, 15, 10]}
                intensity={1.8}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
            />
            <hemisphereLight intensity={3.5} color="#ffd4a3" groundColor="#4a341f" />

            {/* Right Torch */}
            <pointLight position={[7.5, 6, 1]} intensity={10} color="#ffb84d" />
            <Torch position={[7.5, 5, 0.5]} scale={2} />

            {/* Center Torch */}
            {/* <pointLight position={[0, 9, 1]} intensity={10} color="#ffb84d" /> */}
            {/* <Torch position={[0, 8, 0.5]} scale={2} /> */}

            {/* Left Torch */}
            <pointLight position={[-7.5, 6, 1]} intensity={10} color="#ffb84d" />
            <Torch position={[-7.5, 5, 0.5]} scale={2} />

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
