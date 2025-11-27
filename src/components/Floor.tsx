export function Floor({ width, depth }: { width: number; depth: number }) {
    return (
        <mesh position={[0, 0.125, depth / 2]}>
            <boxGeometry args={[width, 0.25, depth]} />
            <meshStandardMaterial color="#A6703E" />
        </mesh>
    );
}
