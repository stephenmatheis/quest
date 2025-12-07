import { useEffect, useRef } from 'react';
import { CameraControls, CameraControlsImpl, Edges, Grid, Line, Text3D } from '@react-three/drei';
import { Group, Shape } from 'three';
import { useCameraControls } from '@/providers/CameraProvider';
import { Label } from './Label';
import { Control } from './Control';

// Controls
const ASPECT_RATIO = 6 / 9;
const WIDTH = 0.75;
const HEIGHT = ASPECT_RATIO * WIDTH;

// Ribs
const RIB_X = 3;

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

function createRect(width: number, height: number) {
    const shape = new Shape();
    const bevel = 0;

    shape.moveTo(bevel, 0);
    shape.lineTo(0, bevel);
    shape.lineTo(0, height);
    shape.lineTo(width - bevel, height);
    shape.lineTo(width, height - bevel);
    shape.lineTo(width, 0);

    return shape;
}

function RightReadout() {
    const fontSize = 0.14;

    return (
        <group position={[4.5, 6.4, -1]}>
            {/* Line 1 */}
            <Text3D position={[0, 0, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                connected to SC 10.1
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 2 */}
            <Text3D position={[0, -0.35, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                std 4301.056.92.6
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 3 */}
            <Text3D position={[0, -0.7, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                x 231 y 492 z 69
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 4 */}
            <Text3D position={[0, -1.05, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                sgnl 2035 ///
                <meshBasicMaterial color="#000000" />
            </Text3D>
        </group>
    );
}

export function World() {
    const { cameraControlsRef, isCameraLocked } = useCameraControls();
    const leftShape = createLeftShape();
    const rightShape = createRightShape();
    const leftRect = createRect(WIDTH, 0.3);
    const leftTopRect = createRect(WIDTH + 0.2, 0.2);
    const gapY = WIDTH / 10;
    const gapX = WIDTH / 10;
    const controlYMultiplier = 2;
    const controls = leftControls[0].items.length;
    const posX = controls * WIDTH + gapX * (controls - 1);
    const offsetX = 0.25;
    const rotX = 0.25;
    const rotY = 0.25;
    const rotZ = 0.125;
    const ringSize = 2.75;

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        // default (straight on)
        controls.setLookAt(0, 2, 20, 0, 2, 0, false);

        // controls.setLookAt(0, 3, 21, 0, 2, 0, false);
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

            {/* Center */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.125]} />
                <meshBasicMaterial color="#ff0000" />
            </mesh>

            {/* Plotter */}
            <group position={[-10, 2, 0]}>
                {/* Horizontal */}
                <Line
                    points={[
                        [0, 0, 0],
                        [20, 0, 0],
                    ]}
                    color="#ff0000"
                    lineWidth={2}
                />

                {/* Vertical */}
                <Line
                    position={[10, -10, 0]}
                    points={[
                        [0, 0, 0],
                        [0, 20, 0],
                    ]}
                    color="#ff0000"
                    lineWidth={2}
                />
            </group>

            {/* Ring */}
            <group position={[0, ringSize, -1]}>
                <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
                    <torusGeometry args={[ringSize, 0.01, 24, 256, Math.PI * 2 - 1]} />
                    <meshBasicMaterial color="#000000" side={2} />
                </mesh>

                <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
                    <torusGeometry args={[2, 0.01, 24, 256, Math.PI * 2 - 1]} />
                    <meshBasicMaterial color="#000000" side={2} />
                </mesh>
            </group>

            <RightReadout />

            {/* Top Left Readout */}
            <group position={[-6.5, 6, -1]}>
                <Text3D position={[0, 0, 0]} height={0.001} size={0.5} font={`/fonts/Mono_Bold.json`}>
                    GRID 00
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                    <Edges linewidth={2} threshold={15} color="#000000" />
                </Text3D>
            </group>

            {/* Left Rib Top Box */}
            <group position={[-RIB_X - 2.75, 3.75, -2]}>
                <mesh position={[0, 0, 0]}>
                    <shapeGeometry args={[leftTopRect]} />
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />{' '}
                    <Edges linewidth={2} threshold={15} color="#000000" />
                </mesh>
            </group>

            {/* Left Rib Boxes */}
            <group position={[-RIB_X - 3.75, 3.2, -2]}>
                {Array.from({ length: 4 }).map((_, i) => {
                    const y = i * -0.5;

                    return (
                        <mesh key={i} position={[0, y, 0]}>
                            <shapeGeometry args={[leftRect]} />
                            <meshBasicMaterial transparent opacity={0} depthWrite={false} />{' '}
                            <Edges linewidth={2} threshold={15} color="#000000" />
                        </mesh>
                    );
                })}
            </group>

            {/* Left Rib Lines */}
            <group position={[-RIB_X - 2, 3.5, -2]}>
                {Array.from({ length: 7 }).map((_, i) => {
                    const y = i * -0.3;

                    return (
                        <Line
                            key={i}
                            points={[
                                [0, y, 0],
                                [-0.5, y, 0],
                            ]}
                            color="#000000"
                            lineWidth={2}
                        />
                    );
                })}
            </group>

            {/* Left Ribs */}
            <group position={[-RIB_X, 1, -2]}>
                {Array.from({ length: 7 }).map((_, i) => {
                    const z = i * -3;

                    return (
                        <group key={i}>
                            <Line
                                points={[
                                    [0, 0, z],
                                    [-0.5, 0, z],
                                    [-1, 0.5, z],
                                    [-1, 3, z],
                                    [-0.5, 3.5, z],
                                    [0, 3.5, z],
                                ]}
                                color="#000000"
                                lineWidth={2}
                            />

                            <mesh position={[-0.25, 3.5 + 0.2, z]}>
                                <boxGeometry args={[0.5, 0.1, 0.1]} />
                                <meshBasicMaterial color="#000000" />
                            </mesh>
                        </group>
                    );
                })}
            </group>

            {/* Right Ribs */}
            <group position={[RIB_X, 1, -2]}>
                {Array.from({ length: 7 }).map((_, i) => {
                    const x = 0;
                    const y = 0;
                    const z = i * -3;

                    return (
                        <Line
                            key={i}
                            points={[
                                [x + 0, y + 0, z],
                                [x + 0.5, y + 0, z],
                                [x + 1, y + 0.5, z],
                                [x + 1, y + 3, z],
                                [x + 0.5, y + 3.5, z],
                                [x + 0, y + 3.5, z],
                            ]}
                            color="#000000"
                            lineWidth={2}
                        />
                    );
                })}
            </group>

            {/* Controls */}
            <group position={[0, 0, 8.2]}>
                {/* Left  */}
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

                {/* Right  */}
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
