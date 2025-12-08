import { Line } from '@react-three/drei';

export function Plotter() {
    return (
        <group position={[-10, 2, 0]}>
            {/* Horizontal */}
            <Line
                points={[
                    [0, 0, 0],
                    [20, 0, 0],
                ]}
                color="#ff0000"
                lineWidth={2}
            />

            {/* Vertical */}
            <Line
                position={[10, -10, 0]}
                points={[
                    [0, 0, 0],
                    [0, 20, 0],
                ]}
                color="#ff0000"
                lineWidth={2}
            />
        </group>
    );
}
