import { animated, SpringValue } from '@react-spring/three';
import type { RefObject } from 'react';
import * as THREE from 'three';

export function Cover({
    ref,
    position,
    rotation,
    side = 'left',
}: {
    ref?: RefObject<THREE.Group | null>;
    position: [number, number, number] | SpringValue<[number, number, number]>;
    rotation: [number, number, number] | SpringValue<[number, number, number]>;
    side?: 'left' | 'right';
}) {
    const coverWidth = 1;
    const offsetX = side === 'left' ? -coverWidth / 2 : coverWidth / 2;

    return (
        <animated.group ref={ref} position={position} rotation={rotation as [number, number, number]}>
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
        </animated.group>
    );
}
