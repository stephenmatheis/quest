import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HoverHighlight() {
    const { camera, raycaster, scene, pointer } = useThree();
    const previousHovered = useRef<THREE.Object3D | null>(null);

    useEffect(() => {
        // Optional: Exclude certain layers or objects
        // Example: put HUD on layer 1, and ignore it
        // camera.layers.enable(0); // default
        // raycaster.layers.set(0); // only check layer 0
    }, []);

    useFrame(() => {
        // Reset previous hovered object
        if (previousHovered.current) {
            const mesh = previousHovered.current as THREE.Mesh;
            const material = mesh.material as THREE.MeshStandardMaterial;

            if (material && 'color' in material) {
                material.color.set('#000000'); // or original color
            }
            previousHovered.current = null;
        }

        raycaster.setFromCamera(pointer, camera);

        // Important: Filter out non-mesh objects or unwanted ones
        const intersects = raycaster.intersectObjects(scene.children, true);

        // Filter to only meshes (or specific ones)
        const meshIntersect = intersects.find((i) => i.object.type === 'Mesh');

        if (meshIntersect) {
            const mesh = meshIntersect.object as THREE.Mesh;
            const material = mesh.material as THREE.MeshStandardMaterial;

            if (material && 'color' in material) {
                material.color.set('#ff0000'); // highlight red
                previousHovered.current = mesh;
            }
        }
    });

    return null;
}
