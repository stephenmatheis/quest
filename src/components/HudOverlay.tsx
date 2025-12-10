import { Hud, PerspectiveCamera } from '@react-three/drei';
import { HudLeftReadout } from './HudLeftReadout';
import { HudControls } from '@/components/HudControls';
import { HudCenterReadout } from '@/components/HUDCenterReadout';
import { HudRightReadout } from '@/components/HudRightReadout';
import { HudLeftTools } from '@/components/HudLeftTools';

export function HudOverlay() {
    return (
        // <Hud renderPriority={1}>
        <group position={[0, -2, 0]}>
            <PerspectiveCamera makeDefault position={[0, 2, 11.8]} fov={25} />

            <HudLeftTools />
            <HudControls />
            <HudLeftReadout />
            <HudCenterReadout />
            <HudRightReadout />
        </group>
        // </Hud>
    );
}
