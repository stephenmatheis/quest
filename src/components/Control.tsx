import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Box3, Vector3, type Group } from 'three';
import { animated, useSpring } from '@react-spring/three';
import { useHud } from '@/providers/HudProvider';
import { Label, type LabelSize } from '@/components/Label';
import { GREEN } from '@/lib/constants';

const MASS = 2;
const TENSION = 360;
const FRICTION = 30;
const PADDING = 0.0175;

export function Control({
    children,
    width,
    height,
    label,
    size,
    font,
    keyboardKey,
    code,
    action,
    material,
    geometry,
    isPerspective = false,
    labelColor: defaultLabelColor,
}: {
    children: ReactNode;
    width: number;
    height: number;
    label: string;
    size?: LabelSize;
    font?: string;
    keyboardKey?: string;
    code?: string;
    action?: () => void;
    material: any;
    geometry: any;
    isPerspective?: boolean;
    labelColor?: string;
}) {
    const { perspectiveKeyboard } = useHud();
    const labelRef = useRef<Group>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [labelColor, setLabelColor] = useState<string | undefined>(undefined);
    const springs = useSpring({
        cy: isActive ? -0.1 : 0,
        cz: isActive ? -0.1 : 0,
        ly: isActive ? -0.1 : 0,
        lz: isActive ? 0 : 0.05,
        rotation: [isPerspective && perspectiveKeyboard ? Math.PI / 2 : 0, 0, 0],
        position: [
            isPerspective && perspectiveKeyboard ? 0.0125 : 0,
            isPerspective && perspectiveKeyboard ? -0.1 : 0,
            0,
        ],
        config: { mass: MASS, tension: TENSION, friction: FRICTION },
    });

    function handleDown() {
        setIsActive(true);

        window.addEventListener('pointerup', handleKeyRelease);
        window.addEventListener('pointercancel', handleKeyRelease);

        if (keyboardKey && code) {
            const event = new KeyboardEvent('keydown', {
                key: keyboardKey,
                code,
                bubbles: true,
            });

            document.body.dispatchEvent(event);
        }

        function handleKeyRelease() {
            setIsActive(false);
            action?.();

            window.removeEventListener('pointerup', handleKeyRelease);
            window.removeEventListener('pointercancel', handleKeyRelease);

            if (keyboardKey && code) {
                // FIXME: Dispatched events don't work with getModifierState().
                // TODO: Pass held modifier key array to Control from HudFullKeyboard
                const event = new KeyboardEvent('keyup', {
                    key: keyboardKey,
                    code,
                    bubbles: true,
                });

                document.body.dispatchEvent(event);
            }
        }
    }

    useEffect(() => {
        // FIXME: If window is focused out, fire keyup or set setIsActive to false
        function onKeydown(event: KeyboardEvent) {
            if (event.code === code) {
                setIsActive(true);

                if (code === 'CapsLock' && event.getModifierState('CapsLock')) {
                    setLabelColor(GREEN);
                }
            }
        }

        function onKeyup(event: KeyboardEvent) {
            if (event.code === code) {
                setIsActive(false);

                if (code == 'CapsLock' && !event.getModifierState('CapsLock')) {
                    setLabelColor(undefined);
                }
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
                <animated.group position-y={springs.ly} position-z={springs.lz}>
                    <Label
                        color={defaultLabelColor || labelColor}
                        font={font}
                        size={size}
                        rotation={springs.rotation}
                        position={springs.position}
                    >
                        {label}
                    </Label>
                </animated.group>
            </group>
        </group>
    );
}
