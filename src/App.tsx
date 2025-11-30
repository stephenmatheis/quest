import { Canvas } from '@react-three/fiber';
import { useWorld, WorldProvider } from '@/providers/WorldProvider';
import { CameraProvider } from './providers/CameraProvider';
import { CameraUI } from './components/CameraUI';
import { UI } from '@/components/UI';
import { Scene } from '@/components/Scene';
import { AnimatedBook } from './components/AnimatedBook';

function AppContent() {
    const { isQuestLogOpen } = useWorld();

    return (
        <>
            <Canvas
                shadows
                camera={{
                    position: [0, 3, 10],
                    fov: 50,
                    near: 0.1,
                    far: 1000,
                }}
            >
                <Scene />
            </Canvas>

            <Canvas style={{ position: 'absolute', top: 0, left: 0 }} camera={{ position: [0, 0, 0], fov: 25 }}>
                {isQuestLogOpen && <AnimatedBook />}
            </Canvas>

            <UI />
            <CameraUI />
        </>
    );
}

export default function App() {
    return (
        <WorldProvider>
            <CameraProvider>
                <AppContent />
            </CameraProvider>
        </WorldProvider>
    );
}
