import * as THREE from 'three';
import { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import { useHud, type Keyboard } from '@/providers/HudProvider';
import { Control } from '@/components/Control';
import { createLeftShape, createRightShape } from '@/utils/shapes';
import { leftControls, rightControls } from '@/data/controls';
import type { LabelSize } from './Label';
import { INTERIOR_COLOR, LINE_COLOR, RED } from '@/lib/constants';

const MASS = 2;
const TENSION = 240;
const FRICTION = 30;

type Key = {
    label: string;
    font?: string;
    size?: LabelSize | string | number;
    code?: string;
    key?: string;
    columnSpan?: number;
};

type HudFullKeyboardProps = {
    keyWidth?: number;
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

export function HudFullKeyboard({ keyWidth = 0.385 }: HudFullKeyboardProps) {
    const { showKeyboard, perspectiveKeyboard, keyboard } = useHud();
    const springs = useSpring({
        showY: showKeyboard ? -0.1125 : -3.5,
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
    const sortedLeft = useMemo(() => leftControls.sort((a, b) => b.group - a.group), []);
    const sortedRight = useMemo(() => rightControls.sort((a, b) => b.group - a.group), []);
    const leftGeometry = new THREE.ShapeGeometry([leftShape]);
    const rightGeometry = new THREE.ShapeGeometry([rightShape]);
    const material = new THREE.MeshBasicMaterial({ color: INTERIOR_COLOR, alphaTest: 2, toneMapped: false });
    const materialRed = new THREE.MeshBasicMaterial({ color: RED, alphaTest: 2 });
    const leftShapeColumnSpan2 = useMemo(() => createLeftShape(width * 2 + gapX, height, 0.075), []);
    const leftGeometryColumnSpan2 = new THREE.ShapeGeometry([leftShapeColumnSpan2]);
    const rightShapeColumnSpan2 = useMemo(() => createRightShape(width * 2 + gapX, height, 0.075), []);
    const rightGeometryColumnSpan2 = new THREE.ShapeGeometry([rightShapeColumnSpan2]);

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
                                {items.map(({ label, size, font, code, key, columnSpan }: Key, index: number) => {
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
                                                        material={materialRed}
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
                                                width={columnSpan ? width * 2 + gapX : width}
                                                height={height}
                                                code={code}
                                                keyboardKey={key}
                                                geometry={columnSpan ? leftGeometryColumnSpan2 : leftGeometry}
                                                material={material}
                                                label={label}
                                                font={font}
                                                size={size as LabelSize}
                                            >
                                                <mesh
                                                    geometry={columnSpan ? leftGeometryColumnSpan2 : leftGeometry}
                                                    material={material}
                                                >
                                                    <Edges linewidth={2} threshold={15} color={LINE_COLOR} />
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
                                {items.map(({ label, font, size, code, key, columnSpan }: Key, index: number) => {
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
                                                        material={materialRed}
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
                                                width={columnSpan ? width * 2 + gapX : width}
                                                height={height}
                                                code={code}
                                                keyboardKey={key}
                                                geometry={columnSpan ? rightGeometryColumnSpan2 : rightGeometry}
                                                material={material}
                                                label={label}
                                                font={font}
                                                size={size as LabelSize}
                                            >
                                                <mesh
                                                    geometry={columnSpan ? rightGeometryColumnSpan2 : rightGeometry}
                                                    material={material}
                                                >
                                                    <Edges linewidth={2} threshold={15} color={LINE_COLOR} />
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
