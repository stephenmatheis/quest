import { useTexture, Edges } from '@react-three/drei';
import type { RefObject } from 'react';
import * as THREE from 'three';

export function Page({
    ref, position, rotation, thickness = 0.25, side = 'left', texture,
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
