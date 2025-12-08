import { Line } from '@react-three/drei';

export function CenterReadout() {
    return (
        <group position={[-2, 6.25, -1]}>
            <Line
                points={[
                    [0, 0, 0],
                    [4, 0, 0],
                ]}
                color="#0000ff"
                lineWidth={2} />
        </group>
    );
}
