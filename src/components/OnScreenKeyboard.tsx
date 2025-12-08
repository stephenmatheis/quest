import { Controls } from '@/components/Controls';
import { Cam } from './Cam';

const ASPECT_RATIO = 6 / 9;
const WIDTH = 0.75;
const HEIGHT = ASPECT_RATIO * WIDTH;

export function World() {
    return (
        <>
            <Cam />
            <Controls width={WIDTH} height={HEIGHT} />
        </>
    );
}
