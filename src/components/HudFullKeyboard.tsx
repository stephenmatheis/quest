import * as THREE from 'three';
import { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import { useHud, type Keyboard } from '@/providers/HudProvider';
import { Control } from '@/components/Control';
import { Label } from '@/components/Label';
import { createLeftShape, createRightShape } from '@/utils/shapes';
import { leftControls, rightControls } from '@/data/controls';

const FLAG_TEST = false;

const MASS = 2;
const TENSION = 240;
const FRICTION = 30;

type HudFullKeyboardProps = {
    keyWidth?: number;
    fontSize?: 'small' | 'medium' | 'large';
    fontWeight?: 'regular' | 'light' | 'bold';
};

function getPosY(keyboard: Keyboard) {
    switch (keyboard) {
        case 'linear':
        default:
            return -0.4;
        case 'ortho':
            return -0.4;
        case 'ergo':
            return 0.15;
    }
}

function getMultiplier(keyboard: Keyboard) {
    switch (keyboard) {
        case 'linear':
        default:
            return 0;
        case 'ortho':
            return 2;
        case 'ergo':
            return -2;
    }
}

export function HudFullKeyboard({ keyWidth = 0.4, fontSize = 'small', fontWeight = 'regular' }: HudFullKeyboardProps) {
    const { showKeyboard, perspectiveKeyboard, keyboard } = useHud();
    // const showY = showKeyboard ? (FLAG_TEST ? 1 : 0) : -3.5;
    const springs = useSpring({
        showY: showKeyboard ? (FLAG_TEST ? 1 : 0) : -3.5,
        posY: getPosY(keyboard),
        posZ: 0,
        rotXLeft: perspectiveKeyboard ? Math.PI / -2.75 : 0,
        rotYLeft: 0,
        rotZLeft: 0,
        rotXRight: perspectiveKeyboard ? Math.PI / -2.75 : 0,
        rotYRight: 0,
        rotZRight: 0,
        splitWidthLeft: -0.1,
        splitWidthRight: 0.1,
        ergoMultiplier: getMultiplier(keyboard),
        config: {
            mass: MASS,
            tension: TENSION,
            friction: FRICTION,
            precision: 0.001,
        },
    });
    const width = keyWidth;
    const height = (6 / 7) * keyWidth;
    const gapY = width / 10;
    const gapX = height / 10;
    const numberOfControls = leftControls[0].items.length;
    const posX = numberOfControls * width + gapX * (numberOfControls - 1);
    const leftShape = useMemo(() => createLeftShape(width, height, 0.075), []);
    const rightShape = useMemo(() => createRightShape(width, height, 0.075), []);
    const sortedRight = useMemo(() => rightControls.sort((a, b) => b.group - a.group), []);
    const sortedLeft = useMemo(() => leftControls.sort((a, b) => b.group - a.group), []);
    const leftGeometry = new THREE.ShapeGeometry([leftShape]);
    const rightGeometry = new THREE.ShapeGeometry([rightShape]);
    const material = new THREE.MeshBasicMaterial({ color: 'white', alphaTest: 2 });

    if (FLAG_TEST) {
        return (
            <animated.group position-y={springs.showY}>
                <animated.group position-y={springs.posY} position-z={springs.posZ}>
                    <animated.group
                        position-x={-1.25}
                        rotation-x={springs.rotXLeft}
                        rotation-y={springs.rotYLeft}
                        rotation-z={springs.rotZLeft}
                    >
                        <boxGeometry args={[2, 2, 0.25]} />
                        <meshBasicMaterial color="#ffffff" alphaTest={2} />
                        <Edges linewidth={2} threshold={15} color="#ff0000" />
                    </animated.group>
                    <animated.group
                        position-x={1.25}
                        rotation-x={springs.rotXRight}
                        rotation-y={springs.rotYRight}
                        rotation-z={springs.rotZRight}
                    >
                        <boxGeometry args={[2, 2, 0.25]} />
                        <meshBasicMaterial color="#ffffff" alphaTest={2} />
                        <Edges linewidth={2} threshold={15} color="#ff0000" />
                    </animated.group>
                </animated.group>
            </animated.group>
        );
    }

    return (
        <animated.group position-y={springs.showY}>
            <animated.group position-y={springs.posY} position-z={springs.posZ}>
                {/* Left  */}
                <animated.group
                    position-x={springs.splitWidthLeft}
                    rotation-x={springs.rotXLeft}
                    rotation-y={springs.rotYLeft}
                    rotation-z={springs.rotZLeft}
                >
                    {sortedLeft.map(({ items }, index) => {
                        return (
                            <group key={index} position={[-posX, (height + gapY) * index, 0]}>
                                {items.map(({ label, code }, index) => {
                                    const x = index > 0 ? index * width + gapX * index : 0;

                                    if (code === '') {
                                        return (
                                            <animated.group
                                                key={index}
                                                position-x={x}
                                                position-y={springs.ergoMultiplier.to((m) => index * (gapY * m))}
                                            >
                                                <group position={[0, 0, 0]}>
                                                    <mesh
                                                        raycast={() => {}}
                                                        geometry={leftGeometry}
                                                        material={material}
                                                    />
                                                </group>
                                            </animated.group>
                                        );
                                    }

                                    return (
                                        <animated.group
                                            key={index}
                                            position-x={x}
                                            position-y={springs.ergoMultiplier.to((m) => index * (gapY * m))}
                                        >
                                            <Control
                                                width={width}
                                                height={height}
                                                code={code}
                                                geometry={leftGeometry}
                                                material={material}
                                                label={
                                                    label && (
                                                        <Label
                                                            size={fontSize}
                                                            weight={fontWeight}
                                                            rotation={[perspectiveKeyboard ? Math.PI / 2 : 0, 0, 0]}
                                                            position={[
                                                                perspectiveKeyboard ? 0.0125 : 0,
                                                                perspectiveKeyboard ? -0.15 : 0,
                                                                0,
                                                            ]}
                                                        >
                                                            {label}
                                                        </Label>
                                                    )
                                                }
                                            >
                                                <mesh geometry={leftGeometry} material={material}>
                                                    <Edges linewidth={2} threshold={15} color="#000000" />
                                                </mesh>
                                            </Control>
                                        </animated.group>
                                    );
                                })}
                            </group>
                        );
                    })}
                </animated.group>

                {/* Right  */}
                <animated.group
                    position-x={springs.splitWidthRight}
                    rotation-x={springs.rotXRight}
                    rotation-y={springs.rotYRight}
                    rotation-z={springs.rotZRight}
                >
                    {sortedRight.map(({ items }, index) => {
                        return (
                            <group key={index} position={[0, (height + gapY) * index, 0]}>
                                {items.map(({ label, code }, index) => {
                                    const x = index > 0 ? index * width + gapX * index : 0;

                                    if (code === '') {
                                        return (
                                            <animated.group
                                                key={index}
                                                position-x={x}
                                                position-y={springs.ergoMultiplier.to(
                                                    (m) => (items.length - 1 - index) * (gapY * m)
                                                )}
                                            >
                                                <group position={[0, 0, 0]}>
                                                    <mesh
                                                        raycast={() => {}}
                                                        geometry={rightGeometry}
                                                        material={material}
                                                    />
                                                </group>
                                            </animated.group>
                                        );
                                    }

                                    return (
                                        <animated.group
                                            key={index}
                                            position-x={x}
                                            position-y={springs.ergoMultiplier.to(
                                                (m) => (items.length - 1 - index) * (gapY * m)
                                            )}
                                        >
                                            <Control
                                                width={width}
                                                height={height}
                                                code={code}
                                                geometry={rightGeometry}
                                                material={material}
                                                label={
                                                    label && (
                                                        <Label
                                                            size={fontSize}
                                                            weight={fontWeight}
                                                            rotation={[perspectiveKeyboard ? Math.PI / 2 : 0, 0, 0]}
                                                            position={[
                                                                perspectiveKeyboard ? 0.0125 : 0,
                                                                perspectiveKeyboard ? -0.15 : 0,
                                                                0,
                                                            ]}
                                                        >
                                                            {label}
                                                        </Label>
                                                    )
                                                }
                                            >
                                                <mesh geometry={rightGeometry} material={material}>
                                                    <Edges linewidth={2} threshold={15} color="#000000" />
                                                </mesh>
                                            </Control>
                                        </animated.group>
                                    );
                                })}
                            </group>
                        );
                    })}
                </animated.group>
            </animated.group>
        </animated.group>
    );
}
