import { useEffect, useRef } from 'react';
import { CameraControls, CameraControlsImpl, Edges, Grid, PivotControls, Text3D } from '@react-three/drei';
import { Group, Shape, Vector3 } from 'three';
import { useCameraControls } from '@/providers/CameraProvider';
import { useThree } from '@react-three/fiber';
import { m } from 'motion/react';

const ASPECT_RATIO = 6 / 9;
const WIDTH = 1;
const HEIGHT = ASPECT_RATIO * WIDTH;
const LARGE_FONT_SIZE = 0.1;
const MEDIUM_FONT_SIZE = 0.09;
const SMALL_FONT_SIZE = 0.08;
const TOP_LEFT = new Vector3(LARGE_FONT_SIZE, HEIGHT - LARGE_FONT_SIZE - LARGE_FONT_SIZE / 2, 0);
const TOP_RIGHT = new Vector3(WIDTH - LARGE_FONT_SIZE * 2.5, HEIGHT - LARGE_FONT_SIZE - LARGE_FONT_SIZE / 2, 0);
const BOTTOM_LEFT = new Vector3(LARGE_FONT_SIZE, LARGE_FONT_SIZE / 2, 0);
const BOTTOM_RIGHT = new Vector3(WIDTH - LARGE_FONT_SIZE * 2.5, LARGE_FONT_SIZE / 2, 0);
const CENTER = new Vector3(WIDTH / 2 - LARGE_FONT_SIZE / 2, HEIGHT / 2 - LARGE_FONT_SIZE / 2, 0);
const { ACTION } = CameraControlsImpl;

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

function BoldText({ text, position }: { text: string; position: Vector3 }) {
    return (
        <Text3D
            position={position}
            height={0.01}
            size={LARGE_FONT_SIZE}
            font="/fonts/Mono_Bold.json"
            // curveSegments={32}
            // bevelEnabled
            // bevelSize={0.001}
            // bevelThickness={0.001}
            // lineHeight={0.5}
            // letterSpacing={-0.06}
        >
            {text}
            <meshBasicMaterial color="#000000" />
        </Text3D>
    );
}

function RegularText({ text, position }: { text: string; position: Vector3 }) {
    return (
        <Text3D
            position={position}
            height={0.01}
            size={MEDIUM_FONT_SIZE}
            font="/fonts/Mono_Regular.json"
            // curveSegments={32}
            // bevelEnabled
            // bevelSize={0.001}
            // bevelThickness={0.001}
            // lineHeight={0.5}
            // letterSpacing={-0.06}
        >
            {text}
            <meshBasicMaterial color="#000000" />
        </Text3D>
    );
}

function LightText({ text, position }: { text: string; position: Vector3 }) {
    return (
        <Text3D
            position={position}
            height={0.01}
            size={SMALL_FONT_SIZE}
            font="/fonts/Mono_Light.json"
            // curveSegments={32}
            // bevelEnabled
            // bevelSize={0.001}
            // bevelThickness={0.001}
            // lineHeight={0.5}
            // letterSpacing={-0.06}
        >
            {text}
            <meshBasicMaterial color="#000000" />
        </Text3D>
    );
}

const leftControls = [
    {
        label: '1',
    },
    {
        label: '2',
    },
    {
        label: '3',
    },
];

const rightControls = [
    {
        label: 'A',
    },
    {
        label: 'B',
    },
    {
        label: 'C',
    },
];

export function World() {
    const { cameraControlsRef, isCameraLocked } = useCameraControls();
    const leftShape = createLeftShape();
    const rightShape = createRightShape();

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        // controls.setLookAt(1, 1.5, 2, 0, 1, 0, false);

        controls.setLookAt(0, 2, 12, 0, 2, 0, false);

        requestAnimationFrame(() => {
            // controls.setLookAt(0, 2.5, 6, 0, 2.5, 0, true);
            // controls.setLookAt(0, 2.5, 6, 0, 2.5, 0, false);
        });
    }, []);

    const leftControlsRef = useRef<Group>(null);
    const rightControlsRef = useRef<Group>(null);
    const { size } = useThree();

    const offsetX = 20;
    const offsetY = 20;
    const offsetZ = 0;

    // useEffect(() => {
    //     const leftGroup = leftControlsRef.current;
    //     const rightGroup = rightControlsRef.current;

    //     if (!leftGroup || !rightGroup) return;

    //     // console.log('size:', size);

    //     function update() {
    //         // const x = -3.75;
    //         const x = size.width / 270;
    //         const y = -0.5;
    //         const z = 0;

    //         leftGroup?.position.set(-x, y, z);
    //         leftGroup?.rotation.set(0, 0.25, 0);

    //         rightGroup?.position.set(x - (rightControls.length - .3), y, z);
    //         rightGroup?.rotation.set(0, -0.25, 0);
    //     }

    //     update();
    // }, [size, offsetX, offsetY, offsetZ]);

    const x = 3.3;

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

            {/* Left Controls */}
            {/* <PivotControls offset={[-0.1 - 0.5, 0, 0]}> */}
            <group ref={leftControlsRef} position={[-x, 0, 0]} rotation={[0, 0.25, 0]}>
                <group position={[-x, 0, 0]}>
                    {leftControls.map(({ label }, index) => {
                        const x = index > 0 ? index * WIDTH + 0.1 * index : 0;
                        const y = index * 0.1;

                        return (
                            <group key={index} position={[x, y, 0]}>
                                <mesh>
                                    <shapeGeometry args={[leftShape]} />
                                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />{' '}
                                    <Edges linewidth={2} threshold={15} color="#000000" />
                                </mesh>
                                <BoldText text={label} position={CENTER} />
                            </group>
                        );
                    })}
                </group>
            </group>
            {/* </PivotControls> */}

            {/* Right Controls */}
            {/* <PivotControls offset={[0.1 + 0.5, 0, 0]}> */}
            <group ref={rightControlsRef} position={[0, 0, 0]} rotation={[0, -0.25, 0]}>
                <group position={[0, 0, 0]}>
                    {rightControls.map(({ label }, index) => {
                        const x = index > 0 ? index * WIDTH + 0.1 * index : 0;
                        const y = (rightControls.length - 1 - index) * 0.1;

                        return (
                            <group key={index} position={[x, y, 0]}>
                                <mesh>
                                    <shapeGeometry args={[rightShape]} />
                                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />{' '}
                                    <Edges linewidth={2} threshold={15} color="#000000" />
                                </mesh>
                                <BoldText text={label} position={CENTER} />
                            </group>
                        );
                    })}
                </group>
            </group>
            {/* </PivotControls> */}

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
