import { Ribs } from '@/components/Ribs';
import { Ring } from '@/components/Ring';

type DockProps = {
    name?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
};

export function Dock({ name, position = [0, 1.5, -12], rotation = [0, 0, 0] }: DockProps) {
    return (
        <group position={position} rotation={rotation}>
            <Ring size={2.75} />
            <Ribs width={0.75} x={3} name={name} />
        </group>
    );
}
