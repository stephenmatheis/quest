import { Canvas } from '@react-three/fiber';
import { WorldProvider } from '@/providers/WorldProvider';
import { CameraProvider } from './providers/CameraProvider';
import { CameraUI } from './components/CameraUI';
import { UI } from '@/components/UI';
// import { Scene } from '@/components/Scene';
import { Book } from '@/components/Book';

export default function App() {
    return (
        <>
            <WorldProvider>
                <CameraProvider>
                    <Canvas
                        shadows
                        camera={{
                            position: [0, 10, 10],
                            fov: 50,
                            near: 0.1,
                            far: 1000,
                        }}
                    >
                        <Book />
                    </Canvas>
                    <CameraUI />
                </CameraProvider>
                <UI />
            </WorldProvider>
        </>
    );
}
