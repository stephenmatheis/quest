import * as THREE from 'three';
import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
import { Points } from '@react-three/drei';
import { STAR_COLOR_DARK } from '@/lib/constants';

export function PointsSphere() {
    const ref = useRef<THREE.Points>(null);

    // useFrame((_, delta) => {
    //     if (ref.current) {
    //         ref.current.rotation.y += delta * 0.005;
    //         ref.current.rotation.x += delta * 0.005;
    //     }
    // });

    const sphereGeometry = new THREE.SphereGeometry(100, 64, 64);
    const positions = sphereGeometry.attributes.position.array as Float32Array;

    return (
        <Points ref={ref} positions={positions}>
            <pointsMaterial color={STAR_COLOR_DARK} size={1} sizeAttenuation={true} />
        </Points>
    );
}
