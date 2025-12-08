import { Edges, Text3D } from '@react-three/drei';

export function LeftReadout() {
    return (
        <group position={[-6.5, 6, -1]}>
            <Text3D position={[0, 0, 0]} height={0.001} size={0.5} font={`/fonts/Mono_Bold.json`}>
                GRID 00
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                <Edges linewidth={2} threshold={15} color="#000000" />
            </Text3D>
        </group>
    );
}
