import { MeshBasicMaterial } from 'three';
import { Text3D } from '@react-three/drei';
import { FONT, LINE_COLOR } from '@/lib/constants';

export function HudLeftReadout() {
    const material = new MeshBasicMaterial({
        color: LINE_COLOR,
        userData: { ignore: true },
    });

    return (
        <group position={[-3.56, 2.45, 0]}>
            <Text3D position={[0, 0, 0]} height={0.001} size={0.2} font={FONT} material={material}>
                dock 2035
            </Text3D>
            <Text3D position={[0, -0.2, 0]} height={0.001} size={0.1} font={FONT} material={material}>
                [ insert ]
            </Text3D>
        </group>
    );
}
