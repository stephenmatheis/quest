// import { Canvas } from '@react-three/fiber';
// import { Scene } from '@/components/Scene';ƒ
import { WorldProvider } from '@/providers/World';
import { UI } from '@/components/UI';

export default function App() {
    return (
        <>
            <WorldProvider>
                {/* <Canvas shadows camera={{ position: [0, 8, 12], fov: 75 }}>
                    <Scene />
                </Canvas> */}
                <UI />
            </WorldProvider>
        </>
    );
}
