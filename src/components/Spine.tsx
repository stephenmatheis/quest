const PRIMARY_COLOR = 'hsla(21, 25%, 27%, 1.00)';
const SECONDARY_COLOR = 'hsla(45, 100%, 50%, 1.00)';

export function Spine({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={[0.625, 1.25, 0.0625]} />
                <meshStandardMaterial color={SECONDARY_COLOR} />
            </mesh>

            <mesh position={[0, 0, -0.0625]}>
                <boxGeometry args={[0.375, 1.25, 0.0625]} />
                <meshStandardMaterial color={PRIMARY_COLOR} />
            </mesh>

            <mesh position={[-0.28125, 0, 0.0625]}>
                <boxGeometry args={[0.0625, 1.25, 0.0625]} />
                <meshStandardMaterial color={SECONDARY_COLOR} />
            </mesh>

            <mesh position={[0.28125, 0, 0.0625]}>
                <boxGeometry args={[0.0625, 1.25, 0.0625]} />
                <meshStandardMaterial color={SECONDARY_COLOR} />
            </mesh>

            {/* Top Left */}
            <mesh position={[-0.21875, 0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color={PRIMARY_COLOR} />
            </mesh>

            {/* Top Right */}
            <mesh position={[0.21875, 0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color={PRIMARY_COLOR} />
            </mesh>

            {/* Bottom Left */}
            <mesh position={[-0.21875, -0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color={PRIMARY_COLOR} />
            </mesh>

            {/* Bottom Right */}
            <mesh position={[0.21875, -0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color={PRIMARY_COLOR} />
            </mesh>
        </group>
    );
}
