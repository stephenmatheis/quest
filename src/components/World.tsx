import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Cam } from '@/components/Cam';
import { FloorGuide } from '@/components/FloorGuide';
import { HudOverlay } from '@/components/HudOverlay';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useWorld } from '@/providers/WorldProvider';
import { Screen } from './Screen';

export function World() {
    const { bloom } = useWorld();
    const [ready, setReady] = useState<boolean>(false);
    const [maxHeight, setMaxHeight] = useState<number>(0);

    useEffect(() => {
        function onResize() {
            const { innerWidth } = window;

            setMaxHeight(innerWidth * 0.75);
        }

        onResize();

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
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
                    fov: 25,
                }}
                flat
            >
                <HudOverlay onReady={() => setReady(true)} />
                <Cam />
                <Screen />
                {/* <FloorGuide /> */}
                <EffectComposer>
                    {bloom ? (
                        <Bloom
                            mipMapBlur={true}
                            luminanceThreshold={0}
                            luminanceSmoothing={0}
                            intensity={2}
                            radius={0.9}
                        />
                    ) : (
                        <></>
                    )}
                </EffectComposer>
            </Canvas>
        </div>
    );
}
