import { animated, type SpringValue } from '@react-spring/three';
import { useTexture, Edges, Text } from '@react-three/drei';
import type { RefObject } from 'react';
import * as THREE from 'three';

export function Page({
    ref,
    position,
    rotation,
    thickness = 0.25,
    side = 'left',
    edges = true,
    text,
}: {
    ref?: React.RefCallback<THREE.Group> | RefObject<THREE.Group>;
    position:
        | [number, number, number]
        | SpringValue<[number, number, number]>
        | [SpringValue<number>, SpringValue<number>, SpringValue<number>];
    rotation?: [number, number, number] | SpringValue<[number, number, number]>;
    thickness?: number;
    side?: 'left' | 'right';
    edges?: boolean;
    text?: string;
}) {
    const pageWidth = 0.95;
    const offsetX = side === 'left' ? -pageWidth / 2 : pageWidth / 2;

    const [pageTexture, sideTexture, topTexture] = useTexture([
        side === 'left' ? '/images/left.png' : '/images/right.png',
        '/images/side-long.png',
        '/images/side-short.png',
    ]);

    return (
        <animated.group ref={ref} position={position} rotation={rotation as [number, number, number]}>
            <group position={[offsetX, 0, 0]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.95, 1.15, thickness]} />
                    {/* <meshStandardMaterial color="hsla(35, 100%, 84%, 1.00)" /> */}
                    <meshStandardMaterial attach="material-0" map={sideTexture} />
                    <meshStandardMaterial attach="material-1" map={sideTexture} />
                    <meshStandardMaterial attach="material-2" map={topTexture} />
                    <meshStandardMaterial attach="material-3" map={topTexture} />
                    <meshStandardMaterial attach="material-4" map={pageTexture} />
                    <meshStandardMaterial attach="material-5" map={pageTexture} />
                    {edges && <Edges linewidth={3} scale={1.001} threshold={15} color="hsla(36, 75%, 30%, 1.00)" />}
                </mesh>
                {text && (
                    <Text
                        // position={[-0.3, 0.45, 0.0126]}
                        anchorY={'top'}
                        anchorX={'left'}
                        maxWidth={0.75}
                        position={[-0.375, 0.475, 0.0126]}
                        fontSize={0.045}
                        fontWeight={600}
                        lineHeight={1.25}
                        color="#623d09"
                        font="fonts/Texturina-VariableFont.ttf"
                        // maxWidth={0.95}
                        // position={[-0.475, 0.575, 0.0126]}
                        // font="fonts/Jacquard24-Regular.ttf"
                        // clipRect={[500, 500, 500, 500]}
                        // outlineColor="#623d09"
                        // color="orange"
                        // outlineColor="#000000"
                        // outlineWidth={0.002}
                        // outlineOffsetX={0.001}
                        // outlineOffsetY={0.001}
                    >
                        {text}
                    </Text>
                )}
            </group>
        </animated.group>
    );
}
