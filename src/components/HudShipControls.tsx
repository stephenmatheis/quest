import * as THREE from 'three';
import { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import { useHud, type Keyboard } from '@/providers/HudProvider';
import { Control } from '@/components/Control';
import type { LabelSize } from '@/components/Label';
import { createLeftShape, createRightShape } from '@/utils/shapes';
import { GLYPH_FONT, INTERIOR_COLOR, LINE_COLOR, RED } from '@/lib/constants';

export const leftControls = [
    {
        group: 0,
        items: [
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: 'esc',
                key: 'Escape',
                code: 'Escape',
            },
            {
                label: 'F1',
                key: 'F1',
                code: 'F1',
            },
            {
                label: 'F2',
                key: 'F2',
                code: 'F2',
            },
            {
                label: 'F3',
                key: 'F3',
                code: 'F3',
            },
            {
                label: 'F4',
                key: 'F4',
                code: 'F4',
            },
            {
                label: 'F5',
                key: 'F5',
                code: 'F5',
            },
        ],
    },
    {
        group: 1,
        items: [
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: '`',
                key: 'Backquote',
                code: 'Backquote',
            },
            {
                label: '1',
                key: '1',
                code: 'Digit1',
            },
            {
                label: '2',
                key: '2',
                code: 'Digit2',
            },
            {
                label: '3',
                key: '3',
                code: 'Digit3',
            },
            {
                label: '4',
                key: '4',
                code: 'Digit4',
            },
            {
                label: '5',
                key: '5',
                code: 'Digit5',
            },
        ],
    },
    {
        group: 2,
        items: [
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: 'tab',
                key: 'Tab',
                code: 'Tab',
                columnSpan: 2,
            },
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: 'Q',
                key: 'q',
                code: 'KeyQ',
            },
            {
                label: 'W',
                key: 'w',
                code: 'KeyW',
            },
            {
                label: 'E',
                key: 'e',
                code: 'KeyE',
            },
            {
                label: 'R',
                key: 'r',
                code: 'KeyR',
            },
            {
                label: 'T',
                key: 't',
                code: 'KeyT',
            },
        ],
    },
    {
        group: 3,
        items: [
            {
                label: '',
                key: '',
                code: '',
            },

            {
                label: 'caps lock',
                key: 'CapsLock',
                code: 'CapsLock',
                columnSpan: 2,
            },
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: 'A',
                key: 'a',
                code: 'KeyA',
            },
            {
                label: 'S',
                key: 's',
                code: 'KeyS',
            },
            {
                label: 'D',
                key: 'd',
                code: 'KeyD',
            },
            {
                label: 'F',
                key: 'f',
                code: 'KeyF',
            },
            {
                label: 'G',
                key: 'g',
                code: 'KeyG',
            },
        ],
    },
    {
        group: 4,
        items: [
            {
                label: '',
                key: '',
                code: '',
            },

            {
                label: '⇧',
                key: 'Shift',
                code: 'ShiftLeft',
                font: GLYPH_FONT,
                size: 'small',
                columnSpan: 2,
            },
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: 'Z',
                key: 'z',
                code: 'KeyZ',
            },
            {
                label: 'X',
                key: 'x',
                code: 'KeyX',
            },
            {
                label: 'C',
                key: 'c',
                code: 'KeyC',
            },
            {
                label: 'V',
                key: 'v',
                code: 'KeyV',
            },
            {
                label: 'B',
                key: 'b',
                code: 'KeyB',
            },
        ],
    },
    {
        group: 5,
        items: [
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: '',
                key: '',
                code: '',
            },
            {
                label: '⌃',
                key: 'Control',
                code: 'ControlLeft',
                font: GLYPH_FONT,
                size: 'small',
            },
            {
                label: '⌥',
                key: 'Alt',
                code: 'AltLeft',
                font: GLYPH_FONT,
                size: 'small',
            },
            {
                label: '⌘',
                key: 'Meta',
                code: 'MetaLeft',
                font: GLYPH_FONT,
                size: 'small',
            },
            {
                label: 'spc',
                key: ' ',
                code: 'Space',
                columnSpan: 2,
            },
            {
                label: '',
                key: '',
                code: '',
            },
        ],
    },
];

