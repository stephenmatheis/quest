import { LeftReadout } from '@/components/LeftReadout';
import { CenterReadout } from '@/components/CenterReadout';
import { RightReadout } from '@/components/RightReadout';
import { Ribs } from '@/components/Ribs';
import { Ring } from '@/components/Ring';
import { Controls } from '@/components/Controls';
import { Plotter } from '@/components/Plotter';
import { FloorGuide } from '@/components/FloorGuide';
import { Cam } from './Cam';

const ASPECT_RATIO = 6 / 9;
const WIDTH = 0.75;
const HEIGHT = ASPECT_RATIO * WIDTH;

export function World() {
    const ringSize = 2.75;

    return (
        <>
            <Cam />
            <ambientLight intensity={5} />
            <Plotter />
            <Ring size={ringSize} />
            <LeftReadout />
            <CenterReadout />
            <RightReadout />
            <Ribs width={WIDTH} x={3} />
            <Controls width={WIDTH} height={HEIGHT} />
            <FloorGuide />
        </>
    );
}
