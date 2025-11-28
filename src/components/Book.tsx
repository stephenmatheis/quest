import { useEffect, useRef } from 'react';
import { CameraControls, CameraControlsImpl, Grid, useHelper } from '@react-three/drei';
import { useCamera } from '@/providers/CameraProvider';
import { DirectionalLightHelper, type DirectionalLight } from 'three';

const { ACTION } = CameraControlsImpl;

function Cover({ position, side = 'left' }: { position: [number, number, number]; side?: 'left' | 'right' }) {
    return (
        <group position={position}>
            {/* Cover */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1.25, 0.125]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>

            {/* Corners */}
            <group position={[0, 0, -0.0625]}>
                {side === 'left' && (
                    <>
                        {/* Top Left */}
                        <group position={[-0.4375, 0.625, 0]}>
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[0.25, 0.125, 0.125]} />
                                <meshStandardMaterial color="#00ffff" />
                            </mesh>
                            <mesh position={[-0.0625, -0.125, 0]}>
                                <boxGeometry args={[0.125, 0.125, 0.125]} />
                                <meshStandardMaterial color="#00ffff" />
                            </mesh>
                        </group>
                        {/* Bottom Left */}
                        <group position={[-0.4375, -0.625, 0]} rotation={[Math.PI, 0, 0]}>
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[0.25, 0.125, 0.125]} />
                                <meshStandardMaterial color="#00ffff" />
                            </mesh>
                            <mesh position={[-0.0625, -0.125, 0]}>
                                <boxGeometry args={[0.125, 0.125, 0.125]} />
                                <meshStandardMaterial color="#00ffff" />
                            </mesh>
                        </group>
                    </>
                )}

                {side === 'right' && (
                    <>
                        {/* Top Right */}
                        <group position={[0.4375, 0.625, 0]} rotation={[0, Math.PI, 0]}>
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[0.25, 0.125, 0.125]} />
                                <meshStandardMaterial color="#00ffff" />
                            </mesh>
                            <mesh position={[-0.0625, -0.125, 0]}>
                                <boxGeometry args={[0.125, 0.125, 0.125]} />
                                <meshStandardMaterial color="#00ffff" />
                            </mesh>
                        </group>
                        {/* Bottom Right */}
                        <group position={[0.4375, -0.625, 0]} rotation={[Math.PI, Math.PI, 0]}>
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[0.25, 0.125, 0.125]} />
                                <meshStandardMaterial color="#00ffff" />
                            </mesh>
                            <mesh position={[-0.0625, -0.125, 0]}>
                                <boxGeometry args={[0.125, 0.125, 0.125]} />
                                <meshStandardMaterial color="#00ffff" />
                            </mesh>
                        </group>
                    </>
                )}
            </group>
        </group>
    );
}

function Spine() {
    return (
        <group position={[0, 0, -0.5]}>
            {/* <group position={[0, 0, -0.1875]}> */}
            <mesh>
                <boxGeometry args={[0.5, 1.25, 0.0625]} />
                <meshStandardMaterial color="#00ffff" />
            </mesh>

            <mesh position={[0, 0, -0.0625]}>
                <boxGeometry args={[0.375, 1.25, 0.0625]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>

            <mesh position={[-0.21875, 0, 0.0625]}>
                <boxGeometry args={[0.0625, 1.25, 0.0625]} />
                <meshStandardMaterial color="#00ffff" />
            </mesh>

            <mesh position={[0.21875, 0, 0.0625]}>
                <boxGeometry args={[0.0625, 1.25, 0.0625]} />
                <meshStandardMaterial color="#00ffff" />
            </mesh>

            {/* Top Left */}
            <mesh position={[-0.21875, 0.59375, -0.0625]}>
                <boxGeometry args={[0.0625, 0.0625, 0.0625]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>

            {/* Top Right */}
            <mesh position={[0.21875, 0.59375, -0.0625]}>
                <boxGeometry args={[0.0625, 0.0625, 0.0625]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>

            {/* Bottom Left */}
            <mesh position={[-0.21875, -0.59375, -0.0625]}>
                <boxGeometry args={[0.0625, 0.0625, 0.0625]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>

            {/* Bottom Right */}
            <mesh position={[0.21875, -0.59375, -0.0625]}>
                <boxGeometry args={[0.0625, 0.0625, 0.0625]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>
        </group>
    );
}

export function Book() {
    const { cameraControlsRef, isCameraLocked, start, end, showHelpers } = useCamera();
    const dirLightRef = useRef<DirectionalLight>(null);

    useHelper(
        showHelpers ? (dirLightRef as React.RefObject<DirectionalLight>) : false,
        DirectionalLightHelper,
        1,
        'red'
    );

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(
            0, // posX
            1, // posY
            3, // posZ
            0, // lookAtX
            1, // lookAtY
            0, // lookAtZ
            false
        );
    }, [cameraControlsRef, end, start]);

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
            <ambientLight intensity={0.5} />
            <directionalLight ref={dirLightRef} position={[4, 5, 3]} intensity={2} />

            {/* Book */}
            <group position={[0, 1, -1]}>
                <Cover position={[-0.75, 0, 0]} side="left" />
                <Cover position={[0.75, 0, 0]} side="right" />
                <Spine />
            </group>

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
