import { Line } from '@react-three/drei';

const WIDTH = 2.25;
const ARM_HEIGHT = 0.14;

export function HudCenterReadout() {
    return (
        <group position={[WIDTH / -2, 4.53, 0]}>
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
