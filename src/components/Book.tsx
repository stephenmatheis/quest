import { useEffect, useRef } from 'react';
import { CameraControls, CameraControlsImpl, Grid, useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import { useCamera } from '@/providers/CameraProvider';
import { DirectionalLightHelper, HemisphereLight, HemisphereLightHelper, type DirectionalLight } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const { ACTION } = CameraControlsImpl;

function Cover({
    position,
    rotation,
    side = 'left',
}: {
    position: [number, number, number];
    rotation: [number, number, number];
    side?: 'left' | 'right';
}) {
    const coverWidth = 1;
    const offsetX = side === 'left' ? -coverWidth / 2 : coverWidth / 2;

    return (
        <group position={position} rotation={rotation}>
            <group position={[offsetX, 0, 0]}>
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
        </group>
    );
}

function Spine({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={[0.625, 1.25, 0.0625]} />
                <meshStandardMaterial color="#00ffff" />
            </mesh>

            <mesh position={[0, 0, -0.0625]}>
                <boxGeometry args={[0.375, 1.25, 0.0625]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>

            <mesh position={[-0.28125, 0, 0.0625]}>
                <boxGeometry args={[0.0625, 1.25, 0.0625]} />
                <meshStandardMaterial color="#00ffff" />
            </mesh>

            <mesh position={[0.28125, 0, 0.0625]}>
                <boxGeometry args={[0.0625, 1.25, 0.0625]} />
                <meshStandardMaterial color="#00ffff" />
            </mesh>

            {/* Top Left */}
            <mesh position={[-0.21875, 0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>

            {/* Top Right */}
            <mesh position={[0.21875, 0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>

            {/* Bottom Left */}
            <mesh position={[-0.21875, -0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>

            {/* Bottom Right */}
            <mesh position={[0.21875, -0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>
        </group>
    );
}

function Page({
    position,
    rotation,
    thickness = 0.25,
    side = 'left',
}: {
    position: [number, number, number];
    rotation?: [number, number, number];
    thickness?: number;
    side?: 'left' | 'right';
}) {
    const pageWidth = 0.95;
    const offsetX = side === 'left' ? -pageWidth / 2 : pageWidth / 2;

    return (
        <group position={position} rotation={rotation}>
            <group position={[offsetX, 0, 0]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.95, 1.15, thickness]} />
                    <meshStandardMaterial color="hsla(0, 0%, 100%, 1.00)" />
                </mesh>
            </group>
        </group>
    );
}

function Exploded() {
    return (
        <group position={[15, 1, 0]}>
            <Cover position={[-0.75, 0, 0]} rotation={[Math.PI, Math.PI, Math.PI]} side="left" />
            <Cover position={[0.75, 0, 0]} rotation={[Math.PI, Math.PI, Math.PI]} side="right" />
            <Spine position={[0, 0, -0.5]} />

            {/* Left */}
            <Page position={[-0.75, 0, 1]} rotation={[Math.PI, Math.PI, Math.PI]} />

            {/* Right */}
            <Page position={[0.75, 0, 1]} rotation={[Math.PI, Math.PI, Math.PI]} />
        </group>
    );
}

function Closed() {
    return (
        <group position={[10, 1, 0]}>
            <Cover position={[-0.3125, 0, 0.0935]} rotation={[Math.PI, Math.PI / 2, Math.PI]} side="left" />
            <Cover position={[0.3125, 0, 0.0935]} rotation={[Math.PI, Math.PI / -2, Math.PI]} side="right" />

            <Spine position={[0, 0, 0]} />

            {/* Left */}
            <Page position={[-0.125, 0, 0.5685]} rotation={[Math.PI, Math.PI / 2, Math.PI]} />

            {/* Right */}
            <Page position={[0.125, 0, 0.5685]} rotation={[Math.PI, Math.PI / 2, Math.PI]} />
        </group>
    );
}

function Opened() {
    const rotate = 1;

    return (
        <group position={[5, 1, 0]}>
            <Cover position={[-0.25, 0, 0.1565]} rotation={[Math.PI, Math.PI, Math.PI]} side="left" />
            <Cover position={[0.25, 0, 0.1565]} rotation={[Math.PI, Math.PI, Math.PI]} side="right" />
            <Spine position={[0, 0, 0]} />

            {/* Left */}
            <group position={[-0.25, 0, 0]}>
                <Page
                    thickness={0.025}
                    position={[0, 0, 0.2315 + 0]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="left"
                />
                <Page
                    thickness={0.025}
                    position={[0.05 * 1, 0, 0.2315 + 0.025]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="left"
                />
                <Page
                    thickness={0.025}
                    position={[0.05 * 2, 0, 0.2315 + 0.025 * 2]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="left"
                />
                <Page
                    thickness={0.025}
                    position={[0.05 * 3, 0, 0.2315 + 0.025 * 3]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="left"
                />
                <Page
                    thickness={0.025}
                    position={[0.05 * 4, 0, 0.2315 + 0.025 * 4]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="left"
                />
                <Page
                    thickness={0.025}
                    position={[0.05 * 5, 0, 0.2315 + 0.025 * 5]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="left"
                />
            </group>

            {/* Right */}
            <group position={[0.25, 0, 0]}>
                <Page
                    thickness={0.025}
                    position={[0, 0, 0.2315 + 0]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="right"
                />
                <Page
                    thickness={0.025}
                    position={[0.05 * -1, 0, 0.2315 + 0.025]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="right"
                />
                <Page
                    thickness={0.025}
                    position={[0.05 * -2, 0, 0.2315 + 0.025 * 2]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="right"
                />
                <Page
                    thickness={0.025}
                    position={[0.05 * -3, 0, 0.2315 + 0.025 * 3]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="right"
                />
                <Page
                    thickness={0.025}
                    position={[0.05 * -4, 0, 0.2315 + 0.025 * 4]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="right"
                />
                <Page
                    thickness={0.025}
                    position={[0.05 * -5, 0, 0.2315 + 0.025 * 5]}
                    rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                    side="right"
                />
            </group>
        </group>
    );
}

function OpenedWithPages() {
    const x = 0.025;
    const { rotate } = useControls({
        rotate: {
            value: 1,
            min: 1,
            max: 2,
            step: 0.001,
        },
    });

    const t = 2 - rotate;
    const leftPagesXOffset = THREE.MathUtils.lerp(0.0125, 0.025, t);
    // const leftPagesXOffset = 0.0125;
    // const leftPagesXOffset = 0.025;
    const pages = 10;

    return (
        <group position={[0, 1, 0]} rotation={[Math.PI / 1.25, Math.PI, Math.PI]}>
            <Spine position={[0, 0, 0]} />
            <Cover position={[-0.25, 0, 0.1565]} rotation={[Math.PI, Math.PI, Math.PI]} side="left" />
            <Cover position={[0.25, 0, 0.1565]} rotation={[Math.PI, Math.PI, Math.PI]} side="right" />
            <group position={[-0.25 + leftPagesXOffset, 0, 0]}>
                {/* 
                
                NOTE:  

                Page thickness is 0.025. Spine thickness is .5.
                Spine / Page = 20 pages. 10 ages per side.

                However, pages are offset to mat the cover's edge.
                So I added an 11th page to each side.
                
                */}
                {Array.from({ length: pages }).map((_, i) => {
                    const startingZ = 0.2315 + 0.025 * i;
                    const posX = i === 0 ? 0 : x * i; // rotate = 2
                    const posZ = THREE.MathUtils.lerp(0.219, startingZ, t);

                    return (
                        <Page
                            key={i}
                            thickness={0.025}
                            position={[posX, 0, posZ]}
                            rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                            side="left"
                        />
                    );
                })}
            </group>
            <group position={[0.25 - leftPagesXOffset, 0, 0]}>
                {Array.from({ length: pages }).map((_, i) => {
                    const startingZ = 0.2315 + 0.025 * i;
                    const posX = i === 0 ? 0 : x * -i;
                    const posZ = THREE.MathUtils.lerp(0.219, startingZ, t);

                    return (
                        <Page
                            key={i}
                            thickness={0.025}
                            position={[posX, 0, posZ]}
                            rotation={[Math.PI, Math.PI / -rotate, Math.PI]}
                            side="right"
                        />
                    );
                })}
            </group>
        </group>
    );
}

export function Book() {
    const { cameraControlsRef, isCameraLocked, start, end, showHelpers } = useCamera();
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

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(
            0, // posX
            3, // posY
            5, // posZ
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
            <directionalLight ref={dirLightRef} position={[5, 2, 3]} intensity={2} />
            <hemisphereLight
                ref={hemiLightRef}
                position={[0, 2, 5]}
                intensity={0.75}
                color="#ffffff"
                groundColor="brown"
            />
            <Exploded />
            <Closed />
            <Opened />
            <OpenedWithPages />

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
