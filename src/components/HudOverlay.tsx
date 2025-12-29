import { HudLeftReadout } from './HudLeftReadout';
import { HudFullKeyboard } from '@/components/HudFullKeyboard';
import { HudLeftTools } from '@/components/HudLeftTools';
import { HudProvider, useHud } from '@/providers/HudProvider';
import { useEffect } from 'react';
import { HudCenterTools } from './HudCenterTools';
import { EventVisualizer } from './EventVisualizer';
import { HoverHighlight } from './HoverHighlight';
import { useCameraControls } from '@/providers/CameraProvider';

function Hud() {
    const { hudRef } = useCameraControls();
    const { showHud } = useHud();

    return (
        <group ref={hudRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
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
