import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Box3, Vector3, type Group } from 'three';
import { animated, useSpring } from '@react-spring/three';
import { useHud } from '@/providers/HudProvider';
import { Label } from '@/components/Label';

const MASS = 2;
const TENSION = 360;
const FRICTION = 30;
const PADDING = 0.0175;

export function Control({
    children,
    width,
    height,
    label,
    code,
    material,
    geometry,
}: {
    children: ReactNode;
    width: number;
    height: number;
    label: string;
    code?: string;
    material: any;
    geometry: any;
}) {
    const { perspectiveKeyboard } = useHud();
    const labelRef = useRef<Group>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const springs = useSpring({
        cy: isActive ? -0.1 : 0,
        cz: isActive ? -0.1 : 0,
        ly: isActive ? -0.1 : 0,
        lz: isActive ? 0 : 0.1,
        config: { mass: MASS, tension: TENSION, friction: FRICTION },
    });

    function handleDown() {
        setIsActive(true);

        window.addEventListener('pointerup', handleKeyRelease);
        window.addEventListener('pointercancel', handleKeyRelease);

        function handleKeyRelease() {
            setIsActive(false);

            window.removeEventListener('pointerup', handleKeyRelease);
            window.removeEventListener('pointercancel', handleKeyRelease);
        }
    }

    useEffect(() => {
        function onKeydown(event: KeyboardEvent) {
            if (event.code === code) {
                setIsActive(true);
            }
        }

        function onKeyup(event: KeyboardEvent) {
            if (event.code === code) {
                setIsActive(false);
            }
        }

        window.addEventListener('keydown', onKeydown);
        window.addEventListener('keyup', onKeyup);

        if (labelRef.current) {
            const boundingBox = new Box3();
            const size = new Vector3();

            boundingBox.setFromObject(labelRef.current);
            boundingBox.getSize(size);

            labelRef.current.position.set(width / 2 - (size.x + PADDING) / 2, height / 2 - size.y / 2, 0);
        }

        return () => {
            window.removeEventListener('keydown', onKeydown);
            window.removeEventListener('keyup', onKeyup);
        };
    }, []);

    return (
        <group>
            <animated.group position-y={springs.cy} position-z={springs.cz}>
                {children}
            </animated.group>

            <mesh geometry={geometry} material={material} onPointerDown={handleDown} />

            <group ref={labelRef} position={[0, 0, 0]}>
                <animated.group
                    position={[0, 0, 0.1]}
                    position-y={springs.ly}
                    position-z={springs.lz}
                    raycast={() => {}}
                >
                    <Label
                        size="small"
                        weight="regular"
                        rotation={[perspectiveKeyboard ? Math.PI / 2 : 0, 0, 0]}
                        position={[perspectiveKeyboard ? 0.0125 : 0, perspectiveKeyboard ? -0.15 : 0, 0]}
                    >
                        {label}
                    </Label>
                </animated.group>
            </group>
        </group>
    );
}
