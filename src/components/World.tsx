import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Cam } from '@/components/Cam';
import { Ribs } from '@/components/Ribs';
import { Ring } from '@/components/Ring';
import { FloorGuide } from '@/components/FloorGuide';
import { HudOverlay } from '@/components/HudOverlay';

export function World() {
    const [ready, setReady] = useState<boolean>(false);

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                opacity: ready ? 1 : 0,
                transition: 'opacity 1000ms',
            }}
        >
            <Canvas
                shadows
                camera={{
                    fov: 25,
                }}
            >
                <Cam />
                {/* <Ring size={2.75} /> */}
                {/* <Ribs width={0.75} x={3} /> */}
                <FloorGuide />
                <HudOverlay onReady={() => setReady(true)} />
            </Canvas>
        </div>
    );
}
