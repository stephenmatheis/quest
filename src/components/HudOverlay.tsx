import type { ReactNode } from 'react';
import { Hud, PerspectiveCamera } from '@react-three/drei';
import { HudLeftReadout } from './HudLeftReadout';
import { HudFullKeyboard } from '@/components/HudFullKeyboard';
import { HudCenterReadout } from '@/components/HudCenterReadout';
import { HudRightReadout } from '@/components/HudRightReadout';
import { HudLeftTools } from '@/components/HudLeftTools';
import { HudProvider, useHud } from '@/providers/HudProvider';

function ParentNode({ children }: { children: ReactNode }) {
    const { lockHud } = useHud();

    if (!lockHud) {
        return <group position={[0, -2, 0]}>{children}</group>;
    }

    return <Hud renderPriority={1}>{children}</Hud>;
}

export function HudOverlay() {
    return (
        <HudProvider>
            <ParentNode>
                <PerspectiveCamera makeDefault position={[0, 2, 11.8]} fov={25} />
                <HudLeftTools />
                <HudFullKeyboard />
                <HudLeftReadout />
                <HudCenterReadout />
                <HudRightReadout />
            </ParentNode>
        </HudProvider>
    );
}
