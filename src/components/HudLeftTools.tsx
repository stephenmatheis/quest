import * as THREE from 'three';
import { Edges } from '@react-three/drei';
import { Tool } from '@/components/Tool';
import { Label } from '@/components/Label';
import { createBeveledShape } from '@/utils/shapes';
import { ExtrudedSvg } from './ExtrudedSvg';
import { useHud, type Keyboard } from '@/providers/HudProvider';
import { useMemo } from 'react';
import { useCameraControls } from '@/providers/CameraProvider';

const ASPECT_RATIO = 6 / 7;
const WIDTH = 0.35;
const HEIGHT = ASPECT_RATIO * WIDTH;
const FONT_SIZE = 0.07;
const WEiGHT = 'regular';

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
    const rotX = 0;
    const rotY = 0;
    const rotZ = 0;
    const gapY = width / 10;
    const shape = createBeveledShape(width, height, 0.0375);
    const geometry = new THREE.ShapeGeometry([shape]);
    const material = new THREE.MeshBasicMaterial({ color: 'white', alphaTest: 2 });

    const tools = useMemo(
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
                            {items.map(({ label, selected, action }, index) => {
                                const x = 0;
                                const y = index * -(height + gapY);

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
                                                    <Label size={FONT_SIZE} weight={WEiGHT}>
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
