import { useEffect } from 'react';
import { CameraControls, CameraControlsImpl } from '@react-three/drei';
import { useCameraControls } from '@/providers/CameraProvider';
import { LeftReadout } from '@/components/LeftReadout';
import { CenterReadout } from '@/components/CenterReadout';
import { RightReadout } from '@/components/RightReadout';
import { Ribs } from '@/components/Ribs';
import { Ring } from '@/components/Ring';
import { Controls } from '@/components/Controls';
import { Plotter } from '@/components/Plotter';
import { FloorGuide } from '@/components/FloorGuide';

const ASPECT_RATIO = 6 / 9;
const WIDTH = 0.75;
const HEIGHT = ASPECT_RATIO * WIDTH;

const { ACTION } = CameraControlsImpl;

export function World() {
    const { cameraControlsRef, isCameraLocked } = useCameraControls();
    const ringSize = 2.75;

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        // default (straight on)
        controls.setLookAt(0, 2, 20, 0, 2, 0, false);
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
            <Plotter />
            <Ring size={ringSize} />
            <LeftReadout />
            <CenterReadout />
            <RightReadout />
            <Ribs width={WIDTH} x={3} />
            <Controls width={WIDTH} height={HEIGHT} />
            <FloorGuide />
        </>
    );
}
