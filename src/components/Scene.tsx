import { Suspense, useEffect, useRef } from 'react';
import { CameraControls, CameraControlsImpl, Grid, useHelper } from '@react-three/drei';
import {
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    PointLight,
    PointLightHelper,
} from 'three';
import { useCamera } from '@/providers/CameraProvider';
import { Torch } from '@/components/Models/Torch';
import { Dagger } from '@/components/Models/Dagger';
import { Roof } from './Roof';
import { BackWall } from './BackWall';
import { Floor } from './Floor';
import { Board } from './Board';
import { Quests } from './Quests';

const { ACTION } = CameraControlsImpl;

const ROOM_WIDTH = 24;
const ROOM_DEPTH = 24;

function RightTorch() {
    const rightTorchLight = useRef<PointLight>(null);

    useHelper(rightTorchLight as React.RefObject<PointLight>, PointLightHelper, 0.25, 'red');

    return (
        <>
            <pointLight ref={rightTorchLight} position={[3, 2.5, 0.25]} intensity={1} color="#ffb84d" />
            <Torch position={[3, 2, 0.25]} scale={1} />
        </>
    );
}

function LeftTorch() {
    const leftTorchLight = useRef<PointLight>(null);

    useHelper(leftTorchLight as React.RefObject<PointLight>, PointLightHelper, 0.25, 'red');

    return (
        <>
            <pointLight ref={leftTorchLight} position={[-3, 2.5, 0.25]} intensity={1} color="#ffb84d" />
            <Torch position={[-3, 2, 0.25]} scale={1} />
        </>
    );
}

export function Scene() {
    const { cameraControlsRef, isCameraLocked, start, end } = useCamera();
    const rightDirLightRef = useRef<DirectionalLight>(null);
    const leftDirLightRef = useRef<DirectionalLight>(null);
    const hemiLightRef = useRef<HemisphereLight>(null);

    useHelper(rightDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 0.25, 'red');
    useHelper(leftDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 0.25, 'red');
    useHelper(hemiLightRef as React.RefObject<HemisphereLight>, HemisphereLightHelper, 0.25, 'red');

    useEffect(() => {
        start();

        requestAnimationFrame(() => {
            end();
        });

        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.smoothTime = 1.1;
    }, [cameraControlsRef, end, start]);

    return (
        <>
            {/* Camera */}
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

            <directionalLight ref={rightDirLightRef} position={[6, 2, 2]} intensity={1} />
            <directionalLight ref={leftDirLightRef} position={[-6, 2, 2]} intensity={1} />
            <hemisphereLight
                ref={hemiLightRef}
                position={[0, 2, 10]}
                intensity={3}
                color="#fff2e2"
                groundColor="#4a341f"
            />
            <RightTorch />
            <LeftTorch />
            <Roof width={ROOM_WIDTH} depth={ROOM_DEPTH} />
            <BackWall width={ROOM_WIDTH} />
            <Floor width={ROOM_WIDTH} depth={ROOM_DEPTH} />
            <Board />
            <Dagger position={[1.5, 2.7, 0.5]} scale={0.75} rotation={[Math.PI / 1, Math.PI / 2.2, Math.PI / 2.75]} />
            <Suspense>
                <Quests />
            </Suspense>
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
