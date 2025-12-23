import { Hud, PerspectiveCamera } from '@react-three/drei';
import { HudLeftReadout } from './HudLeftReadout';
import { HudFullKeyboard } from '@/components/HudFullKeyboard';
import { HudRightReadout } from '@/components/HudRightReadout';
import { HudLeftTools } from '@/components/HudLeftTools';
import { HudProvider, useHud } from '@/providers/HudProvider';
import { useEffect, useRef, type ReactNode } from 'react';
import { HudCenterTools } from './HudCenterTools';
import { EventVisualizer } from './EventVisualizer';

function HudWrapper({ children }: { children: ReactNode }) {
    const { lockHud } = useHud();

    return lockHud ? (
        <Hud renderPriority={2}>
            <PerspectiveCamera makeDefault position={[0, 2, 11.8]} fov={25} />
            {children}
        </Hud>
    ) : (
        <group position={[0, .75, 0]}>{children}</group>
    );
}

export function HudOverlay({ onReady }: { onReady: () => void }) {
    const scale = useRef<number>(1);

    useEffect(() => {
        const id = requestAnimationFrame(() => onReady?.());

        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <HudProvider>
            <HudWrapper>
                <group scale={scale.current} layers={1}>
                    <HudLeftTools />
                    <HudCenterTools />
                    <HudFullKeyboard />
                    <HudLeftReadout />
                    <HudRightReadout />
                    <EventVisualizer />
                </group>
            </HudWrapper>
        </HudProvider>
    );
}

// import { Scene, Camera } from 'three';
// import { PerspectiveCamera } from '@react-three/drei';
// import { HudLeftReadout } from './HudLeftReadout';
// import { HudFullKeyboard } from '@/components/HudFullKeyboard';
// import { HudRightReadout } from '@/components/HudRightReadout';
// import { HudLeftTools } from '@/components/HudLeftTools';
// import { HudProvider } from '@/providers/HudProvider';
// import { useEffect, useState } from 'react';
// import { HudCenterTools } from './HudCenterTools';
// import { EventVisualizer } from './EventVisualizer';
// import { useFrame, useThree, createPortal } from '@react-three/fiber';

// const RENDER_PRIORITY: number = 2;

// type RenderHudProps = {
//     defaultScene: Scene;
//     defaultCamera: Camera;
//     renderPriority?: number;
// };

// function RenderHud({ defaultScene, defaultCamera }: RenderHudProps) {
//     const { gl, scene, camera } = useThree();
//     let oldCLear;

//     useFrame(() => {
//         oldCLear = gl.autoClear;

//         if (RENDER_PRIORITY === 1) {
//             gl.autoClear = true;

//             gl.render(defaultScene, defaultCamera);
//         }

//         gl.autoClear = false;

//         // gl.clearDepth();
//         gl.render(scene, camera);

//         gl.autoClear = oldCLear;
//     }, RENDER_PRIORITY);

//     return <group scale={1} onPointerOver={() => null} />;
// }

// export function HudOverlay({ onReady }: { onReady: () => void }) {
//     const { scene: defaultScene, camera: defaultCamera } = useThree();
//     const [hudScene] = useState(() => new Scene());

//     useEffect(() => {
//         const id = requestAnimationFrame(() => onReady?.());

//         return () => cancelAnimationFrame(id);
//     }, []);

//     return (
//         <HudProvider>
//             {createPortal(
//                 <>
//                     <PerspectiveCamera makeDefault position={[0, 2, 11.8]} fov={25} />
//                     <HudLeftTools />
//                     <HudCenterTools />
//                     <HudFullKeyboard />
//                     <HudLeftReadout />
//                     <HudRightReadout />
//                     <EventVisualizer />
//                     <RenderHud
//                         defaultScene={defaultScene}
//                         defaultCamera={defaultCamera}
//                         renderPriority={RENDER_PRIORITY}
//                     />
//                 </>,
//                 hudScene,
//                 { events: { priority: RENDER_PRIORITY } }
//             )}
//         </HudProvider>
//     );
// }
