import { animated, useSpring } from '@react-spring/three';
import { useEffect, useState, type ReactNode } from 'react';

const MASS = 2;
const TENSION = 360;
const FRICTION = 30;

export function Control({
    children,
    width,
    height,
    label,
    code,
}: {
    children: ReactNode;
    width: number;
    height: number;
    label: ReactNode;
    code?: string;
}) {
    const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
    const springs = useSpring({
        cy: isPointerDown ? -0.1 : 0,
        cz: isPointerDown ? -0.1 : 0,
        ly: isPointerDown ? -0.1 : 0,
        lz: isPointerDown ? 0 : 0.1,
        config: { mass: MASS, tension: TENSION, friction: FRICTION },
    });

    function handleDown() {
        setIsPointerDown(true);
    }

    function handleUp() {
        setIsPointerDown(false);
    }

    useEffect(() => {
        function onKeydown(event: KeyboardEvent) {
            // event.stopPropagation();
            // event.preventDefault();

            console.log(event.code);

            if (event.code === code) {
                setIsPointerDown(true);
            }
        }

        function onKeyup(event: KeyboardEvent) {
            // event.stopPropagation();
            // event.preventDefault();

            if (event.code === code) {
                setIsPointerDown(false);
            }
        }

        window.addEventListener('keydown', onKeydown);
        window.addEventListener('keyup', onKeyup);

        return () => {
            window.removeEventListener('keydown', onKeydown);
            window.removeEventListener('keyup', onKeyup);
        };
    }, []);

    return (
        <>
            <group position={[0, 0, 0]}>
                <animated.mesh raycast={() => {}} position-y={springs.cy} position-z={springs.cz}>
                    {children}
                </animated.mesh>
                <mesh
                    position={[width / 2, height / 2, 0]}
                    onPointerDown={handleDown}
                    onPointerUp={handleUp}
                    // onPointerOver={handleDown}
                    // onPointerOut={handleUp}
                >
                    <boxGeometry args={[width, height, 0.1]} />
                    <meshBasicMaterial visible={false} />
                </mesh>
            </group>
            <animated.group position={[0, 0, 0.1]} position-y={springs.ly} position-z={springs.lz} raycast={() => {}}>
                {label}
            </animated.group>
        </>
    );
}
