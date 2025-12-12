import { Edges } from '@react-three/drei';
import { Tool } from '@/components/Tool';
import { Label } from '@/components/Label';
import { ControlPlaceholder } from '@/components/ControlPlaceholder';
import { createBeveledShape } from '@/utils/shapes';
import { ExtrudedSvg } from './ExtrudedSvg';
import { useHud } from '@/providers/HudProvider';

const ASPECT_RATIO = 6 / 6;
const WIDTH = 0.4;
const HEIGHT = ASPECT_RATIO * WIDTH;
const FONT_SIZE = 0.07;
const WEiGHT = 'regular';

type ControlsProps = {
    width?: number;
    height?: number;
};

export function HudLeftTools({ width = WIDTH, height = HEIGHT }: ControlsProps) {
    const { toggleKeyboard, toggleHudLock, togglePerspectiveKeyboard, setKeyboard } = useHud();

    const shape = createBeveledShape(width, height, 0.0375);
    const rotX = 0;
    const rotY = 0;
    const rotZ = 0;
    const gapY = width / 10;

    return (
        <group position={[-3.65, 3.5, 0]}>
            <group position={[0, 0, 0]} rotation={[-rotX, rotY, rotZ]}>
                {[
                    {
                        group: 0,
                        items: [
                            {
                                label: <ExtrudedSvg src="/svg/arrow-up.svg" />,
                                action() {
                                    toggleKeyboard(true);
                                },
                            },
                            {
                                label: <ExtrudedSvg src="/svg/arrow-up.svg" rotation={[0, 0, Math.PI]} />,
                                action() {
                                    toggleKeyboard(false);
                                },
                            },
                            {
                                label: 'lock',
                                action() {
                                    toggleHudLock(true);
                                },
                            },
                            {
                                label: 'free',
                                action() {
                                    toggleHudLock(false);
                                },
                            },
                            {
                                label: 'flat',
                                action() {
                                    togglePerspectiveKeyboard(false);
                                },
                            },
                            {
                                label: 'tilt',
                                action() {
                                    togglePerspectiveKeyboard(true);
                                },
                            },
                            {
                                label: 'linear',
                                action() {
                                    setKeyboard('linear');
                                },
                            },
                            {
                                label: 'ortho',
                                action() {
                                    setKeyboard('ortho');
                                },
                            },
                            {
                                label: 'ergo',
                                action() {
                                    setKeyboard('ergo');
                                },
                            },
                        ],
                    },
                ]
                    .sort((a, b) => b.group - a.group)
                    .map(({ items }, index) => {
                        return (
                            <group key={index} position={[0, 0, 0]}>
                                {items.map(({ label, action }, index) => {
                                    const x = 0;
                                    const y = index * -(height + gapY);

                                    if (!action) {
                                        return (
                                            <group key={index} position={[x, y, 0]}>
                                                <ControlPlaceholder width={width} height={height}>
                                                    <shapeGeometry args={[shape]} />
                                                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
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
                                                        <Label
                                                            size={FONT_SIZE}
                                                            weight={WEiGHT}
                                                            width={WIDTH + 0.05}
                                                            height={HEIGHT}
                                                        >
                                                            {label}
                                                        </Label>
                                                    )
                                                }
                                            >
                                                <shapeGeometry args={[shape]} />
                                                <meshBasicMaterial transparent opacity={0} depthWrite={false} />{' '}
                                                <Edges linewidth={2} threshold={15} color="#000000" />
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
