import { Edges, Line } from '@react-three/drei';
import { Tool } from '@/components/Tool';
import { Label } from '@/components/Label';
import { ControlPlaceholder } from '@/components/ControlPlaceholder';
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

    const shape = createBeveledShape(width, height, 0.0375);
    const rotX = 0;
    const rotY = 0;
    const rotZ = 0;
    const gapY = width / 10;

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

                                toggleEnableCamera(true);
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

    return (
        <group position={[-3.65, 3.5, 0]}>
            <group position={[0, 0, 0]} rotation={[rotX, rotY, rotZ]}>
                {tools.map(({ items }, index) => {
                    return (
                        <group key={index} position={[0, 0, 0]}>
                            {items.map(({ label, selected, action }, index) => {
                                const x = 0;
                                const y = index * -(height + gapY);

                                if (!action) {
                                    return (
                                        <group key={index} position={[x, y, 0]}>
                                            <ControlPlaceholder width={width} height={height}>
                                                <shapeGeometry args={[shape]} />
                                                <meshBasicMaterial color="#ffffff" alphaTest={2} />
                                                {/* <meshBasicMaterial transparent opacity={0} depthWrite={false} /> */}
                                                {/* <Edges linewidth={2} threshold={15} color="#ff0000" /> */}
                                            </ControlPlaceholder>
                                        </group>
                                    );
                                }

                                return (
                                    <group key={index} position={[x, y, 0]}>
                                        <Tool
                                            width={width}
                                            height={height}
                                            action={action}
                                            label={
                                                label && (
                                                    <Label size={FONT_SIZE} weight={WEiGHT}>
                                                        {label}
                                                    </Label>
                                                )
                                            }
                                        >
                                            <shapeGeometry args={[shape]} />
                                            <meshBasicMaterial color="#ffffff" alphaTest={2} />
                                            {/* <meshBasicMaterial transparent={true} opacity={0} depthWrite={false} /> */}
                                            <Edges linewidth={2} threshold={15} color="#000000" />
                                        </Tool>
                                        {selected && (
                                            <Line
                                                points={[
                                                    [width + 0.025, 0.05, 0],
                                                    [width + 0.025, height - 0.05, 0],
                                                ]}
                                                color="#000000"
                                                linewidth={2}
                                            />
                                        )}
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
