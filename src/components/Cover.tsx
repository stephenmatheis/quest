import { animated, SpringValue } from '@react-spring/three';
import { Edges } from '@react-three/drei';
import { type RefObject } from 'react';
import * as THREE from 'three';

const COVER_COLOR = 'hsla(21, 25%, 35%, 1.00)';
const COVER_EDGE_COLOR = 'hsla(21, 25%, 30%, 1.00)';
const CORNER_COLOR = 'hsla(45, 100%, 50%, 1.00)';
const CORNER_EDGE_COLOR = 'hsla(45, 100%, 41%, 1.00)';

export function Cover({
    ref,
    position,
    rotation,
    side = 'left',
    edges = true,
}: {
    ref?: RefObject<THREE.Group | null>;
    position: [number, number, number] | SpringValue<[number, number, number]>;
    rotation: [number, number, number] | SpringValue<[number, number, number]>;
    side?: 'left' | 'right';
    edges?: boolean;
}) {
    const coverWidth = 1;
    const offsetX = side === 'left' ? -coverWidth / 2 : coverWidth / 2;

    return (
        <animated.group ref={ref} position={position} rotation={rotation as [number, number, number]}>
            <group position={[offsetX, 0, 0]}>
                {/* Cover */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1, 1.25, 0.125]} />
                    <meshStandardMaterial color={COVER_COLOR} />
                    {edges && <Edges linewidth={3} scale={1.0001} threshold={15} color={COVER_EDGE_COLOR} />}
                </mesh>

                {/* Corners */}
                <group position={[0, 0, -0.0625]}>
                    {side === 'left' && (
                        <>
                            {/* Top Left */}
                            <group position={[-0.4375, 0.625, 0]}>
                                <mesh position={[0, 0, 0]}>
                                    <boxGeometry args={[0.25, 0.125, 0.125]} />
                                    <meshStandardMaterial color={CORNER_COLOR} />
                                    {edges && (
                                        <Edges linewidth={3} scale={1.0001} threshold={15} color={CORNER_EDGE_COLOR} />
                                    )}
                                </mesh>
                                <mesh position={[-0.0625, -0.125, 0]}>
                                    <boxGeometry args={[0.125, 0.125, 0.125]} />
                                    <meshStandardMaterial color={CORNER_COLOR} />
                                    {edges && (
                                        <Edges linewidth={3} scale={1.0001} threshold={15} color={CORNER_EDGE_COLOR} />
                                    )}
                                </mesh>
                            </group>
                            {/* Bottom Left */}
                            <group position={[-0.4375, -0.625, 0]} rotation={[Math.PI, 0, 0]}>
                                <mesh position={[0, 0, 0]}>
                                    <boxGeometry args={[0.25, 0.125, 0.125]} />
                                    <meshStandardMaterial color={CORNER_COLOR} />
                                    {edges && (
                                        <Edges linewidth={3} scale={1.0001} threshold={15} color={CORNER_EDGE_COLOR} />
                                    )}
                                </mesh>
                                <mesh position={[-0.0625, -0.125, 0]}>
                                    <boxGeometry args={[0.125, 0.125, 0.125]} />
                                    <meshStandardMaterial color={CORNER_COLOR} />
                                    {edges && (
                                        <Edges linewidth={3} scale={1.0001} threshold={15} color={CORNER_EDGE_COLOR} />
                                    )}
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
                                    <meshStandardMaterial color={CORNER_COLOR} />
                                    {edges && (
                                        <Edges linewidth={3} scale={1.0001} threshold={15} color={CORNER_EDGE_COLOR} />
                                    )}
                                </mesh>
                                <mesh position={[-0.0625, -0.125, 0]}>
                                    <boxGeometry args={[0.125, 0.125, 0.125]} />
                                    <meshStandardMaterial color={CORNER_COLOR} />
                                    {edges && (
                                        <Edges linewidth={3} scale={1.0001} threshold={15} color={CORNER_EDGE_COLOR} />
                                    )}
                                </mesh>
                            </group>
                            {/* Bottom Right */}
                            <group position={[0.4375, -0.625, 0]} rotation={[Math.PI, Math.PI, 0]}>
                                <mesh position={[0, 0, 0]}>
                                    <boxGeometry args={[0.25, 0.125, 0.125]} />
                                    <meshStandardMaterial color={CORNER_COLOR} />
                                    {edges && (
                                        <Edges linewidth={3} scale={1.0001} threshold={15} color={CORNER_EDGE_COLOR} />
                                    )}
                                </mesh>
                                <mesh position={[-0.0625, -0.125, 0]}>
                                    <boxGeometry args={[0.125, 0.125, 0.125]} />
                                    <meshStandardMaterial color={CORNER_COLOR} />
                                    {edges && (
                                        <Edges linewidth={3} scale={1.0001} threshold={15} color={CORNER_EDGE_COLOR} />
                                    )}
                                </mesh>
                            </group>
                        </>
                    )}
                </group>
            </group>
        </animated.group>
    );
}
