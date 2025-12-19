import * as THREE from 'three';
import { Edges } from '@react-three/drei';
import { Tool } from '@/components/Tool';
import { Label } from '@/components/Label';
import { createBeveledShape } from '@/utils/shapes';
import { ExtrudedSvg } from './ExtrudedSvg';
import { useHud, type Keyboard } from '@/providers/HudProvider';
import { useMemo } from 'react';

const ASPECT_RATIO = 6 / 7;
const WIDTH = 0.35;
const HEIGHT = ASPECT_RATIO * WIDTH;
const FONT_SIZE = 0.07;
const WEIGHT = 'regular';

type ControlsProps = {
    width?: number;
    height?: number;
};

export function HudCenterTools({ width = WIDTH, height = HEIGHT }: ControlsProps) {
    const {
        toggleKeyboard,
        toggleHudLock,
        togglePerspectiveKeyboard,
        setKeyboard,
        keyboard,
        showKeyboard,
        lockHud,
        perspectiveKeyboard,
    } = useHud();

    const controls = useMemo(
        () =>
            [
                {
                    group: 0,
                    items: [
                        {
                            label: <ExtrudedSvg src="/svg/arrow-up.svg" />,
                            selected: showKeyboard,
                            action() {
                                toggleKeyboard(true);
                            },
                        },
                        {
                            label: <ExtrudedSvg src="/svg/arrow-up.svg" rotation={[0, 0, Math.PI]} />,
                            selected: !showKeyboard,
                            action() {
                                toggleKeyboard(false);
                            },
                        },
                        {
                            label: 'lock',
                            selected: lockHud,
                            action() {
                                toggleHudLock(true);
                            },
                        },
                        {
                            label: 'free',
                            selected: !lockHud,
                            action() {
                                toggleHudLock(false);
                            },
                        },
                        {
                            label: 'face',
                            selected: !perspectiveKeyboard,
                            action() {
                                togglePerspectiveKeyboard(false);
                            },
                        },
                        {
                            label: 'tilt',
                            selected: perspectiveKeyboard,
                            action() {
                                togglePerspectiveKeyboard(true);
                            },
                        },
                        {
                            label: 'flat' as Keyboard,
                            selected: keyboard === 'linear',
                            action() {
                                setKeyboard('linear');
                            },
                        },
                        {
                            label: 'ortho' as Keyboard,
                            selected: keyboard === 'ortho',
                            action() {
                                setKeyboard('ortho');
                            },
                        },
                        {
                            label: 'ergo' as Keyboard,
                            selected: keyboard === 'ergo',
                            action() {
                                setKeyboard('ergo');
                            },
                        },
                    ],
                },
            ].sort((a, b) => b.group - a.group),
        [showKeyboard, lockHud, perspectiveKeyboard, keyboard]
    );

    const rotX = 0;
    const rotY = 0;
    const rotZ = 0;
    const gapX = width / 10;
    const rowSize = controls[0].items.length;
    const posX = (rowSize * WIDTH + gapX * (rowSize - 1)) / 2;
    const shape = createBeveledShape(width, height, 0.0375);
    const geometry = new THREE.ShapeGeometry([shape]);
    const material = new THREE.MeshBasicMaterial({ color: 'white', alphaTest: 2 });

    return (
        <group position={[-posX, 4, 0]}>
            <group position={[0, 0, 0]} rotation={[rotX, rotY, rotZ]}>
                {controls.map(({ items }, index) => {
                    return (
                        <group key={index} position={[0, 0, 0]}>
                            {items.map(({ label, selected, action }, index) => {
                                const x = index * (width + gapX);
                                const y = 0;

                                return (
                                    <group key={index} position={[x, y, 0]}>
                                        <Tool
                                            width={width}
                                            height={height}
                                            geometry={geometry}
                                            material={material}
                                            action={action}
                                            label={
                                                label && (
                                                    <Label size={FONT_SIZE} weight={WEIGHT}>
                                                        {label}
                                                    </Label>
                                                )
                                            }
                                        >
                                            <mesh geometry={geometry} material={material}>
                                                <Edges
                                                    linewidth={2}
                                                    threshold={15}
                                                    color={selected ? '#ff0000' : '#000000'}
                                                />
                                            </mesh>
                                        </Tool>
                                    </group>
                                );
                            })}
                        </group>
                    );
                })}
            </group>
        </group>
    );
}
