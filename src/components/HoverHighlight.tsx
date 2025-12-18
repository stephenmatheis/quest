import { useWorld } from '@/providers/WorldProvider';
import { useCameraControls } from '@/providers/CameraProvider';
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import { Color, Vector2, Vector3, Object3D, Mesh, Material } from 'three';

export function HoverHighlight() {
    const { setPointerPos, setHitPos } = useWorld();
    const { cameraControlsRef } = useCameraControls();
    const { camera, raycaster, scene, pointer } = useThree();
    const previousHovered = useRef<Object3D | null>(null);
    const savedMaterial = useRef<{
        // depthWrite: boolean;
        // transparent: boolean;
        // opacity: number;
        color: Color;
    } | null>(null);
    const isCameraUpdating = useRef<boolean>(false);

    const restoreMaterial = useCallback(() => {
        if (previousHovered.current && savedMaterial.current) {
            const mesh = previousHovered.current as Mesh;
            const material = mesh.material as Material;

            Object.assign(material, savedMaterial.current);

            savedMaterial.current = null;
            previousHovered.current = null;
        }
    }, []);

    const updateHudReadings = useCallback(() => {
        setPointerPos(new Vector2(pointer.x, pointer.y));

        raycaster.setFromCamera(pointer, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            setHitPos(intersects[0].point.clone());
        } else {
            setHitPos(new Vector3());
        }
    }, []);

    useEffect(() => {
        const controls = cameraControlsRef.current;

        if (!controls) return;

        function onUpdate() {
            isCameraUpdating.current = true;
        }

        function onSleep() {
            isCameraUpdating.current = false;

            updateHudReadings();
        }

        controls.addEventListener('update', onUpdate);
        controls.addEventListener('sleep', onSleep);

        return () => {
            controls.removeEventListener('update', onUpdate);
            controls.removeEventListener('sleep', onSleep);
        };
    }, [cameraControlsRef, updateHudReadings]);

    useEffect(() => {
        function onPointerMove() {
            restoreMaterial();

            if (isCameraUpdating.current) return;

            raycaster.setFromCamera(pointer, camera);

            const intersects = raycaster.intersectObjects(scene.children, true);
            const meshHit = intersects.find((i) => (i.object as Mesh).isMesh);

            if (meshHit) {
                const mesh = meshHit.object as Mesh;
                const material = mesh.material as any;

                if (material?.color) {
                    savedMaterial.current = {
                        // depthWrite: material.depthWrite,
                        // transparent: material.transparent,
                        // opacity: material.opacity,
                        color: material.color.clone(),
                    };

                    // material.depthWrite = true;
                    // material.transparent = false;
                    // material.opacity = 1;
                    material.color.set('#ff0000');

                    previousHovered.current = mesh;
                }
            }

            updateHudReadings();
        }

        window.addEventListener('pointermove', onPointerMove);

        return () => {
            restoreMaterial();

            window.removeEventListener('pointermove', onPointerMove);
        };
    }, [camera, raycaster, scene, pointer, restoreMaterial, updateHudReadings]);

    return null;
}
