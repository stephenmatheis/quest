import { Hud, PerspectiveCamera } from '@react-three/drei';
import { HudLeftReadout } from './HudLeftReadout';
import { HudFullKeyboard } from '@/components/HudFullKeyboard';
import { HudCenterReadout } from '@/components/HudCenterReadout';
import { HudRightReadout } from '@/components/HudRightReadout';
import { HudLeftTools } from '@/components/HudLeftTools';
import { HudProvider, useHud } from '@/providers/HudProvider';
import { useEffect, useRef, type ReactNode } from 'react';
import { HudCenterTools } from './HudCenterTools';
import { EventVisualizer } from './EventVisualizer';

function HudWrapper({ children }: { children: ReactNode }) {
    const { lockHud } = useHud();

    return lockHud ? (
        <Hud renderPriority={1}>
            <PerspectiveCamera makeDefault position={[0, 2, 11.8]} fov={25} />
            {children}
        </Hud>
    ) : (
        <group position={[0, -2, 0]}>{children}</group>
    );
}

export function HudOverlay({ onReady }: { onReady: () => void }) {
    const scale = useRef<number>(1);

    useEffect(() => {
        const id = requestAnimationFrame(() => onReady?.());

        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <HudProvider>
            <HudWrapper>
                <group scale={scale.current} layers={1}>
                    <HudLeftTools />
                    <HudCenterTools />
                    <HudFullKeyboard />
                    <HudLeftReadout />
                    <HudCenterReadout />
                    <HudRightReadout />
                    <EventVisualizer />
                </group>
            </HudWrapper>
        </HudProvider>
    );
}
