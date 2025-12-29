import { Center, Edges, Line, Text3D } from '@react-three/drei';
import { createRect } from '@/utils/shapes';
import { FONT, INTERIOR_COLOR, LINE_COLOR } from '@/lib/constants';
import { MeshBasicMaterial } from 'three';

type RibsProps = {
    width: number;
    x: number;
    name?: string;
};

export function Ribs({ width, x, name = '0000' }: RibsProps) {
    const leftRect = createRect(width, 0.3);
    const leftTopRect = createRect(width + 0.2, 0.2);
    const material = new MeshBasicMaterial({ color: LINE_COLOR });

    return (
        <group>
            {/* <Billboard position={[0, 1, 0]} follow={true} lockX={false} lockY={false} lockZ={false}> */}
            <Center position={[0, 6.5, 0]}>
                <Text3D font={FONT} size={0.75} height={0.01} material={material}>
                    {name}
                </Text3D>
            </Center>
            {/* </Billboard> */}

            {/* Left Rib Top Box */}
            <group position={[-x - 2.75, 3.75, 0]}>
                <mesh position={[0, 0, 0]}>
                    <shapeGeometry args={[leftTopRect]} />
                    <meshBasicMaterial color={INTERIOR_COLOR} alphaTest={2} />
                    <Edges linewidth={2} threshold={15} color={LINE_COLOR} />
                </mesh>
            </group>

            {/* Left Rib Boxes */}
            <group position={[-x - 3.75, 3.2, 0]}>
                {Array.from({ length: 4 }).map((_, i) => {
                    const y = i * -0.5;

                    return (
                        <mesh key={i} position={[0, y, 0]}>
                            <shapeGeometry args={[leftRect]} />
                            <meshBasicMaterial color={INTERIOR_COLOR} alphaTest={2} />
                            <Edges linewidth={2} threshold={15} color={LINE_COLOR} />
                        </mesh>
                    );
                })}
            </group>

            {/* Left Rib Lines */}
            <group position={[-x - 2, 3.5, 0]}>
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
            <group position={[-x, 1, 0]}>
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
                            />

                            {/* // export const LINE_COLOR = 'rgb(1, 0.6470588235, 0,)'; */}

                            <mesh position={[-0.25, 3.5 + 0.2, z]}>
                                <boxGeometry args={[0.5, 0.1, 0.1]} />
                                <meshBasicMaterial color={LINE_COLOR} />
                            </mesh>
                        </group>
                    );
                })}
            </group>

            {/* Right Ribs */}
            <group position={[x, 1, 0]}>
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
