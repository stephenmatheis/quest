import { useEffect, useRef } from 'react';
import { CameraControls, CameraControlsImpl, Edges, Grid } from '@react-three/drei';
import { Group, Shape } from 'three';
import { useCameraControls } from '@/providers/CameraProvider';
import { Label } from './Label';
import { Control } from './Control';

const ASPECT_RATIO = 6 / 9;
const WIDTH = 0.75;
const HEIGHT = ASPECT_RATIO * WIDTH;

const { ACTION } = CameraControlsImpl;

const leftControls = [
    {
        group: '1',
        items: [
            {
                label: '1',
            },
            {
                label: '2',
            },
            {
                label: '3',
            },
            {
                label: '4',
            },
        ],
    },
    {
        group: '2',
        items: [
            {
                label: '5',
            },
            {
                label: '6',
            },
            {
                label: '7',
            },
            {
                label: '8',
            },
        ],
    },
];

const rightControls = [
    {
        group: 'A',
        items: [
            {
                label: 'A',
            },
            {
                label: 'B',
            },
            {
                label: 'C',
            },
            {
                label: 'D',
            },
        ],
    },
    {
        group: 'B',
        items: [
            {
                label: 'E',
            },
            {
                label: 'F',
            },
            {
                label: 'G',
            },
            {
                label: 'H',
            },
        ],
    },
];

function createLeftShape() {
    const shape = new Shape();

    const width = WIDTH;
    const height = HEIGHT;
    const bevel = 0.125;

    shape.moveTo(0, 0);
    shape.lineTo(width - bevel, 0);
    shape.lineTo(width, bevel);
    shape.lineTo(width, height - bevel);
    shape.lineTo(width, height);
    shape.lineTo(bevel, height);
    shape.lineTo(0, height - bevel);

    return shape;
}

function createRightShape() {
    const shape = new Shape();

    const width = WIDTH;
    const height = HEIGHT;
    const bevel = 0.125;

    shape.moveTo(bevel, 0);
    shape.lineTo(0, bevel);
    shape.lineTo(0, height);
    shape.lineTo(width - bevel, height);
    shape.lineTo(width, height - bevel);
    shape.lineTo(width, 0);

    return shape;
}

export function World() {
    const { cameraControlsRef, isCameraLocked } = useCameraControls();
    const leftShape = createLeftShape();
    const rightShape = createRightShape();
    const gapY = WIDTH / 10;
    const gapX = WIDTH / 10;
    const controlYMultiplier = 2;
    const controls = leftControls[0].items.length;
    const posX = controls * WIDTH + gapX * (controls - 1);
    const offsetX = 0.25;
    const rotX = 0.25;
    const rotY = 0.25;
    const rotZ = 0.125;

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(0, 2, 12, 0, 2, 0, false);
    }, []);

    const leftControlsRef = useRef<Group>(null);
    const rightControlsRef = useRef<Group>(null);

    return (
        <>
            <CameraControls
                ref={cameraControlsRef}
                makeDefault
                mouseButtons={{
                    left: isCameraLocked ? ACTION.NONE : ACTION.ROTATE,
                    middle: ACTION.DOLLY,
                    right: isCameraLocked ? ACTION.NONE : ACTION.TRUCK,
                    wheel: ACTION.DOLLY,
                }}
                touches={{
                    one: ACTION.TOUCH_ROTATE,
                    two: ACTION.TOUCH_DOLLY_TRUCK,
                    three: ACTION.TOUCH_DOLLY_TRUCK,
                }}
            />

            <ambientLight intensity={5} />

            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.125]} />
                <meshBasicMaterial color="#ff0000" />
            </mesh>

            <group ref={leftControlsRef} position={[-offsetX, 0, 0]} rotation={[-rotX, rotY, rotZ]}>
                {leftControls.map(({ items }, index) => {
                    return (
                        <group key={index} position={[-posX, (HEIGHT + gapY) * index, 0]}>
                            {items.map(({ label }, index) => {
                                const x = index > 0 ? index * WIDTH + gapX * index : 0;
                                const y = index * (gapY * controlYMultiplier);

                                return (
                                    <group key={index} position={[x, y, 0]}>
                                        <Control
                                            width={WIDTH}
                                            height={HEIGHT}
                                            label={
                                                <Label position="center" size="large" weight="bold">
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

            <group ref={rightControlsRef} position={[offsetX, 0, 0]} rotation={[-rotX, -rotY, -rotZ]}>
                {rightControls.map(({ items }, index) => {
                    return (
                        <group key={index} position={[0, (HEIGHT + gapY) * index, 0]}>
                            {items.map(({ label }, index) => {
                                const x = index > 0 ? index * WIDTH + gapX * index : 0;
                                const y = (items.length - 1 - index) * (gapY * controlYMultiplier);

                                return (
                                    <group key={index} position={[x, y, 0]}>
                                        <Control
                                            width={WIDTH}
                                            height={HEIGHT}
                                            label={
                                                <Label position="center" size="large" weight="bold">
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

            <Grid
                position={[0, 0, 0]}
                cellSize={1}
                cellThickness={1}
                cellColor="#cccccc"
                sectionSize={4}
                sectionThickness={1}
                sectionColor="#909090"
                followCamera={false}
                infiniteGrid={true}
            />
        </>
    );
}
