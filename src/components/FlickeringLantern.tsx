import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function FlickeringLantern() {
    const lightRef = useRef<THREE.PointLight>(null!);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        lightRef.current.intensity = 12 + Math.sin(t * 8) * 1.5 + Math.random() * 0.6;
    });

    return <pointLight ref={lightRef} position={[-6, 6, -1.5]} color="#ffdaa5" intensity={12} distance={15} />;
}
