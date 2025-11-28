import { Shape } from 'three';

export function Board() {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(4, 0);
    shape.lineTo(4, 0.5);
    shape.lineTo(0, 0.5);
    shape.lineTo(0, 0);

    const extrudeSettings = {
        depth: 0.5,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 1,
    };

    return (
        <group>
            {/* Top */}
            <mesh position={[0, 0, 0]}>
                {/* <boxGeometry args={[4, 0.5, 0.5]} /> */}
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <meshStandardMaterial color="#88501e" />
            </mesh>

            {/* Bottom */}
            {/* <mesh position={[0, 1, 0.0625]}>
                <boxGeometry args={[4, 0.125, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh> */}

            {/* Right */}
            {/* <mesh position={[1.9375, 2, 0.0625]}>
                <boxGeometry args={[0.125, 1.875, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh> */}

            {/* Left */}
            {/* <mesh position={[-1.9375, 2, 0.0625]}>
                <boxGeometry args={[0.125, 1.875, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh> */}

            {/* Center */}
            {/* <mesh position={[0, 2, 0.0625]}>
                <boxGeometry args={[3.75, 2, 0.0125]} />
                <meshStandardMaterial color="#c2ac99" />
            </mesh> */}
        </group>
    );
}
