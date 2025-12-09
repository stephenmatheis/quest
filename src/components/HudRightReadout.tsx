import { Text3D } from '@react-three/drei';

export function HudRightReadout() {
    const fontSize = 0.0787;

    return (
        <group position={[2.528, 4.475, 0]}>
            {/* Line 1 */}
            <Text3D position={[0, -0.002, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                connected to SC 10.1
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 2 */}
            <Text3D position={[0, -0.2, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                std 4301.056.92.6
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 3 */}
            <Text3D position={[0, -0.397, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                x 231 y 492 z 69
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 4 */}
            <Text3D position={[0, -0.592, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                sgnl 2035 ///
                <meshBasicMaterial color="#000000" />
            </Text3D>
        </group>
    );
}
