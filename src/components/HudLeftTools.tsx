import { useMemo } from 'react';
import * as THREE from 'three';
import { Edges } from '@react-three/drei';
import { useHud, type Keyboard } from '@/providers/HudProvider';
import { useCameraControls } from '@/providers/CameraProvider';
import { Control } from '@/components/Control';
import { type LabelSize } from '@/components/Label';
import { createBeveledShape } from '@/utils/shapes';
import { GLYPH_FONT } from '@/lib/constants';

const ASPECT_RATIO = 6 / 7;
const WIDTH = 0.35;
const HEIGHT = ASPECT_RATIO * WIDTH;

type ControlsProps = {
    width?: number;
    height?: number;
};

export function HudLeftTools({ width = WIDTH, height = HEIGHT }: ControlsProps) {
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
    const { toggleEnableCamera } = useCameraControls();
    const tools = useMemo(
        () =>
            [
                {
                    group: 0,
                    items: [
                        {
                            label: '▲',
                            font: GLYPH_FONT,
                            size: 'medium',
                            selected: showKeyboard,
                            action() {
                                toggleKeyboard(true);
                            },
                        },
                        {
                            label: '▼',
                            font: GLYPH_FONT,
                            size: 'medium',
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
                                toggleEnableCamera(true);
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
    const rotY = Math.PI / 12;
    const rotZ = 0;
    const gapY = width / 10;
    const shape = createBeveledShape(width, height, 0.0375);
    const geometry = new THREE.ShapeGeometry([shape]);
    const material = new THREE.MeshBasicMaterial({ color: 'white', alphaTest: 2 });

    function handleEnter() {
        toggleEnableCamera(false);
    }

    function handleLeave() {
        toggleEnableCamera(true);
    }

    return (
        <group position={[-3.65, 3.5, 0]} onPointerEnter={handleEnter} onPointerLeave={handleLeave}>
            <group position={[0, 0, 0]} rotation={[rotX, rotY, rotZ]}>
                {tools.map(({ items }, index) => {
                    return (
                        <group key={index} position={[0, 0, 0]}>
                            {items.map(({ label, font, size, selected, action }, index) => {
                                const x = 0;
                                const y = index * -(height + gapY);

                                return (
                                    <group key={index} position={[x, y, 0]}>
                                        <Control
                                            action={action}
                                            width={width}
                                            height={height}
                                            geometry={geometry}
                                            material={material}
                                            label={label}
                                            font={font}
                                            size={size as LabelSize}
                                        >
                                            <mesh geometry={geometry} material={material}>
                                                <Edges
                                                    linewidth={2}
                                                    threshold={15}
                                                    color={selected ? '#ff0000' : '#000000'}
                                                />
                                            </mesh>
                                        </Control>
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
