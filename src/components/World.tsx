import { CameraControls, CameraControlsImpl, Grid, Sky } from '@react-three/drei';
import { useCameraControls } from '@/providers/CameraProvider';
import { useEffect } from 'react';

const { ACTION } = CameraControlsImpl;

export function World() {
    const { cameraControlsRef, isCameraLocked } = useCameraControls();

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.setLookAt(0, 5, 6, 0, 5, 0, false);

        requestAnimationFrame(() => {
            // controls.setLookAt(0, 2.5, 6, 0, 2.5, 0, true);
            controls.setLookAt(0, 2.5, 6, 0, 2.5, 0, false);
        });
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
            <Sky sunPosition={[100, 20, 100]} />
            <ambientLight intensity={5} />
            <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
            <Grid
                position={[0, 0, 0]}
                cellSize={1}
                cellThickness={1}
                cellColor="#6f6f6f"
                sectionSize={4}
                sectionThickness={1}
                sectionColor="#000000"
                followCamera={false}
                infiniteGrid={true}
            />
        </>
    );
}
