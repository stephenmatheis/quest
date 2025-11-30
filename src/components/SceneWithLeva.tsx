import { CameraControls, CameraControlsImpl, Edges, Grid } from '@react-three/drei';
import { useControls } from 'leva';
import { useCameraControls } from '@/providers/CameraProvider';

const { ACTION } = CameraControlsImpl;

function Outline({ linewidth = 4, scale = 1, threshold = 1, color = '#000000' }) {
    return <Edges linewidth={linewidth} scale={scale} threshold={threshold} color={color} />;
}

export function SceneWithLeva() {
    const { cameraControlsRef, isCameraLocked } = useCameraControls();
    const { x, y, z, color, intensity } = useControls({ x: 0, y: 3, z: 1, color: '#ffffff', intensity: 10 });

    return (
        <>
            <CameraControls
                ref={cameraControlsRef}
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
            <ambientLight color="#ffffff" intensity={2} />
            <group>
                <pointLight position={[x, y, z]} intensity={intensity} color={color} />
                <mesh position={[x, y, z]}>
                    <sphereGeometry args={[0.5, 32, 16]} />
                    <meshBasicMaterial color={color} />
                    <Outline linewidth={1} />
                </mesh>
            </group>
            <group>
                <group>
                    <mesh position={[0, 0.5, 0]}>
                        <boxGeometry args={[]} />
                        <meshToonMaterial color="#ff0000" />
                        <Outline />
                    </mesh>
                </group>

                <Grid
                    position={[0, 0, 0]}
                    cellSize={1}
                    cellThickness={1}
                    cellColor="#6f6f6f"
                    sectionSize={5}
                    sectionThickness={1}
                    sectionColor="#000000"
                    followCamera={false}
                    infiniteGrid={true}
                />
            </group>
        </>
    );
}
