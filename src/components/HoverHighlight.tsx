import { useCameraControls } from '@/providers/CameraProvider';
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Color, Vector2, Vector3, Object3D, Mesh, Material, MeshBasicMaterial } from 'three';
import { HudRightReadout } from './HudRightReadout';

export function HoverHighlight() {
    const [pointerPos, setPointerPos] = useState<Vector2>(new Vector2());
    const [hitPos, setHitPos] = useState<Vector3>(new Vector3());
    const { cameraControlsRef } = useCameraControls();
    const { camera, raycaster, scene, pointer } = useThree();
    const previousHovered = useRef<Object3D | null>(null);
    const savedMaterial = useRef<{
        alphaTest: number;
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

            if (((meshHit?.object as Mesh)?.material as MeshBasicMaterial)?.userData?.ignore) return;

            if (meshHit) {
                const mesh = meshHit.object as Mesh;
                const material = mesh.material as any;

                if (material?.color) {
                    savedMaterial.current = {
                        alphaTest: material.alphaTest,
                        color: material.color.clone(),
                    };

                    material.alphaTest = 0;
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

    return (
        <group position={[0, 0.75, 0]}>
            <HudRightReadout hitPos={hitPos} pointerPos={pointerPos} />
        </group>
    );
}
