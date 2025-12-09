import { Hud, PerspectiveCamera } from '@react-three/drei';
import { HudLeftReadout } from './HudLeftReadout';
import { HudControls } from '@/components/HudControls';
import { HudCenterReadout } from './HUDCenterReadout';
import { HudRightReadout } from './HudRightReadout';

export function HudOverlay() {
    return (
        <Hud renderPriority={1}>
            <PerspectiveCamera makeDefault position={[0, 2, 11.8]} fov={25} />
            <HudControls />
            <HudLeftReadout />
            <HudCenterReadout />
            <HudRightReadout />
        </Hud>
    );
}
