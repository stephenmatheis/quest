import { animated, useSpring } from '@react-spring/three';
import { useState, type ReactNode } from 'react';

const MASS = 2;
const TENSION = 360;
const FRICTION = 30;

export function Control({
    children,
    width,
    height,
    label,
}: {
    children: ReactNode;
    width: number;
    height: number;
    label: ReactNode;
}) {
    const [isOver, setIsOver] = useState<boolean>(false);
    const springs = useSpring({
        cy: isOver ? -0.1 : 0,
        cz: isOver ? -0.1 : 0,
        ly: isOver ? -0.1 : 0,
        lz: isOver ? 0 : 0.1,
        config: { mass: MASS, tension: TENSION, friction: FRICTION },
    });

    function handleOver() {
        setIsOver(true);
    }

    function handleOut() {
        setIsOver(false);
    }

    return (
        <>
            <group position={[0, 0, 0]}>
                <animated.mesh raycast={() => {}} position-y={springs.cy} position-z={springs.cz}>
                    {children}
                </animated.mesh>
                <mesh position={[width / 2, height / 2, 0]} onPointerOver={handleOver} onPointerOut={handleOut}>
                    <boxGeometry args={[width, height, 0.1]} />
                    <meshBasicMaterial visible={false} />
                </mesh>
            </group>
            <animated.group position={[0, 0, 0.1]} position-y={springs.ly} position-z={springs.lz}>
                {label}
            </animated.group>
        </>
    );
}
