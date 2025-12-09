import { Line } from '@react-three/drei';

const WIDTH = 4;
const ARM_HEIGHT = 0.25;

export function FreeCenterReadout() {
    return (
        <group position={[-2, 6.5, -1]}>
            <Line
                points={[
                    [-ARM_HEIGHT, -ARM_HEIGHT, 0],
                    [0, 0, 0],
                    [WIDTH, 0, 0],
                    [WIDTH + ARM_HEIGHT, -ARM_HEIGHT, 0],
                ]}
                color="#000000"
                lineWidth={2}
            />
        </group>
    );
}
