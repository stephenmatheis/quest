type RingProps = {
    size: number;
};

export function Ring({ size }: RingProps) {
    return null;

    return (
        <group position={[0, size, -1]}>
            <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
                <torusGeometry args={[size, 0.01, 24, 256, Math.PI * 2 - 1]} />
                <meshBasicMaterial color="#000000" side={2} />
            </mesh>

            <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
                <torusGeometry args={[2, 0.01, 24, 256, Math.PI * 2 - 1]} />
                <meshBasicMaterial color="#000000" side={2} />
            </mesh>
        </group>
    );
}
