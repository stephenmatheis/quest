import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Box3, Group, Vector3 } from 'three';
import { animated, useSpring } from '@react-spring/three';

const MASS = 2;
const TENSION = 360;
const FRICTION = 30;
const PADDING = 0;

export function Tool({
    children,
    width,
    height,
    label,
    material,
    geometry,
    action,
}: {
    children: ReactNode;
    width: number;
    height: number;
    label: ReactNode;
    material: any;
    geometry: any;
    action: () => void;
}) {
    const labelRef = useRef<Group>(null);
    const [isActive, setIsActive] = useState(false);
    const { pos } = useSpring({
        pos: isActive ? -0.1 : 0,
        config: { mass: MASS, tension: TENSION, friction: FRICTION },
    });

    function handleDown() {
        setIsActive(true);

        window.addEventListener('pointerup', handleUp);
        window.addEventListener('pointercancel', handleUp);

        function handleUp() {
            setIsActive(false);
            action?.();

            window.removeEventListener('pointerup', handleUp);
            window.removeEventListener('pointercancel', handleUp);
        }
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
            <animated.group position-y={pos} position-z={pos} raycast={() => {}}>
                {children}
            </animated.group>

            <mesh geometry={geometry} material={material} onPointerDown={handleDown} />

            <group ref={labelRef} position={[0, 0, 0]} raycast={() => {}}>
                <animated.group position={[0, 0, 0.1]} position-y={pos} position-z={pos}>
                    {label}
                </animated.group>
            </group>
        </group>
    );
}
