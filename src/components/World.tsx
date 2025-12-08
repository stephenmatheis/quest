import { Cam } from '@/components/Cam';
import { LeftReadout } from '@/components/LeftReadout';
import { CenterReadout } from '@/components/CenterReadout';
import { RightReadout } from '@/components/RightReadout';
import { Ribs } from '@/components/Ribs';
import { Ring } from '@/components/Ring';
import { Plotter } from '@/components/Plotter';
import { FloorGuide } from '@/components/FloorGuide';
import { HudOverlay } from '@/components/HudOverlay';

export function World() {
    return (
        <>
            <Cam />
            <ambientLight intensity={5} />
            <Plotter />
            <Ring size={2.75} />
            <LeftReadout />
            <CenterReadout />
            <RightReadout />
            <Ribs width={0.75} x={3} />
            <HudOverlay />
            <FloorGuide />
        </>
    );
}
