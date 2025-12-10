import { animated, useSpring } from '@react-spring/three';
import { Center } from '@react-three/drei';
import { useState, type ReactNode } from 'react';

const MASS = 2;
const TENSION = 360;
const FRICTION = 30;

export function Tool({
    children,
    width,
    height,
    label,
    action,
}: {
    children: ReactNode;
    width: number;
    height: number;
    label: ReactNode;
    action: () => void;
}) {
    const [isOver, setIsOver] = useState<boolean>(false);
    const [isPointerDown, setIsPointerDown] = useState<boolean>(false);

    const springs = useSpring({
        controlClickY: isPointerDown ? -0.1 : 0,
        controlClickZ: isPointerDown ? -0.1 : 0,
        labelClickY: isPointerDown ? -0.1 : 0,
        labelClickZ: isPointerDown ? 0 : 0.1,
        controlHoverY: isOver ? 0.05 : 0,
        controlHoverZ: isOver ? 0.05 : 0,
        labelHoverY: isOver ? 0.05 : 0,
        labelHoverZ: isOver ? 0.15 : 0.1,
        config: { mass: MASS, tension: TENSION, friction: FRICTION },
    });

    function handleOver() {
        setIsOver(true);
    }

    function handleOut() {
        setIsOver(false);
    }

    function handlePointerDown() {
        setIsPointerDown(true);
    }

    function handlePointerUp() {
        setIsPointerDown(false);
    }

    return (
        <>
            <group position={[0, 0, 0]}>
                <animated.mesh raycast={() => {}} position-y={springs.controlHoverY} position-z={springs.controlHoverZ}>
                    <animated.mesh
                        raycast={() => {}}
                        position-y={springs.controlClickY}
                        position-z={springs.controlClickZ}
                    >
                        {children}
                    </animated.mesh>
                </animated.mesh>
                <mesh
                    onClick={() => action?.()}
                    position={[width / 2, height / 2, 0]}
                    onPointerOver={handleOver}
                    onPointerOut={handleOut}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                >
                    <boxGeometry args={[width, height, 0.1]} />
                    <animated.meshBasicMaterial visible={false} />
                </mesh>
            </group>
            <animated.group position={[0, 0, 0.1]} position-y={springs.labelHoverY} position-z={springs.labelHoverZ}>
                <Center position={[width / 2 + 0.025, height / 2 - 0.0125, 0]}>
                    <animated.mesh position-y={springs.labelClickY} position-z={springs.labelClickZ}>
                        {label}
                    </animated.mesh>
                </Center>
            </animated.group>
        </>
    );
}
