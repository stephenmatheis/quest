import { HudLeftReadout } from './HudLeftReadout';
import { HudFullKeyboard } from '@/components/HudFullKeyboard';
import { HudLeftTools } from '@/components/HudLeftTools';
import { HudProvider, useHud } from '@/providers/HudProvider';
import { useEffect } from 'react';
import { HudCenterTools } from './HudCenterTools';
import { EventVisualizer } from './EventVisualizer';
import { HoverHighlight } from './HoverHighlight';
import { Helper } from '@react-three/drei';
import { BoxHelper } from 'three';

function Hud() {
    const { showHud } = useHud();

    return (
        <group position={[0, 0.69, -0.125]}>
            <Helper type={BoxHelper} args={['red']} />

            {showHud && (
                <>
                    <HudLeftTools />
                    <HudCenterTools />
                    <HudLeftReadout />
                    <HoverHighlight />
                </>
            )}
            <EventVisualizer />
            <HudFullKeyboard />
        </group>
    );
}

export function HudOverlay({ onReady }: { onReady: () => void }) {
    useEffect(() => {
        const id = requestAnimationFrame(() => onReady?.());

        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <HudProvider>
            <Hud />
        </HudProvider>
    );
}
