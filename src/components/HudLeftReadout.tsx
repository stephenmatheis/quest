import { Edges, Text3D } from '@react-three/drei';
import { FONT } from '@/lib/constants';

export function HudLeftReadout() {
    return (
        <group position={[-3.65, 4.25, 0]}>
            <Text3D position={[0, 0, 0]} height={0.001} size={0.28} font={FONT}>
                grid OO 00
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                <Edges linewidth={2} threshold={15} color="#000000" />
            </Text3D>
        </group>
    );
}
