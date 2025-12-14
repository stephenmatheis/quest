import { Text3D } from '@react-three/drei';
import { FONT } from '@/lib/constants';

export function FreeRightReadout() {
    const fontSize = 0.14;

    return (
        <group position={[4.5, 6.4, -1]}>
            {/* Line 1 */}
            <Text3D position={[0, 0, 0]} height={0.001} size={fontSize} font={FONT}>
                connected to SC 10.1
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 2 */}
            <Text3D position={[0, -0.35, 0]} height={0.001} size={fontSize} font={FONT}>
                std 4301.056.92.6
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 3 */}
            <Text3D position={[0, -0.7, 0]} height={0.001} size={fontSize} font={FONT}>
                x 231 y 492 z 69
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 4 */}
            <Text3D position={[0, -1.05, 0]} height={0.001} size={fontSize} font={FONT}>
                sgnl 2035 ///
                <meshBasicMaterial color="#000000" />
            </Text3D>
        </group>
    );
}
