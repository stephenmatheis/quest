import { useEffect } from 'react';
import { CameraControls, CameraControlsImpl, Edges, Grid, Text3D } from '@react-three/drei';
import { Shape, Vector3 } from 'three';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { useCameraControls } from '@/providers/CameraProvider';

const ASPECT_RATIO = 6 / 9;
const WIDTH = 1;
const HEIGHT = ASPECT_RATIO * WIDTH;
const LARGE_FONT_SIZE = 0.1;
const MEDIUM_FONT_SIZE = 0.09;
const SMALL_FONT_SIZE = 0.08;
const TOP_LEFT = new Vector3(LARGE_FONT_SIZE, HEIGHT - LARGE_FONT_SIZE - LARGE_FONT_SIZE / 2, 0);
const BOTTOM_LEFT = new Vector3(LARGE_FONT_SIZE, LARGE_FONT_SIZE / 2, 0);
const TOP_RIGHT = new Vector3(WIDTH - LARGE_FONT_SIZE, HEIGHT - LARGE_FONT_SIZE - LARGE_FONT_SIZE / 2, 0);

const { ACTION } = CameraControlsImpl;

function createControlShape() {
    const shape = new Shape();

    const width = WIDTH;
    const height = HEIGHT;
    const bevel = 0.125;

    // Start at bottom-left
    shape.moveTo(0, 0);

    // Bottom side
    shape.lineTo(width - bevel, 0);

    // Bottom-right angled corner
    shape.lineTo(width, bevel);

    // Right side
    shape.lineTo(width, height - bevel);

    // Top-right angled corner → top side
    shape.lineTo(width, height);

    // Top side
    shape.lineTo(bevel, height);

    // Top-left angled corner
    shape.lineTo(0, height - bevel);

    // Left side back to start
    shape.lineTo(0, 0);

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

const controls = [
    {
        position: new Vector3(-0.5, 1, 0),
    },
];

export function World() {
    const { cameraControlsRef, isCameraLocked } = useCameraControls();
    const shape = createControlShape();

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        // controls.setLookAt(1, 1.5, 2, 0, 1, 0, false);
        controls.setLookAt(0, 2, 12, 0, 2, 0, false);

        requestAnimationFrame(() => {
            // controls.setLookAt(0, 2.5, 6, 0, 2.5, 0, true);
            // controls.setLookAt(0, 2.5, 6, 0, 2.5, 0, false);
        });

        // Screen dimensions
        const css2dRender = new CSS2DRenderer();

        console.log(css2dRender.getSize());
    }, []);

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

            {/* Controls */}
            <group position={[0, 0, 0]}>
                {controls.map(({ position }, index) => {
                    return (
                        <group key={index} position={position}>
                            <mesh>
                                <shapeGeometry args={[shape]} />
                                <meshBasicMaterial transparent opacity={0} depthWrite={false} />{' '}
                                <Edges linewidth={2} threshold={15} color="#000000" />
                            </mesh>
                            <BoldText text="TL" position={TOP_LEFT} />
                            <RegularText text="BL" position={BOTTOM_LEFT} />
                            <LightText text="Light Text" position={TOP_RIGHT} />
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
