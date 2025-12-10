import { useEffect } from 'react';
import { CameraControls, CameraControlsImpl } from '@react-three/drei';
import { useCameraControls } from '@/providers/CameraProvider';

const { ACTION } = CameraControlsImpl;

export function Cam() {
    const { cameraControlsRef, isCameraLocked } = useCameraControls();

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        // default (straight on)
        controls.setLookAt(0, 2, 20, 0, 2, 0, false);
    }, []);

    return (
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
    );
}
