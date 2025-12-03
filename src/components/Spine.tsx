import { Edges } from '@react-three/drei';

const PRIMARY_COLOR = 'hsla(21, 25%, 35%, 1.00)';
const SECONDARY_COLOR = 'hsla(45, 100%, 50%, 1.00)';
const SECONDARY_EDGE_COLOR = 'hsla(45, 100%, 41%, 1.00)';
const PRIMARY_EDGE_COLOR = 'hsla(21, 25%, 30%, 1.00)';

export function Spine({ position, edges = true }: { position: [number, number, number]; edges?: boolean }) {
    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={[0.625, 1.25, 0.0625]} />
                <meshStandardMaterial color={SECONDARY_COLOR} />
                {edges && <Edges linewidth={3} scale={1.0001} threshold={15} color={SECONDARY_EDGE_COLOR} />}
            </mesh>

            <mesh position={[0, 0, -0.0625]}>
                <boxGeometry args={[0.375, 1.25, 0.0625]} />
                <meshStandardMaterial color={PRIMARY_COLOR} />
                {edges && <Edges linewidth={3} scale={1.0001} threshold={15} color={PRIMARY_EDGE_COLOR} />}
            </mesh>

            <mesh position={[-0.28125, 0, 0.0625]}>
                <boxGeometry args={[0.0625, 1.25, 0.0625]} />
                <meshStandardMaterial color={SECONDARY_COLOR} />
                {edges && <Edges linewidth={3} scale={1.0001} threshold={15} color={SECONDARY_EDGE_COLOR} />}
            </mesh>

            <mesh position={[0.28125, 0, 0.0625]}>
                <boxGeometry args={[0.0625, 1.25, 0.0625]} />
                <meshStandardMaterial color={SECONDARY_COLOR} />
                {edges && <Edges linewidth={3} scale={1.0001} threshold={15} color={SECONDARY_EDGE_COLOR} />}
            </mesh>

            {/* Top Left */}
            <mesh position={[-0.21875, 0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color={PRIMARY_COLOR} />
                {edges && <Edges linewidth={3} scale={1.0001} threshold={15} color={PRIMARY_EDGE_COLOR} />}
            </mesh>

            {/* Top Right */}
            <mesh position={[0.21875, 0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color={PRIMARY_COLOR} />
                {edges && <Edges linewidth={3} scale={1.0001} threshold={15} color={PRIMARY_EDGE_COLOR} />}
            </mesh>

            {/* Bottom Left */}
            <mesh position={[-0.21875, -0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color={PRIMARY_COLOR} />
                {edges && <Edges linewidth={3} scale={1.0001} threshold={15} color={PRIMARY_EDGE_COLOR} />}
            </mesh>

            {/* Bottom Right */}
            <mesh position={[0.21875, -0.59375, -0.0625]}>
                <boxGeometry args={[0.1875, 0.0625, 0.0625]} />
                <meshStandardMaterial color={PRIMARY_COLOR} />
                {edges && <Edges linewidth={3} scale={1.0001} threshold={15} color={PRIMARY_EDGE_COLOR} />}
            </mesh>
        </group>
    );
}
