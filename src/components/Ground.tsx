import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import grass from '@/assets/grass.jpg';

export function Ground() {
    const texture = useTexture(grass);

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    return (
        <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial map={texture} map-repeat={[240, 240]} color="green" />
        </mesh>
    );
}
