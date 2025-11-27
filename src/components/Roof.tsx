export function Roof({ width, depth }: { width: number; depth: number }) {
    return (
        <mesh position={[0, 6, depth / 2]}>
            <boxGeometry args={[width, 0.25, depth]} />
            <meshStandardMaterial color="#643A16" />
        </mesh>
    );
}
