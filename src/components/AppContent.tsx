import { Canvas } from '@react-three/fiber';
import { useWorld } from '@/providers/WorldProvider';
import { World } from '@/components/World';
import { AnimatedBook } from '@/components/AnimatedBook';
import { UI } from '@/components/UI';
import { CameraUI } from '@/components/CameraUI';

export function AppContent() {
    const { isQuestLogOpen } = useWorld();

    return (
        <>
            <Canvas shadows>
                <World />
            </Canvas>
            <Canvas
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: isQuestLogOpen ? 'all' : 'none' }}
                camera={{ position: [0, 0, 0], fov: 25 }}
            >
                {isQuestLogOpen && <AnimatedBook />}
            </Canvas>
            <UI />
            <CameraUI />
        </>
    );
}
