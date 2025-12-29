import { MeshBasicMaterial } from 'three';
import { Text3D } from '@react-three/drei';
import { FONT, LINE_COLOR } from '@/lib/constants';

export function HudLeftReadout() {
    const material = new MeshBasicMaterial({
        color: LINE_COLOR,
        userData: { ignore: true },
    });

    return (
        <group position={[-3.56, 2.5, 0]}>
            <Text3D position={[0, 0, 0]} height={0.001} size={0.15} font={FONT} material={material}>
                procedure:2035
            </Text3D>
            <Text3D position={[0, -0.2, 0]} height={0.001} size={0.07} font={FONT} material={material}>
                protocol / procedure / manual
            </Text3D>
        </group>
    );
}