export const rightControls = [
    {
        group: 0,
        items: [
            {
                label: 'F6',
                key: 'F6',
                code: 'F6',
            },
            {
                label: 'F7',
                key: 'F7',
                code: 'F7',
            },
            {
                label: 'F8',
                key: 'F8',
                code: 'F8',
            },
            {
                label: 'F9',
                key: 'F9',
                code: 'F9',
            },
            {
                label: 'F10',
                key: 'F10',
                code: 'F10',
            },
            {
                label: 'F11',
                key: 'F11',
                code: 'F11',
            },
            {
                label: 'F12',
                key: 'F12',
                code: 'F12',
            },
            {
                label: '',
                key: '',
                code: '',
            },
        ],
    },
    {
        group: 1,
        items: [
            {
                label: '6',
                key: '6',
                code: 'Digit6',
            },
            {
                label: '7',
                key: '7',
                code: 'Digit7',
            },
            {
                label: '8',
                key: '8',
                code: 'Digit8',
            },
            {
                label: '9',
                key: '9',
                code: 'Digit9',
            },
            {
                label: '0',
                key: '0',
                code: 'Digit0',
            },
            {
                label: '-',
                key: '-',
                code: 'Minus',
            },
            {
                label: '=',
                key: '=',
                code: 'Equal',
            },
            {
                label: '⟵',
                key: 'Backspace',
                code: 'Backspace',
                font: GLYPH_FONT,
                size: 'small',
            },
        ],
    },
    {
        group: 2,
        items: [
            {
                label: 'Y',
                key: 'y',
                code: 'KeyY',
            },
            {
                label: 'U',
                key: 'u',
                code: 'KeyU',
            },
            {
                label: 'I',
                key: 'i',
                code: 'KeyI',
            },
            {
                label: 'O',
                key: 'o',
                code: 'KeyO',
            },
            {
                label: 'P',
                key: 'p',
                code: 'KeyP',
            },
            {
                label: '[',
                key: '[',
                code: 'BracketLeft',
            },
            {
                label: ']',
                key: ']',
                code: 'BracketRight',
            },
            {
                label: '\\',
                key: '\\',
                code: 'Backslash',
            },
        ],
    },
    {
        group: 3,
        items: [
            {
                label: 'H',
                key: 'h',
                code: 'KeyH',
            },
            {
                label: 'J',
                key: 'j',
                code: 'KeyJ',
            },
            {
                label: 'K',
                key: 'k',
                code: 'KeyK',
            },
            {
                label: 'L',
                key: 'l',
                code: 'KeyL',
            },
            {
                label: ';',
                key: ';',
                code: 'Semicolon',
            },
            {
                label: "'",
                key: "'",
                code: 'Quote',
            },
            {
                label: '↵',
                key: 'Enter',
                code: 'Enter',
                font: GLYPH_FONT,
                size: 'small',
                columnSpan: 2,
            },
            {
                label: '',
                key: '',
                code: '',
            },
        ],
    },
    {
        group: 4,
        items: [
            {
                label: 'N',
                code: 'KeyN',
            },
            {
                label: 'M',
                code: 'KeyM',
            },
            {
                label: ',',
                code: 'Comma',
            },
            {
                label: '.',
                code: 'Period',
            },
            {
                label: '/',
                code: 'Slash',
            },
            {
                label: '⇧',
                key: 'Shift',
                code: 'ShiftRight',
                font: GLYPH_FONT,
                size: 'small',
            },
            {
                label: '▲',
                key: 'ArrowUp',
                code: 'ArrowUp',
                font: GLYPH_FONT,
                size: 'small',
            },
            {
                label: '',
                key: '',
                code: '',
            },
        ],
    },
    {
        group: 5,
        items: [
            {
                label: 'spc',
                key: ' ',
                code: 'Space',
                columnSpan: 2,
            },
            {
                label: 'spc',
                key: '',
                code: '',
            },
            {
                label: '⌘',
                key: 'Meta',
                code: 'MetaRight',
                font: GLYPH_FONT,
                size: 'small',
            },
            {
                label: '⌥',
                key: 'Alt',
                code: 'AltRight',
                font: GLYPH_FONT,
                size: 'small',
            },
            {
                label: '⌃',
                key: 'Control',
                code: 'ControlRight',
                font: GLYPH_FONT,
                size: 'small',
            },
            {
                label: '◀',
                key: 'ArrowLeft',
                code: 'ArrowLeft',
                font: GLYPH_FONT,
                size: 'small',
            },

            {
                label: '▼',
                key: 'ArrowDown',
                code: 'ArrowDown',
                font: GLYPH_FONT,
                size: 'small',
            },
            {
                label: '►',
                key: 'ArrowRight',
                code: 'ArrowRight',
                font: GLYPH_FONT,
                size: 'small',
            },
        ],
    },
];

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

