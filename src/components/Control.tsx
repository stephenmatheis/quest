import { useCameraControls } from '@/providers/CameraProvider';
import { animated, useSpring } from '@react-spring/three';
import type { ThreeEvent } from '@react-three/fiber';
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
    const { toggleEnableCamera } = useCameraControls();
    const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
    const springs = useSpring({
        cy: isPointerDown ? -0.1 : 0,
        cz: isPointerDown ? -0.1 : 0,
        ly: isPointerDown ? -0.1 : 0,
        lz: isPointerDown ? 0 : 0.1,
        config: { mass: MASS, tension: TENSION, friction: FRICTION },
    });

    function handleDown(event: ThreeEvent<PointerEvent>) {
        console.log(event);
        
        setIsPointerDown(true);
        toggleEnableCamera(false);

        function handleKeyRelease() {
            setIsPointerDown(false);

            window.removeEventListener('pointerup', handleKeyRelease);
            window.removeEventListener('pointercancel', handleKeyRelease);
        }

        window.addEventListener('pointerup', handleKeyRelease);
        window.addEventListener('pointercancel', handleKeyRelease);
    }

    useEffect(() => {
        function onKeydown(event: KeyboardEvent) {
            console.log(event.code);

            if (event.code === code) {
                setIsPointerDown(true);
            }
        }

        function onKeyup(event: KeyboardEvent) {
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
                <mesh position={[width / 2, height / 2, 0]} onPointerDown={handleDown}>
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
