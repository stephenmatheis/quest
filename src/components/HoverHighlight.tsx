import { Vector2, Vector3, Object3D, Mesh, Material } from 'three';
import { useWorld } from '@/providers/WorldProvider';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const THROTTLE_MS = 1000;

export function HoverHighlight() {
    const { setPointerPos, setHitPos } = useWorld();
    const { camera, raycaster, scene, pointer } = useThree();

    const previousHovered = useRef<Object3D | null>(null);
    const savedMaterial = useRef<any>(null);
    const lastUpdate = useRef<number>(0);

    function restoreMaterial() {
        if (previousHovered.current && savedMaterial.current) {
            const mesh = previousHovered.current as Mesh;
            const material = mesh.material as Material;

            Object.assign(material, savedMaterial.current);

            savedMaterial.current = null;
            previousHovered.current = null;
        }
    }

    useEffect(() => {
        function onPointerMove() {
            restoreMaterial();

            raycaster.setFromCamera(pointer, camera);
            
            const intersects = raycaster.intersectObjects(scene.children, true);
            const meshHit = intersects.find((i) => (i.object as Mesh).isMesh);

            if (meshHit) {
                const mesh = meshHit.object as Mesh;
                const material = mesh.material as any;

                if (material?.color) {
                    savedMaterial.current = {
                        depthWrite: material.depthWrite,
                        transparent: material.transparent,
                        opacity: material.opacity,
                        color: material.color.clone(),
                    };

                    material.depthWrite = true;
                    material.transparent = false;
                    material.opacity = 1;
                    material.color.set('#ff0000');

                    previousHovered.current = mesh;
                }
            }

            const now = performance.now();

            if (now - lastUpdate.current > THROTTLE_MS) {
                setPointerPos(new Vector2(pointer.x, pointer.y));

                if (intersects.length > 0) {
                    setHitPos(intersects[0].point.clone());
                } else {
                    setHitPos(new Vector3());
                }

                lastUpdate.current = now;
            }
        }

        window.addEventListener('pointermove', onPointerMove);

        return () => {
            restoreMaterial();
            window.removeEventListener('pointermove', onPointerMove);
        };
    }, [camera, raycaster, scene, pointer, setPointerPos, setHitPos]);

    return null;
}
