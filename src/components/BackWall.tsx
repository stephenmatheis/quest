export function BackWall({ width }: { width: number }) {
    return (
        <mesh position={[0, 3.0625, -0.25]}>
            <boxGeometry args={[width, 6.125, 0.5]} />
            <meshStandardMaterial color="#808080" />
        </mesh>
    );
}