// TODO: I need to rethink two column wide keys
// function getKeyOffsetMultiplier(keyboard: Keyboard) {
//     switch (keyboard) {
//         case 'linear':
//         default:
//             return 0;
//         case 'ortho':
//             return 2;
//         case 'ergo':
//             return -2;
//     }
// }

export function HudFullKeyboard({ keyWidth = 0.385 }: HudFullKeyboardProps) {
    const { showKeyboard, perspectiveKeyboard, keyboard } = useHud();
    const width = keyWidth;
    const height = (6 / 7) * keyWidth;
    const gapY = width / 10;
    const gapX = height / 10;
    const springs = useSpring({
        showY: showKeyboard ? -2.1725 : -4.5,
        posY: getPosY(keyboard),
        posZ: 0,
        rotXLeft: perspectiveKeyboard ? Math.PI / -2.75 : 0,
        rotYLeft: 0,
        rotZLeft: 0,
        rotXRight: perspectiveKeyboard ? Math.PI / -2.75 : 0,
        rotYRight: 0,
        rotZRight: 0,
        splitWidthLeft: -gapX / 2,
        splitWidthRight: gapX / 2,
        ergoMultiplier: getMultiplier(keyboard),
        config: {
            mass: MASS,
            tension: TENSION,
            friction: FRICTION,
            precision: 0.001,
        },
    });
    const numberOfControls = leftControls[0].items.length;
    const posX = numberOfControls * width + gapX * (numberOfControls - 1);
    const leftShape = useMemo(() => createLeftShape(width, height, 0.075), []);
    const rightShape = useMemo(() => createRightShape(width, height, 0.075), []);
    const sortedLeft = useMemo(() => leftControls.sort((a, b) => b.group - a.group), []);
    const sortedRight = useMemo(() => rightControls.sort((a, b) => b.group - a.group), []);
    const leftGeometry = new THREE.ShapeGeometry([leftShape]);
    const rightGeometry = new THREE.ShapeGeometry([rightShape]);
    const material = new THREE.MeshBasicMaterial({
        color: INTERIOR_COLOR,
        alphaTest: 2,
        userData: { ignore: true },
    });
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

                                    const colSpan2Offset = columnSpan ? -gapY * 0 : 0;

                                    return (
                                        <animated.group
                                            key={index}
                                            position-x={x}
                                            position-y={springs.ergoMultiplier.to(
                                                (m) => index * (gapY * m) + colSpan2Offset
                                            )}
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
                                                isPerspective
                                            >
                                                <mesh
                                                    geometry={columnSpan ? leftGeometryColumnSpan2 : leftGeometry}
                                                    material={material}
                                                >
                                                    <Edges linewidth={1} threshold={15} color={LINE_COLOR} />
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
                                                isPerspective
                                            >
                                                <mesh
                                                    geometry={columnSpan ? rightGeometryColumnSpan2 : rightGeometry}
                                                    material={material}
                                                >
                                                    <Edges linewidth={1} threshold={15} color={LINE_COLOR} />
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
