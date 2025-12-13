import { Edges } from '@react-three/drei';
import { useHud, type Keyboard } from '@/providers/HudProvider';
import { Control } from '@/components/Control';
import { ControlPlaceholder } from '@/components/ControlPlaceholder';
import { Label } from '@/components/Label';
import { createLeftShape, createRightShape } from '@/utils/shapes';
import { leftControls, rightControls } from '@/data/controls';
import { animated, useSpring } from '@react-spring/three';

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
    const controls = leftControls[0].items.length;
    const springs = useSpring({
        showY: showKeyboard ? 0 : -3.5,
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
        },
    });
    const width = keyWidth;
    const height = (6 / 7) * keyWidth;
    const gapY = width / 10;
    const gapX = height / 10;
    const posX = controls * width + gapX * (controls - 1);
    const leftShape = createLeftShape(width, height, 0.075);
    const rightShape = createRightShape(width, height, 0.075);

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
                    {leftControls
                        .sort((a, b) => b.group - a.group)
                        .map(({ items }, index) => {
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
                                                    <ControlPlaceholder width={width} height={height}>
                                                        <shapeGeometry args={[leftShape]} />
                                                        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                                                        {/* <Edges linewidth={2} threshold={15} color="#ff0000" /> */}
                                                    </ControlPlaceholder>
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
                                                    label={
                                                        label && (
                                                            <Label
                                                                size={fontSize}
                                                                weight={fontWeight}
                                                                width={width}
                                                                height={height}
                                                                rotation={[perspectiveKeyboard ? Math.PI / 2 : 0, 0, 0]}
                                                                position={[
                                                                    width / 2,
                                                                    height / 2 - (perspectiveKeyboard ? 0.15 : 0),
                                                                    0,
                                                                ]}
                                                            >
                                                                {label}
                                                            </Label>
                                                        )
                                                    }
                                                >
                                                    <shapeGeometry args={[leftShape]} />
                                                    <meshBasicMaterial
                                                        transparent
                                                        opacity={0}
                                                        depthWrite={false}
                                                    />{' '}
                                                    <Edges linewidth={2} threshold={15} color="#000000" />
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
                    {rightControls
                        .sort((a, b) => b.group - a.group)
                        .map(({ items }, index) => {
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
                                                    <ControlPlaceholder width={width} height={height}>
                                                        <shapeGeometry args={[leftShape]} />
                                                        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                                                        {/* <Edges linewidth={2} threshold={15} color="#ff0000" /> */}
                                                    </ControlPlaceholder>
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
                                                    label={
                                                        label && (
                                                            <Label
                                                                size={fontSize}
                                                                weight={fontWeight}
                                                                width={width}
                                                                height={height}
                                                                rotation={[perspectiveKeyboard ? Math.PI / 2 : 0, 0, 0]}
                                                                position={[
                                                                    width / 2,
                                                                    height / 2 - (perspectiveKeyboard ? 0.15 : 0),
                                                                    0,
                                                                ]}
                                                            >
                                                                {label}
                                                            </Label>
                                                        )
                                                    }
                                                >
                                                    <shapeGeometry args={[rightShape]} />
                                                    <meshBasicMaterial
                                                        transparent
                                                        opacity={0}
                                                        depthWrite={false}
                                                    />{' '}
                                                    <Edges linewidth={2} threshold={15} color="#000000" />
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
