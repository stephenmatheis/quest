import { useRef } from 'react';
import { Edges } from '@react-three/drei';
import { Group } from 'three';
import { Label } from '@/components/Label';
import { Control } from '@/components/Control';
import { createLeftShape, createRightShape } from '@/utils/shapes';
import { leftControls, rightControls } from '@/data/controls';

// const ASPECT_RATIO = 6 / 9;
// const WIDTH = 0.75;
const ASPECT_RATIO = 6 / 7;
const WIDTH = 0.5;
const HEIGHT = ASPECT_RATIO * WIDTH;

type ControlsProps = {
    width?: number;
    height?: number;
};

export function HudControls({ width = WIDTH, height = HEIGHT }: ControlsProps) {
    const leftControlsRef = useRef<Group>(null);
    const rightControlsRef = useRef<Group>(null);
    const leftShape = createLeftShape(width, height);
    const rightShape = createRightShape(width, height);
    const gapY = width / 10;
    const gapX = width / 10;
    const controlYMultiplier = 2;
    const controls = leftControls[0].items.length;
    const posX = controls * width + gapX * (controls - 1);
    const offsetX = 0.25;
    const rotX = 0.25;
    const rotY = 0.25;
    const rotZ = 0.125;

    return (
        <group position={[0, 0, 0]}>
            {/* Left  */}
            <group ref={leftControlsRef} position={[-offsetX, 0, 0]} rotation={[-rotX, rotY, rotZ]}>
                {leftControls
                    .sort((a, b) => b.group - a.group)
                    .map(({ items }, index) => {
                        return (
                            <group key={index} position={[-posX, (height + gapY) * index, 0]}>
                                {items.map(({ label, onKey }, index) => {
                                    const x = index > 0 ? index * width + gapX * index : 0;
                                    const y = index * (gapY * controlYMultiplier);

                                    return (
                                        <group key={index} position={[x, y, 0]}>
                                            <Control
                                                width={width}
                                                height={height}
                                                onKey={onKey}
                                                label={
                                                    <Label
                                                        position="center"
                                                        size="large"
                                                        weight="regular"
                                                        width={WIDTH}
                                                        height={HEIGHT}
                                                    >
                                                        {label}
                                                    </Label>
                                                }
                                            >
                                                <shapeGeometry args={[leftShape]} />
                                                <meshBasicMaterial transparent opacity={0} depthWrite={false} />{' '}
                                                <Edges linewidth={2} threshold={15} color="#000000" />
                                            </Control>
                                        </group>
                                    );
                                })}
                            </group>
                        );
                    })}
            </group>

            {/* Right  */}
            <group ref={rightControlsRef} position={[offsetX, 0, 0]} rotation={[-rotX, -rotY, -rotZ]}>
                {rightControls
                    .sort((a, b) => b.group - a.group)
                    .map(({ items }, index) => {
                        return (
                            <group key={index} position={[0, (height + gapY) * index, 0]}>
                                {items.map(({ label, onKey }, index) => {
                                    const x = index > 0 ? index * width + gapX * index : 0;
                                    const y = (items.length - 1 - index) * (gapY * controlYMultiplier);

                                    return (
                                        <group key={index} position={[x, y, 0]}>
                                            <Control
                                                width={width}
                                                height={height}
                                                onKey={onKey}
                                                label={
                                                    <Label
                                                        position="center"
                                                        size="large"
                                                        weight="regular"
                                                        width={WIDTH + 0.05} // I don't know why adding this offset center's text for right controls
                                                        height={HEIGHT}
                                                    >
                                                        {label}
                                                    </Label>
                                                }
                                            >
                                                <shapeGeometry args={[rightShape]} />
                                                <meshBasicMaterial transparent opacity={0} depthWrite={false} />{' '}
                                                <Edges linewidth={2} threshold={15} color="#000000" />
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
