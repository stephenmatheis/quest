import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import { Helper } from '@react-three/drei';
import { useCameraControls } from '@/providers/CameraProvider';
import { Box3, BoxHelper, Group, Vector3 } from 'three';

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
    const { toggleEnableCamera } = useCameraControls();
    const [isPointerDown, setIsPointerDown] = useState(false);
    const labelRef = useRef<Group>(null);

    const springs = useSpring({
        cy: isPointerDown ? -0.1 : 0,
        cz: isPointerDown ? -0.1 : 0,
        ly: isPointerDown ? -0.1 : 0,
        lz: isPointerDown ? 0 : 0,
        config: { mass: MASS, tension: TENSION, friction: FRICTION },
    });

    function handleDown(event: ThreeEvent<PointerEvent>) {
        event.stopPropagation();

        setIsPointerDown(true);
        toggleEnableCamera(false);
        action?.();

        const handleUp = () => {
            setIsPointerDown(false);
            toggleEnableCamera(true);
            window.removeEventListener('pointerup', handleUp);
            window.removeEventListener('pointercancel', handleUp);
        };

        window.addEventListener('pointerup', handleUp);
        window.addEventListener('pointercancel', handleUp);
    }

    useEffect(() => {
        if (!labelRef.current) return;

        const boundingBox = new Box3();
        const size = new Vector3();

        boundingBox.setFromObject(labelRef.current);
        boundingBox.getSize(size);

        // gapX = width / 10 divided by 2 is width / 20
        labelRef.current.position.set(width / 2 - (size.x + width / 20) / 2, height / 2 - size.y / 2, 0);
    }, []);

    return (
        <group>
            <animated.group position-y={springs.cy} position-z={springs.cz}>
                {children}
            </animated.group>
            <group ref={labelRef} position={[0, 0, 0]}>
                <animated.group position-y={springs.ly} position-z={springs.lz}>
                    {label}
                </animated.group>

                <Helper type={BoxHelper} args={['red']} />
            </group>
            <mesh onPointerDown={handleDown} position-z={0.05}>
                <boxGeometry args={[width, height, 0.2]} />
                <meshBasicMaterial visible={false} />
            </mesh>
        </group>
    );
}
