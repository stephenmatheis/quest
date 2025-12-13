import { useWorld } from '@/providers/WorldProvider';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector2, Vector3 } from 'three';
import * as THREE from 'three';

export function HoverHighlight() {
    const { setPointerPos, setHitPos } = useWorld();
    const { camera, raycaster, scene, pointer } = useThree();
    const previousHovered = useRef<THREE.Object3D | null>(null);
    const values = useRef<{
        depthWrite: boolean;
        transparent: boolean;
        opacity: number;
        color: THREE.Color;
    }>({
        depthWrite: false,
        transparent: true,
        opacity: 0,
        color: new THREE.Color(1, 1, 1),
    });

    useEffect(() => {
        // Optional: Exclude certain layers or objects
        // Example: put HUD on layer 1, and ignore it
        // camera.layers.enable(0); // default
        // raycaster.layers.set(0); // only check layer 0
    }, []);

    useEffect(() => {
        function restore() {
            if (previousHovered.current) {
                const mesh = previousHovered.current as THREE.Mesh;
                const material = mesh.material as THREE.MeshStandardMaterial;

                if (material && 'color' in material) {
                    const { depthWrite, transparent, opacity, color } = values.current;

                    material.depthWrite = depthWrite;
                    material.transparent = transparent;
                    material.opacity = opacity;
                    material.color.set(color);
                }

                previousHovered.current = null;
            }
        }

        function onPointerMove() {
            setPointerPos(new Vector2(pointer.x, pointer.y));
            restore();

            raycaster.setFromCamera(pointer, camera);

            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                console.log(intersects);
            }

            const meshIntersect = intersects.find((i) => (i.object as THREE.Mesh).isMesh);

            if (meshIntersect) {
                const mesh = meshIntersect.object as THREE.Mesh;
                const material = mesh.material as THREE.MeshBasicMaterial;

                if (material && 'color' in material) {
                    values.current = {
                        depthWrite: material.depthWrite,
                        transparent: material.transparent,
                        opacity: material.opacity,
                        color: material.color.clone(),
                    };

                    console.log(values.current);

                    material.depthWrite = true;
                    material.transparent = false;
                    material.opacity = 1;
                    material.color.set('#ff0000');

                    previousHovered.current = mesh;
                }
            }

            if (intersects.length > 0) {
                setHitPos(intersects[0].point.clone());
            } else {
                setHitPos(new Vector3(0, 0, 0));
            }
        }

        window.addEventListener('pointermove', onPointerMove);

        return () => {
            restore();

            window.removeEventListener('pointermove', onPointerMove);
        };
    }, [pointer]);

    return null;
}
