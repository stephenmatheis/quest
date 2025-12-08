import { useEffect } from 'react';
import { CameraControls, CameraControlsImpl, Edges, Grid, Line, Text3D } from '@react-three/drei';
import { useCameraControls } from '@/providers/CameraProvider';
import { RightReadout } from '@/components/RightReadout';
import { CenterReadout } from '@/components/CenterReadout';
import { Controls } from '@/components/Controls';
import { Ribs } from './Ribs';

// Controls
const ASPECT_RATIO = 6 / 9;
const WIDTH = 0.75;
const HEIGHT = ASPECT_RATIO * WIDTH;

// Ribs
const RIB_X = 3;

const { ACTION } = CameraControlsImpl;

export function World() {
    const { cameraControlsRef, isCameraLocked } = useCameraControls();
    const ringSize = 2.75;

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        // default (straight on)
        controls.setLookAt(0, 2, 20, 0, 2, 0, false);

        // controls.setLookAt(0, 3, 21, 0, 2, 0, false);
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

            {/* Right Readout */}
            <RightReadout />

            {/* Center Readout */}
            <CenterReadout />

            {/* Top Left Readout */}
            <group position={[-6.5, 6, -1]}>
                <Text3D position={[0, 0, 0]} height={0.001} size={0.5} font={`/fonts/Mono_Bold.json`}>
                    GRID 00
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                    <Edges linewidth={2} threshold={15} color="#000000" />
                </Text3D>
            </group>

            <Ribs width={WIDTH} x={RIB_X} />
            <Controls width={WIDTH} height={HEIGHT} />

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
