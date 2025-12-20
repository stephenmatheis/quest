import { useMemo } from 'react';
import * as THREE from 'three';
import { Edges } from '@react-three/drei';
import { Tool } from '@/components/Tool';
import { Label } from '@/components/Label';
import { createBeveledShape } from '@/utils/shapes';
import { ExtrudedSvg } from '@/components/ExtrudedSvg';
import { useWorld } from '@/providers/WorldProvider';

const ASPECT_RATIO = 1 / 2;
const WIDTH = 0.5;
const HEIGHT = ASPECT_RATIO * WIDTH;
const FONT_SIZE = 0.07;
const WEIGHT = 'regular';

type ControlsProps = {
    width?: number;
    height?: number;
};

export function HudCenterTools({ width = WIDTH, height = HEIGHT }: ControlsProps) {
    const { mode, setMode } = useWorld();

    const controls = useMemo(
        () =>
            [
                {
                    group: 0,
                    items: [
                        {
                            label: <ExtrudedSvg src="/svg/arrow-up.svg" rotation={[0, 0, Math.PI / 2]} />,
                            selected: false,
                            action() {
                                console.log('left');
                            },
                        },
                        {
                            label: (
                                <group rotation-z={Math.PI / -2}>
                                    <ExtrudedSvg src="/svg/arrow-up.svg" />
                                </group>
                            ),
                            selected: false,
                            action() {
                                console.log('right');
                            },
                        },
                        {
                            label: mode,
                            selected: false,
                            action() {
                                setMode((prev) => {
                                    if (prev === 'visual') return 'insert';

                                    return 'visual';
                                });
                            },
                        },
                    ],
                },
            ].sort((a, b) => b.group - a.group),
        [mode]
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
        <group position={[-posX, 4.225, 0]}>
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
