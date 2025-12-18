import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animated, useSpring } from '@react-spring/three';
import { useCameraControls } from '@/providers/CameraProvider';
import { Box3, Group, Vector3 } from 'three';

const MASS = 2;
const TENSION = 360;
const FRICTION = 30;
const PADDING = 0;

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
    const labelRef = useRef<Group>(null);
    const { toggleEnableCamera } = useCameraControls();
    const [isPointerDown, setIsPointerDown] = useState(false);
    const { down } = useSpring({
        down: isPointerDown ? -0.1 : 0,
        config: { mass: MASS, tension: TENSION, friction: FRICTION },
    });

    function handleDown() {
        setIsPointerDown(true);
    }

    function handleUp() {
        setIsPointerDown(false);
        action?.();
    }

    function handleEnter() {
        toggleEnableCamera(false);
    }

    function handleOut() {
        toggleEnableCamera(true);
    }

    useEffect(() => {
        if (!labelRef.current) return;

        const boundingBox = new Box3();
        const size = new Vector3();

        boundingBox.setFromObject(labelRef.current);
        boundingBox.getSize(size);

        labelRef.current.position.set(width / 2 - (size.x + PADDING) / 2, height / 2 - size.y / 2, 0);
    }, []);

    return (
        <group>
            <animated.group position-y={down} position-z={down}>
                {children}
            </animated.group>

            <mesh
                position={[width / 2, height / 2, 0]}
                onPointerDown={handleDown}
                onPointerUp={handleUp}
                onPointerEnter={handleEnter}
                onPointerOut={handleOut}
            >
                <boxGeometry args={[width, height, 0.1]} />
                <meshBasicMaterial visible={false} />
            </mesh>

            <group ref={labelRef} position={[0, 0, 0]}>
                <animated.group position={[0, 0, 0.1]} position-y={down} position-z={down}>
                    {label}
                </animated.group>
            </group>
        </group>
    );
}
