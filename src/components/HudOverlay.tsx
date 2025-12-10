import { Hud, PerspectiveCamera } from '@react-three/drei';
import { HudLeftReadout } from './HudLeftReadout';
import { HudControls } from '@/components/HudControls';
import { HudCenterReadout } from '@/components/HudCenterReadout';
import { HudRightReadout } from '@/components/HudRightReadout';
import { HudLeftTools } from '@/components/HudLeftTools';
import { HudProvider } from '@/providers/HudProvider';

export function HudOverlay() {
    return (
        // <Hud renderPriority={1}>
        <group position={[0, -2, 0]}>
            <PerspectiveCamera makeDefault position={[0, 2, 11.8]} fov={25} />

            <HudProvider>
                <HudLeftTools />
                <HudControls />
            </HudProvider>
            <HudLeftReadout />
            <HudCenterReadout />
            <HudRightReadout />
        </group>
        // </Hud>
    );
}
