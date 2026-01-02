import { useMemo } from 'react';
import * as THREE from 'three';
import { useWorld } from '@/providers/WorldProvider';
import { Control } from '@/components/Control';
import { Label, type LabelSize } from '@/components/Label';
import { createBeveledShape } from '@/utils/shapes';
import { GREEN, INTERIOR_COLOR, LINE_COLOR } from '@/lib/constants';

const ASPECT_RATIO = 1 / 2;
const WIDTH = 0.325;
const HEIGHT = ASPECT_RATIO * WIDTH;

type ControlProps = {
    label: string;
    font?: string;
    size?: number;
    selected?: boolean;
    action?: () => void;
};

type HudCenterToolsProps = {
    width?: number;
    height?: number;
};

export function HudCenterTools({ width = WIDTH, height = HEIGHT }: HudCenterToolsProps) {
    const { mode } = useWorld();
    const controls: {
        group: number;
        items: ControlProps[];
    }[] = useMemo(
        () =>
            [
                {
                    group: 0,
                    items: [
                        {
                            label: mode.toLowerCase(),
                            size: 0.07,
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
    const posX = (rowSize * width + gapX * (rowSize - 1)) / 2;
    const shape = createBeveledShape(width, height, 0.025);
    const geometry = new THREE.ShapeGeometry([shape]);
    const material = new THREE.MeshBasicMaterial({
        color: INTERIOR_COLOR,
        alphaTest: 2,
        userData: { ignore: true },
    });

    return (
        <group position={[-posX, 2.57, 0]}>
            <group position={[0, 0, 0]} rotation={[rotX, rotY, rotZ]}>
                {controls.map(({ items }, index) => {
                    return (
                        <group key={index} position={[0, 0, 0]}>
                            {items.map(({ label, font, size, selected, action }, index) => {
                                const x = index * (width + gapX);
                                const y = 0;

                                if (!action) {
                                    return (
                                        <group key={index} position={[x, y, 0]}>
                                            <Label color={LINE_COLOR} font={font} size={size}>
                                                {label}
                                            </Label>
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
                                        />
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
