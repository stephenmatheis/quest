// import { useWorld } from '@/providers/WorldProvider';
// import { AnimatedBook } from '@/components/AnimatedBook';
// import { UI } from '@/components/UI';
// import { CameraUI } from '@/components/CameraUI';
import { World } from './World';

export function AppContent() {
    // const { isQuestLogOpen } = useWorld();

    return (
        <>
            <World />
            {/* <Canvas
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: isQuestLogOpen ? 'all' : 'none' }}
                camera={{ position: [0, 0, 5], fov: 25 }}
            >
                <AnimatedBook />
            </Canvas> */}
            {/* <UI /> */}
            {/* <CameraUI /> */}
        </>
    );
}
