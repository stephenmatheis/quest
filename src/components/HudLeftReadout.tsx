import { Edges, Text3D } from '@react-three/drei';
import { FONT } from '@/lib/constants';

export function HudLeftReadout() {
    return (
        <group position={[-3.65, 4.35, 0]}>
            <Text3D position={[0, 0, 0]} height={0.001} size={0.2} font={FONT}>
                dock 2035
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                <Edges linewidth={2} threshold={15} color="#000000" />
            </Text3D>
            <group position={[0, -0.2, 0]}>
                <Text3D position={[0, 0, 0]} height={0.001} size={0.1} font={FONT}>
                    [ insert ]
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                    <meshBasicMaterial color="#000000" />
                </Text3D>
            </group>
        </group>
    );
}
