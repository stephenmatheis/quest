import { useEffect, useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { CameraControls, CameraControlsImpl, Edges, Grid, useHelper, useTexture } from '@react-three/drei';
import { useCamera } from '@/providers/CameraProvider';
import { DirectionalLightHelper, HemisphereLight, HemisphereLightHelper, type DirectionalLight } from 'three';
import * as THREE from 'three';

const { ACTION } = CameraControlsImpl;

function Cover({
    ref,
    position,
    rotation,
    side = 'left',
}: {
    ref?: RefObject<THREE.Group | null>;
    position: [number, number, number];
    rotation: [number, number, number];
    side?: 'left' | 'right';
}) {
    const coverWidth = 1;
    const offsetX = side === 'left' ? -coverWidth / 2 : coverWidth / 2;

    return (
        <group ref={ref} position={position} rotation={rotation}>
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
    ref,
    position,
    rotation,
    thickness = 0.25,
    side = 'left',
    texture,
}: {
    ref?: React.RefCallback<THREE.Group> | RefObject<THREE.Group>;
    position: [number, number, number];
    rotation?: [number, number, number];
    thickness?: number;
    side?: 'left' | 'right';
    texture?: string;
}) {
    const pageWidth = 0.95;
    const offsetX = side === 'left' ? -pageWidth / 2 : pageWidth / 2;
    const map = texture ? useTexture(texture) : null;

    return (
        <group ref={ref} position={position} rotation={rotation}>
            <group position={[offsetX, 0, 0]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.95, 1.15, thickness]} />
                    <meshStandardMaterial map={map} color="#efc88e" />
                    <Edges linewidth={3} scale={1} threshold={15} color="hsla(36, 75%, 30%, 1.00)" />
                </mesh>
            </group>
        </group>
    );
}

function Book() {
    const ANIMATE = true;

    const { cameraControlsRef } = useCamera();
    const startTime = useRef<number | null>(null);
    const delay = 0.5;
    const duration = 1;
    const rotate = 2;
    const pages = 10;
    const x = 0.025;
    const t = 2 - rotate;
    const bookRef = useRef<THREE.Group | null>(null);
    const leftCoverRef = useRef<THREE.Group | null>(null);
    const rightCoverRef = useRef<THREE.Group | null>(null);
    const leftPagesGroupRef = useRef<THREE.Group | null>(null);
    const leftPageRefs = useRef<(THREE.Group | null)[]>(null);
    leftPageRefs.current = Array(pages).fill(null);
    const rightPagesGroupRef = useRef<THREE.Group | null>(null);
    const rightPageRefs = useRef<(THREE.Group | null)[]>(null);
    rightPageRefs.current = Array(pages).fill(null);

    function easeOutQuint(t: number): number {
        return 1 - Math.pow(1 - t, 5);
    }

    useFrame((state) => {
        if (!ANIMATE) return;

        if (!startTime.current) {
            startTime.current = state.clock.getElapsedTime();
        }

        const elapsed = state.clock.getElapsedTime() - startTime.current;

        if (elapsed < delay) {
            return;
        }

        const offsetElapsed = elapsed - delay;

        if (offsetElapsed <= duration) {
            const progress = easeOutQuint(offsetElapsed / duration);
            const rotate = THREE.MathUtils.lerp(2, 1, progress);
            const coverX = THREE.MathUtils.lerp(0.3125, 0.25, progress);
            const coverZ = THREE.MathUtils.lerp(0.094, 0.1565, progress);
            const pagesXOffset = THREE.MathUtils.lerp(0.0125, 0.025, progress);

            leftCoverRef.current?.rotation.set(Math.PI, Math.PI / rotate, Math.PI);
            leftCoverRef.current?.position.set(-coverX, 0, coverZ);
            rightCoverRef.current?.rotation.set(Math.PI, Math.PI / -rotate, Math.PI);
            rightCoverRef.current?.position.set(coverX, 0, coverZ);
            leftPagesGroupRef.current?.position.set(-0.25 + pagesXOffset, 0, 0);
            rightPagesGroupRef.current?.position.set(0.25 - pagesXOffset, 0, 0);
            leftPageRefs.current!.forEach((page, i) => {
                const endZ = 0.2315 + 0.025 * i;
                const posZ = THREE.MathUtils.lerp(0.094, endZ, progress);
                const posX = i === 0 ? 0 : x * i;

                page?.rotation.set(Math.PI, Math.PI / rotate, Math.PI);
                page?.position.set(posX, 0, posZ);
            });
            rightPageRefs.current!.forEach((page, i) => {
                const endZ = 0.2315 + 0.025 * i;
                const posZ = THREE.MathUtils.lerp(0.094, endZ, progress);
                const posX = i === 0 ? 0 : x * -i;

                page?.rotation.set(Math.PI, Math.PI / -rotate, Math.PI);
                page?.position.set(posX, 0, posZ);
            });
        }
    });

    useEffect(() => {
        if (!ANIMATE) return;

        const controls = cameraControlsRef.current;

        if (!controls) return;

        // controls.setLookAt(0, 6, 5, 0, 6, 0, false);
        controls.setLookAt(0, 2, 0, -1, 6, 0, false); // NOTE: I don't know why these values work.

        requestAnimationFrame(() => {
            controls.setLookAt(0.15, 2, 5, 0, 1, 0, true);
        });
    }, [cameraControlsRef]);

    return (
        <group ref={bookRef} position={[0, 1, 0]} rotation={[Math.PI / 1.1, Math.PI, Math.PI]}>
            <Spine position={[0, 0, 0]} />
            <Cover
                ref={leftCoverRef}
                position={[-0.3125, 0, 0.094]}
                rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                side="left"
            />
            <Cover
                ref={rightCoverRef}
                position={[0.3125, 0, 0.094]}
                rotation={[Math.PI, Math.PI / -rotate, Math.PI]}
                side="right"
            />
            <group ref={leftPagesGroupRef} position={[-0.25 + 0.0125, 0, 0]}>
                {Array.from({ length: pages }).map((_, i) => {
                    const startingZ = 0.2315 + 0.025 * i;
                    const posX = i === 0 ? 0 : x * i;
                    const posZ = THREE.MathUtils.lerp(0.094, startingZ, t);

                    return (
                        <Page
                            key={i}
                            ref={(el) => {
                                leftPageRefs.current![i] = el;
                            }}
                            thickness={0.025}
                            position={[posX, 0, posZ]}
                            rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                            side="left"
                        />
                    );
                })}
            </group>
            <group ref={rightPagesGroupRef} position={[0.25 - 0.0125, 0, 0]}>
                {Array.from({ length: pages }).map((_, i) => {
                    const startingZ = 0.2315 + 0.025 * i;
                    const posX = i === 0 ? 0 : x * -i;
                    const posZ = THREE.MathUtils.lerp(0.094, startingZ, t);

                    return (
                        <Page
                            key={i}
                            ref={(el) => {
                                rightPageRefs.current![i] = el;
                            }}
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

export function AnimatedBook() {
    const { cameraControlsRef, isCameraLocked, showHelpers } = useCamera();
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
