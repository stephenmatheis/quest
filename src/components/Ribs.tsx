import { Edges, Line } from '@react-three/drei';
import { createRect } from '@/utils/shapes';
import { INTERIOR_COLOR, LINE_COLOR } from '@/lib/constants';

type RibsProps = {
    width: number;
    x: number;
};

export function Ribs({ width, x }: RibsProps) {
    const leftRect = createRect(width, 0.3);
    const leftTopRect = createRect(width + 0.2, 0.2);

    return (
        <group>
            {/* Left Rib Top Box */}
            <group position={[-x - 2.75, 3.75, -2]}>
                <mesh position={[0, 0, 0]}>
                    <shapeGeometry args={[leftTopRect]} />
                    <meshBasicMaterial color={INTERIOR_COLOR} alphaTest={2} />
                    <Edges linewidth={2} threshold={15} color={LINE_COLOR} />
                </mesh>
            </group>

            {/* Left Rib Boxes */}
            <group position={[-x - 3.75, 3.2, -2]}>
                {Array.from({ length: 4 }).map((_, i) => {
                    const y = i * -0.5;

                    return (
                        <mesh key={i} position={[0, y, 0]}>
                            <shapeGeometry args={[leftRect]} />
                            <meshBasicMaterial color={INTERIOR_COLOR} alphaTest={2} toneMapped={false} />
                            <Edges linewidth={2} threshold={15} color={LINE_COLOR} />
                        </mesh>
                    );
                })}
            </group>

            {/* Left Rib Lines */}
            <group position={[-x - 2, 3.5, -2]}>
                {Array.from({ length: 7 }).map((_, i) => {
                    const y = i * -0.3;

                    return (
                        <Line
                            key={i}
                            points={[
                                [0, y, 0],
                                [-0.5, y, 0],
                            ]}
                            color={LINE_COLOR}
                            linewidth={2}
                        />
                    );
                })}
            </group>

            {/* Left Ribs */}
            <group position={[-x, 1, -2]}>
                {Array.from({ length: 7 }).map((_, i) => {
                    const z = i * -3;

                    return (
                        <group key={i}>
                            <Line
                                points={[
                                    [0, 0, z],
                                    [-0.5, 0, z],
                                    [-1, 0.5, z],
                                    [-1, 3, z],
                                    [-0.5, 3.5, z],
                                    [0, 3.5, z],
                                ]}
                                color={LINE_COLOR}
                                linewidth={2}
                                // toneMapped={false}
                            />

                            <mesh position={[-0.25, 3.5 + 0.2, z]}>
                                <boxGeometry args={[0.5, 0.1, 0.1]} />
                                <meshBasicMaterial color={LINE_COLOR} alphaTest={1} toneMapped={true} />
                            </mesh>
                        </group>
                    );
                })}
            </group>

            {/* Right Ribs */}
            <group position={[x, 1, -2]}>
                {Array.from({ length: 7 }).map((_, i) => {
                    const x = 0;
                    const y = 0;
                    const z = i * -3;

                    return (
                        <Line
                            key={i}
                            points={[
                                [x + 0, y + 0, z],
                                [x + 0.5, y + 0, z],
                                [x + 1, y + 0.5, z],
                                [x + 1, y + 3, z],
                                [x + 0.5, y + 3.5, z],
                                [x + 0, y + 3.5, z],
                            ]}
                            color={LINE_COLOR}
                            linewidth={2}
                        />
                    );
                })}
            </group>
        </group>
    );
}
