import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Cam } from '@/components/Cam';
import { FloorGuide } from '@/components/FloorGuide';
import { HudOverlay } from '@/components/HudOverlay';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useWorld } from '@/providers/WorldProvider';
import { Center, Text3D } from '@react-three/drei';
import { FONT, LINE_COLOR } from '@/lib/constants';
import { MeshBasicMaterial } from 'three';

export function World() {
    const { bloom } = useWorld();
    const [ready, setReady] = useState<boolean>(false);
    const [maxHeight, setMaxHeight] = useState<number>(0);
    const material = new MeshBasicMaterial({ color: LINE_COLOR });

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
                    fov: 25,
                }}
                flat
            >
                <HudOverlay onReady={() => setReady(true)} />
                <Cam />

                {/* DEV: */}

                <group position={[0, 2, 0]}>
                    <Center>
                        {Array.from({ length: 24 }).map((_, i) => {
                            return (
                                <group key={i} position={[0, i * 0.5, 0]}>
                                    {Array.from({ length: 40 }).map((_, j) => {
                                        const label = j + 1;

                                        return (
                                            <Text3D
                                                key={j}
                                                position={[j * 0.6, 0, 0]}
                                                size={0.3}
                                                height={0.001}
                                                font={FONT}
                                                material={material}
                                            >
                                                {label < 10 ? `0${label}` : label}
                                            </Text3D>
                                        );
                                    })}
                                </group>
                            );
                        })}
                    </Center>
                </group>

                {/* DEV: */}

                {/* <FloorGuide /> */}
                <EffectComposer>
                    {bloom ? (
                        <Bloom
                            luminanceThreshold={0}
                            luminanceSmoothing={0}
                            mipMapBlur={true}
                            intensity={5}
                            radius={0.9}
                            levels={8}
                        />
                    ) : (
                        <></>
                    )}
                </EffectComposer>
            </Canvas>
        </div>
    );
}
