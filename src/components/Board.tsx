export function Board() {
    return (
        <group>
            {/* Top */}
            <mesh position={[0, 3, 0.0625]}>
                <boxGeometry args={[4, 0.125, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Bottom */}
            <mesh position={[0, 1, 0.0625]}>
                <boxGeometry args={[4, 0.125, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Right */}
            <mesh position={[1.9375, 2, 0.0625]}>
                <boxGeometry args={[0.125, 1.875, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Left */}
            <mesh position={[-1.9375, 2, 0.0625]}>
                <boxGeometry args={[0.125, 1.875, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Center */}
            <mesh position={[0, 2, 0.0625]}>
                <boxGeometry args={[3.75, 2, 0.0125]} />
                <meshStandardMaterial color="#c2ac99" />
            </mesh>
        </group>
    );
}
