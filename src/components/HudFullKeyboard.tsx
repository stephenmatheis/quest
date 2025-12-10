import { useRef } from 'react';
import { Edges } from '@react-three/drei';
import { Group } from 'three';
import { useHud } from '@/providers/HudProvider';
import { Control } from '@/components/Control';
import { ControlPlaceholder } from '@/components/ControlPlaceholder';
import { Label } from '@/components/Label';
import { createLeftShape, createRightShape } from '@/utils/shapes';
import { leftControls, rightControls } from '@/data/controls';
import { animated, useSpring } from '@react-spring/three';

// const ASPECT_RATIO = 6 / 9;
// const WIDTH = 0.75;
const ASPECT_RATIO = 6 / 7;
const WIDTH = 0.4;
const HEIGHT = ASPECT_RATIO * WIDTH;
const FONT_SIZE = 'small';
const WEiGHT = 'regular';
const MASS = 2;
const TENSION = 360;
const FRICTION = 30;

type ControlsProps = {
    width?: number;
    height?: number;
};

export function HudFullKeyboard({ width = WIDTH, height = HEIGHT }: ControlsProps) {
    const { showKeyboard } = useHud();
    const leftControlsRef = useRef<Group>(null);
    const rightControlsRef = useRef<Group>(null);
    const leftShape = createLeftShape(width, height, 0.075);
    const rightShape = createRightShape(width, height, 0.075);
    const controlYMultiplier = 2;
    const controls = leftControls[0].items.length;

    const springs = useSpring({
        y: showKeyboard ? -0.5 : -3.5,
        config: {
            mass: MASS,
            tension: TENSION,
            friction: FRICTION,
        },
    });

    // concave
    // const gapY = width / 10;
    // const gapX = width / 10;
    // const offsetX = 0.2;
    // const posY = -HEIGHT;
    // const rotX = 0.25;
    // const rotY = 0.25;
    // const rotZ = 0.125;

    // convex
    // const gapY = width / 10;
    // const gapX = width / 10;
    // const offsetX = 0.2;
    // const posY = -HEIGHT;
    // const rotX = .5;
    // const rotY = -0.25;
    // const rotZ = 0.05;

    // straight on
    // const gapY = width / 10;
    // const gapX = width / 10;
    // const offsetX = 0.2;
    // const rotX = 0.7;
    // const rotY = -0.15;
    // const rotZ = 0.025;
    // const posY = -HEIGHT * (1 - rotX);

    // none
    const gapY = width / 10;
    const gapX = width / 10;
    const offsetX = 0.025;
    const rotX = 0;
    const rotY = 0;
    const rotZ = 0;
    const posX = controls * width + gapX * (controls - 1);

    return (
        <animated.group position-y={springs.y}>
            {/* Left  */}
            <group ref={leftControlsRef} position={[-offsetX, 0, 0]} rotation={[-rotX, rotY, rotZ]}>
                {leftControls
                    .sort((a, b) => b.group - a.group)
                    .map(({ items }, index) => {
                        return (
                            <group key={index} position={[-posX, (height + gapY) * index, 0]}>
                                {items.map(({ label, code }, index) => {
                                    const x = index > 0 ? index * width + gapX * index : 0;
                                    const y = index * (gapY * controlYMultiplier);

                                    if (code === '') {
                                        return (
                                            <group key={index} position={[x, y, 0]}>
                                                <ControlPlaceholder width={width} height={height}>
                                                    <shapeGeometry args={[leftShape]} />
                                                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                                                    {/* <Edges linewidth={2} threshold={15} color="#ff0000" /> */}
                                                </ControlPlaceholder>
                                            </group>
                                        );
                                    }

                                    return (
                                        <group key={index} position={[x, y, 0]}>
                                            <Control
                                                width={width}
                                                height={height}
                                                code={code}
                                                label={
                                                    label && (
                                                        <Label
                                                            size={FONT_SIZE}
                                                            weight={WEiGHT}
                                                            width={WIDTH}
                                                            height={HEIGHT}
                                                        >
                                                            {label}
                                                        </Label>
                                                    )
                                                }
                                            >
                                                <shapeGeometry args={[leftShape]} />
                                                <meshBasicMaterial transparent opacity={0} depthWrite={false} />{' '}
                                                <Edges linewidth={2} threshold={15} color="#000000" />
                                            </Control>
                                        </group>
                                    );
                                })}
                            </group>
                        );
                    })}
            </group>

            {/* Right  */}
            <group ref={rightControlsRef} position={[offsetX, 0, 0]} rotation={[-rotX, -rotY, -rotZ]}>
                {rightControls
                    .sort((a, b) => b.group - a.group)
                    .map(({ items }, index) => {
                        return (
                            <group key={index} position={[0, (height + gapY) * index, 0]}>
                                {items.map(({ label, code }, index) => {
                                    const x = index > 0 ? index * width + gapX * index : 0;
                                    const y = (items.length - 1 - index) * (gapY * controlYMultiplier);

                                    if (code === '') {
                                        return (
                                            <group key={index} position={[x, y, 0]}>
                                                <ControlPlaceholder width={width} height={height}>
                                                    <shapeGeometry args={[leftShape]} />
                                                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                                                    {/* <Edges linewidth={2} threshold={15} color="#ff0000" /> */}
                                                </ControlPlaceholder>
                                            </group>
                                        );
                                    }

                                    return (
                                        <group key={index} position={[x, y, 0]}>
                                            <Control
                                                width={width}
                                                height={height}
                                                code={code}
                                                label={
                                                    label && (
                                                        <Label
                                                            size={FONT_SIZE}
                                                            weight={WEiGHT}
                                                            width={WIDTH}
                                                            height={HEIGHT}
                                                        >
                                                            {label}
                                                        </Label>
                                                    )
                                                }
                                            >
                                                <shapeGeometry args={[rightShape]} />
                                                <meshBasicMaterial transparent opacity={0} depthWrite={false} />{' '}
                                                <Edges linewidth={2} threshold={15} color="#000000" />
                                            </Control>
                                        </group>
                                    );
                                })}
                            </group>
                        );
                    })}
            </group>
        </animated.group>
    );
}
