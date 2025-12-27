import { useEffect, useMemo, useRef } from 'react';
import { Group, ShapeGeometry, MeshBasicMaterial, Box3, Vector3 } from 'three';
import { Edges } from '@react-three/drei';
import { useHud, type Keyboard } from '@/providers/HudProvider';
import { useCameraControls } from '@/providers/CameraProvider';
import { Control } from '@/components/Control';
import { type LabelSize } from '@/components/Label';
import { createBeveledShape } from '@/utils/shapes';
import { GLYPH_FONT, GREEN, INTERIOR_COLOR, LINE_COLOR } from '@/lib/constants';
import { useWorld } from '@/providers/WorldProvider';

const ASPECT_RATIO = 1 / 2;
const WIDTH = 0.325;
const HEIGHT = ASPECT_RATIO * WIDTH;

type ControlsProps = {
    width?: number;
    height?: number;
};

export function HudLeftTools({ width = WIDTH, height = HEIGHT }: ControlsProps) {
    const {
        showHud,
        keyboard,
        showKeyboard,
        lockHud,
        perspectiveKeyboard,
        toggleHud,
        toggleKeyboard,
        toggleHudLock,
        togglePerspectiveKeyboard,
        setKeyboard,
    } = useHud();
    const { bloom, scanLines, setBloom } = useWorld();
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
                            size: 0.065,
                            selected: showKeyboard,
                            action() {
                                toggleKeyboard(true);
                            },
                        },
                        {
                            label: '▼',
                            font: GLYPH_FONT,
                            size: 0.065,
                            selected: !showKeyboard,
                            action() {
                                toggleKeyboard(false);
                            },
                        },
                        {
                            label: '',
                        },
                        {
                            label: 'hud',
                            size: 0.065,
                            selected: showHud,
                            action() {
                                toggleHud(true);
                            },
                        },
                        {
                            label: 'hide',
                            size: 0.065,
                            selected: !showHud,
                            action() {
                                toggleHud(false);
                            },
                        },
                        {
                            label: '',
                        },
                        {
                            label: 'lock',
                            size: 0.065,
                            selected: lockHud,
                            action() {
                                toggleHudLock(true);
                            },
                        },
                        {
                            label: 'free',
                            size: 0.065,
                            selected: !lockHud,
                            action() {
                                toggleHudLock(false);
                                toggleEnableCamera(true);
                            },
                        },
                        {
                            label: '',
                        },
                        {
                            label: 'face',
                            size: 0.065,
                            selected: !perspectiveKeyboard,
                            action() {
                                togglePerspectiveKeyboard(false);
                            },
                        },
                        {
                            label: 'tilt',
                            size: 0.065,
                            selected: perspectiveKeyboard,
                            action() {
                                togglePerspectiveKeyboard(true);
                            },
                        },
                        {
                            label: '',
                        },
                        {
                            label: 'ortho' as Keyboard,
                            size: 0.065,
                            selected: keyboard === 'linear',
                            action() {
                                setKeyboard('linear');
                            },
                        },
                        {
                            label: 'bent' as Keyboard,
                            size: 0.065,
                            selected: keyboard === 'ortho',
                            action() {
                                setKeyboard('ortho');
                            },
                        },
                        {
                            label: 'ergo' as Keyboard,
                            size: 0.065,
                            selected: keyboard === 'ergo',
                            action() {
                                setKeyboard('ergo');
                            },
                        },
                        {
                            label: '',
                        },
                        {
                            label: 'glow' as Keyboard,
                            size: 0.065,
                            selected: bloom,
                            action() {
                                setBloom(true);
                            },
                        },
                        {
                            label: 'flat' as Keyboard,
                            size: 0.065,
                            selected: !bloom,
                            action() {
                                setBloom(false);
                            },
                        },
                    ],
                },
            ].sort((a, b) => b.group - a.group),
        [showKeyboard, lockHud, perspectiveKeyboard, keyboard, scanLines, bloom]
    );
    const ref = useRef<Group>(null);
    const tare = 3.477 - 0.75;
    const rotX = 0;
    const rotY = 0;
    const rotZ = 0;
    const gapY = width / 10;
    const boxHeight = 3.477;
    const containerHeight = 5.292;
    const posY = tare + (containerHeight / 2 - boxHeight / 2);
    const posX = -3.425;
    const shape = createBeveledShape(width, height, 0.025);
    const geometry = new ShapeGeometry([shape]);
    const material = new MeshBasicMaterial({
        color: INTERIOR_COLOR,
        alphaTest: 2,
        userData: { ignore: true },
    });

    useEffect(() => {
        if (ref.current) {
            const boundingBox = new Box3();
            const size = new Vector3();

            boundingBox.setFromObject(ref.current);
            boundingBox.getSize(size);
        }
    }, []);

    return (
        <group ref={ref} position={[posX, posY, 0]}>
            <group position={[0, 0, 0]} rotation={[rotX, rotY, rotZ]}>
                {tools.map(({ items }, index) => {
                    return (
                        <group key={index} position={[0, 0, 0]}>
                            {items.map(({ label, font, size, selected, action }, index) => {
                                const x = 0;
                                const y = index === 0 ? 0 : index * -(height + gapY);

                                if (!action) {
                                    return (
                                        <group key={index} position={[x, y, 0]}>
                                            <group position={[0, 0, 0]}>
                                                <mesh raycast={() => {}} geometry={geometry} material={material} />
                                            </group>
                                        </group>
                                    );
                                }

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
                                            labelColor={selected ? GREEN : LINE_COLOR}
                                        >
                                            <mesh geometry={geometry} material={material}>
                                                <Edges linewidth={1} threshold={15} color={LINE_COLOR} />
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
