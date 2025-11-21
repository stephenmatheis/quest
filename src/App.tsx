import { Canvas } from '@react-three/fiber';
import { WorldProvider } from '@/providers/World';
import { Scene } from '@/components/Scene';
import { UI } from '@/components/UI';

export default function App() {
    return (
        <>
            <WorldProvider>
                <Canvas shadows camera={{ position: [0, 8, 12], fov: 75 }}>
                    <Scene />
                </Canvas>
                <UI />
            </WorldProvider>
        </>
    );
}
