import { Hud, PerspectiveCamera } from '@react-three/drei';
import { HudControls } from '@/components/HudControls';

export function HudOverlay() {
    return (
        <Hud renderPriority={1}>
            <PerspectiveCamera makeDefault position={[0, 2, 11.8]} fov={25} />
            <HudControls />
        </Hud>
    );
}
