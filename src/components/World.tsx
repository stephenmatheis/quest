import { Cam } from '@/components/Cam';
import { Ribs } from '@/components/Ribs';
import { Ring } from '@/components/Ring';
// import { Plotter } from '@/components/Plotter';
import { FloorGuide } from '@/components/FloorGuide';
import { HudOverlay } from '@/components/HudOverlay';

export function World() {
    return (
        <>
            <Cam />
            <ambientLight intensity={5} />
            {/* TODO: finish plotter */}
            {/* <Plotter /> */}
            <Ring size={2.75} />
            <Ribs width={0.75} x={3} />
            <HudOverlay />
            <FloorGuide />
        </>
    );
}
