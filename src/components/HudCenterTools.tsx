import { useMemo } from 'react';
import * as THREE from 'three';
import { Edges } from '@react-three/drei';
import { useWorld } from '@/providers/WorldProvider';
import { Control } from '@/components/Control';
import { type LabelSize } from '@/components/Label';
import { createBeveledShape } from '@/utils/shapes';
import { GLYPH_FONT, INTERIOR_COLOR } from '@/lib/constants';

const ASPECT_RATIO = 1 / 2;
const WIDTH = 0.4;
const HEIGHT = ASPECT_RATIO * WIDTH;

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
                            label: '◀',
                            font: GLYPH_FONT,
                            size: 0.065,
                            selected: false,
                            action() {
                                console.log('left');
                            },
                        },
                        {
                            label: '►',
                            font: GLYPH_FONT,
                            size: 0.065,
                            selected: false,
                            action() {
                                console.log('right');
                            },
                        },
                        {
                            label: 'visual',
                            size: 0.065,
                            selected: mode === 'visual',
                            action() {
                                setMode('visual');
                            },
                        },
                        {
                            label: 'insert',
                            size: 0.065,
                            selected: mode === 'insert',
                            action() {
                                setMode('insert');
                            },
                        },
                    ],
                },
            ].sort((a, b) => b.group - a.group),
        [mode]
    );
    const rotX = Math.PI / 12;
    const rotY = 0;
    const rotZ = 0;
    const gapX = width / 10;
    const rowSize = controls[0].items.length;
    const posX = (rowSize * WIDTH + gapX * (rowSize - 1)) / 2;
    const shape = createBeveledShape(width, height, 0.025);
    const geometry = new THREE.ShapeGeometry([shape]);
    const material = new THREE.MeshBasicMaterial({ color: INTERIOR_COLOR, alphaTest: 2 });

    return (
        <group position={[-posX, 4.35, 0]}>
            <group position={[0, 0, 0]} rotation={[rotX, rotY, rotZ]}>
                {controls.map(({ items }, index) => {
                    return (
                        <group key={index} position={[0, 0, 0]}>
                            {items.map(({ label, font, size, selected, action }, index) => {
                                const x = index * (width + gapX);
                                const y = 0;

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
