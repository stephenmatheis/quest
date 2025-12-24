import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Cam } from '@/components/Cam';
import { Ribs } from '@/components/Ribs';
import { Ring } from '@/components/Ring';
import { FloorGuide } from '@/components/FloorGuide';
import { HudOverlay } from '@/components/HudOverlay';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

export function World() {
    const [ready, setReady] = useState<boolean>(false);
    const [maxHeight, setMaxHeight] = useState<number>(0);

    useEffect(() => {
        function onResize() {
            const { innerWidth } = window;

            setMaxHeight(innerWidth * 0.75);
        }

        onResize();

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                maxHeight,
                opacity: ready ? 1 : 0,
                transition: 'opacity 1000ms',
            }}
        >
            <Canvas
                shadows
                camera={{
                    // fov: 24.2,
                    fov: 25,
                }}
            >
                <HudOverlay onReady={() => setReady(true)} />
                <Cam />
                <group position={[0, 1.5, -15]}>
                    <Ring size={2.75} />
                    <Ribs width={0.75} x={3} />
                </group>
                <FloorGuide />
                <EffectComposer>
                    <Bloom luminanceThreshold={0} intensity={5} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
