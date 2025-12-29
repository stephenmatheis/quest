import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Cam } from '@/components/Cam';
import { Dock } from '@/components/Dock';
import { FloorGuide } from '@/components/FloorGuide';
import { HudOverlay } from '@/components/HudOverlay';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useWorld } from '@/providers/WorldProvider';
import { Center, Text3D } from '@react-three/drei';
import { FONT, LINE_COLOR } from '@/lib/constants';

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

                {/* Level 2 */}
                <group position={[0, 24, 0]}>
                    <Center position={[0, 12, 0]}>
                        <Text3D height={0.01} size={1} font={FONT} raycast={() => {}}>
                            Level 2
                            <meshBasicMaterial color={LINE_COLOR} />
                        </Text3D>
                    </Center>
                    <Dock position={[0, 1.5, -12]} rotation={[0, 0, 0]} name={'Dock 1'} />
                    <Dock position={[12, 1.5, 0]} rotation={[0, Math.PI / -2, 0]} name={'Dock 2'} />
                    <Dock position={[0, 1.5, 12]} rotation={[0, Math.PI, 0]} name={'Dock 3'} />
                    <Dock position={[-12, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} name={'Dock 4'} />
                </group>

                {/* Level 1 */}
                <group>
                    <Center position={[0, 12, 0]}>
                        <Text3D height={0.01} size={1} font={FONT} raycast={() => {}}>
                            Level 1
                            <meshBasicMaterial color={LINE_COLOR} />
                        </Text3D>
                    </Center>
                    <Dock position={[0, 1.5, -12]} rotation={[0, 0, 0]} name={'Dock 1'} />
                    <Dock position={[12, 1.5, 0]} rotation={[0, Math.PI / -2, 0]} name={'Dock 2'} />
                    <Dock position={[0, 1.5, 12]} rotation={[0, Math.PI, 0]} name={'Dock 3'} />
                    <Dock position={[-12, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} name={'Dock 4'} />
                </group>
                <FloorGuide />
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
