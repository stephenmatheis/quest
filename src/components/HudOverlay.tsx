import { HudLeftReadout } from './HudLeftReadout';
import { HudFullKeyboard } from '@/components/HudFullKeyboard';
import { HudLeftTools } from '@/components/HudLeftTools';
import { HudProvider } from '@/providers/HudProvider';
import { useEffect } from 'react';
import { HudCenterTools } from './HudCenterTools';
import { EventVisualizer } from './EventVisualizer';
import { HoverHighlight } from './HoverHighlight';

export function HudOverlay({ onReady }: { onReady: () => void }) {
    useEffect(() => {
        const id = requestAnimationFrame(() => onReady?.());

        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <HudProvider>
            {/* <group position={[0, 0.75, 10]}> */}
            <group position={[0, 0.75, 0]}>
                <HudLeftTools />
                <HudCenterTools />
                <HudFullKeyboard />
                <HudLeftReadout />
                <HoverHighlight />
                <EventVisualizer />
            </group>
        </HudProvider>
    );
}
