import { Hud, PerspectiveCamera } from '@react-three/drei';
import { HudLeftReadout } from './HudLeftReadout';
import { HudFullKeyboard } from '@/components/HudFullKeyboard';
import { HudCenterReadout } from '@/components/HudCenterReadout';
import { HudRightReadout } from '@/components/HudRightReadout';
import { HudLeftTools } from '@/components/HudLeftTools';
import { HudProvider, useHud } from '@/providers/HudProvider';
import { useEffect, useRef, type ReactNode } from 'react';
// import { useThree } from '@react-three/fiber';

// const MAX_VIEWPORT_WIDTH = 25.759047956216584;

function HudWrapper({ children }: { children: ReactNode }) {
    const { lockHud } = useHud();

    return lockHud ? <Hud renderPriority={1}>{children}</Hud> : <group position={[0, -2, 0]}>{children}</group>;
}

export function HudOverlay({ onReady }: { onReady: () => void }) {
    // const viewport = useThree((state) => state.viewport);
    const scale = useRef<number>(1);

    useEffect(() => {
        // const { width, height } = viewport;

        // console.log(width, height);

        const id = requestAnimationFrame(() => onReady?.());

        return () => cancelAnimationFrame(id);
        // }, [viewport]);
    }, []);

    return (
        <HudProvider>
            <HudWrapper>
                <PerspectiveCamera makeDefault position={[0, 2, 11.8]} fov={25} />
                <group scale={scale.current}>
                    <HudLeftTools />
                    <HudFullKeyboard />
                    <HudLeftReadout />
                    <HudCenterReadout />
                    <HudRightReadout />
                </group>
            </HudWrapper>
        </HudProvider>
    );
}
