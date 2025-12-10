import { animated } from '@react-spring/three';
import { type ReactNode } from 'react';

export function ControlPlaceholder({
    children,
    width,
    height,
}: {
    children: ReactNode;
    width: number;
    height: number;
}) {
    return (
        <>
            <group position={[0, 0, 0]}>
                <animated.mesh raycast={() => {}}>{children}</animated.mesh>
                <mesh position={[width / 2, height / 2, 0]}>
                    <boxGeometry args={[width, height, 0.1]} />
                    <meshBasicMaterial visible={false} />
                </mesh>
            </group>
        </>
    );
}
