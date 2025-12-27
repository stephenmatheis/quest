import { Ribs } from '@/components/Ribs';
import { Ring } from '@/components/Ring';

export function Dock() {
    return (
        <group position={[0, 1.5, -15]}>
            <Ring size={2.75} />
            <Ribs width={0.75} x={3} />
        </group>
    );
}
