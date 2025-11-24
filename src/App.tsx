import { Canvas } from '@react-three/fiber';
import { Scene } from '@/components/Scene';
import { WorldProvider } from '@/providers/WorldProvider';
import { CameraProvider } from './providers/CameraProvider';
import { CameraUI } from './components/CameraUI';
import { UI } from '@/components/UI';

export default function App() {
    return (
        <>
            <WorldProvider>
                <CameraProvider>
                    <Canvas shadows camera={{ position: [0, 8, 12], fov: 75 }}>
                        <Scene />
                    </Canvas>
                    <CameraUI />
                </CameraProvider>
                <UI />
            </WorldProvider>
        </>
    );
}
