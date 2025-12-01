import { Canvas } from '@react-three/fiber';
import { useWorld } from '@/providers/WorldProvider';
import { Experience } from '@/components/Experience';
import { AnimatedBook } from '@/components/AnimatedBook';
import { UI } from '@/components/UI';
import { CameraUI } from '@/components/CameraUI';
import { KeyboardControls } from '@react-three/drei';

export function AppContent() {
    const { isQuestLogOpen } = useWorld();

    const keyboardMap = [
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'run', keys: ['Shift'] },
    ];

    return (
        <>
            <KeyboardControls map={keyboardMap}>
                <Canvas shadows camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }} style={{ touchAction: 'none' }}>
                    <color attach="background" args={['#ececec']} />
                    <Experience />
                </Canvas>
            </KeyboardControls>

            <Canvas
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: isQuestLogOpen ? 'all' : 'none' }}
                camera={{ position: [0, 0, 5], fov: 25 }}
            >
                <AnimatedBook />
            </Canvas>
            <UI />
            <CameraUI off />
        </>
    );
}
