import * as THREE from 'three';
import { useEffect } from 'react';
import { CameraControls, CameraControlsImpl } from '@react-three/drei';
import { useCameraControls } from '@/providers/CameraProvider';

const { ACTION } = CameraControlsImpl;

export function Cam() {
    const { cameraControlsRef, hudRef, isCameraLocked, enabled } = useCameraControls();

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls || !hudRef.current) return;

        controls.setLookAt(0, 2.75, 12, 0, 2.75, 0, false);

        const hud = hudRef.current;
        const camera = controls.camera;
        const localOffset = new THREE.Vector3(0, -2.06, -12.125);
        const worldPos = new THREE.Vector3();

        function onUpdate() {
            worldPos.copy(camera.position);
            worldPos.add(localOffset.clone().applyEuler(camera.rotation));

            hud.position.copy(worldPos);
            hud.quaternion.copy(camera.quaternion);
        }

        controls.addEventListener('update', onUpdate);

        onUpdate();

        return () => {
            controls.removeEventListener('update', onUpdate);
        };
    }, [cameraControlsRef, hudRef]);

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
            enabled={enabled}
        />
    );
}
