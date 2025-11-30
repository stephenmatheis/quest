import { useCameraControls } from '@/providers/CameraProvider';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Cover } from './Cover';
import { Page } from './Page';
import { Spine } from './Spine';
import { useWorld } from '@/providers/WorldProvider';

export function Book() {
    const ANIMATE = true;

    const { isQuestLogOpen } = useWorld();
    const { cameraControlsRef } = useCameraControls();

    const delay = 0.5;
    const duration = 1;
    const rotate = 2;
    const pages = 10;
    const x = 0.025;
    const t = 2 - rotate;

    const [mounted, setMounted] = useState<boolean>(false);

    const startTime = useRef<number | null>(null);
    const bookRef = useRef<THREE.Group | null>(null);
    const leftCoverRef = useRef<THREE.Group | null>(null);
    const rightCoverRef = useRef<THREE.Group | null>(null);
    const leftPagesGroupRef = useRef<THREE.Group | null>(null);
    const leftPageRefs = useRef<(THREE.Group | null)[]>(null);
    leftPageRefs.current = Array(pages).fill(null);
    const rightPagesGroupRef = useRef<THREE.Group | null>(null);
    const rightPageRefs = useRef<(THREE.Group | null)[]>(null);
    rightPageRefs.current = Array(pages).fill(null);

    useFrame((state) => {
        if (!ANIMATE) return;

        // Opening animation
        if (isQuestLogOpen) {
            if (!startTime.current) {
                startTime.current = state.clock.getElapsedTime();
            }

            const elapsed = state.clock.getElapsedTime() - startTime.current;

            if (elapsed < delay) return;

            const t = (elapsed - delay) / duration;
            const progress = Math.min(1, t);

            const rotate = THREE.MathUtils.lerp(2, 1, progress);
            const coverX = THREE.MathUtils.lerp(0.3125, 0.25, progress);
            const coverZ = THREE.MathUtils.lerp(0.094, 0.1565, progress);
            const pagesXOffset = THREE.MathUtils.lerp(0.0125, 0.025, progress);

            leftCoverRef.current?.rotation.set(Math.PI, Math.PI / rotate, Math.PI);
            leftCoverRef.current?.position.set(-coverX, 0, coverZ);
            rightCoverRef.current?.rotation.set(Math.PI, Math.PI / -rotate, Math.PI);
            rightCoverRef.current?.position.set(coverX, 0, coverZ);
            leftPagesGroupRef.current?.position.set(-0.25 + pagesXOffset, 0, 0);
            rightPagesGroupRef.current?.position.set(0.25 - pagesXOffset, 0, 0);
            leftPageRefs.current!.forEach((page, i) => {
                const endZ = 0.2315 + 0.025 * i;
                const posZ = THREE.MathUtils.lerp(0.094, endZ, progress);
                const posX = i === 0 ? 0 : x * i;

                page?.rotation.set(Math.PI, Math.PI / rotate, Math.PI);
                page?.position.set(posX, 0, posZ);
            });
            rightPageRefs.current!.forEach((page, i) => {
                const endZ = 0.2315 + 0.025 * i;
                const posZ = THREE.MathUtils.lerp(0.094, endZ, progress);
                const posX = i === 0 ? 0 : x * -i;

                page?.rotation.set(Math.PI, Math.PI / -rotate, Math.PI);
                page?.position.set(posX, 0, posZ);
            });
        }
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!ANIMATE) return;

        const controls = cameraControlsRef.current;

        if (!controls) return;

        // controls.setLookAt(0, 6, 5, 0, 6, 0, false);
        controls.setLookAt(0, 2, 0, -1, 6, 0, false); // NOTE: I don't know why these values work.

        if (isQuestLogOpen) {
            console.log('opening...');
            requestAnimationFrame(() => {
                controls.setLookAt(0.15, 2, 5, 0, 1, 0, true);
            });

            return;
        }

        if (mounted) {
            console.log('closing...');
        }
    }, [cameraControlsRef, isQuestLogOpen]);

    return (
        <group ref={bookRef} position={[0, 1, 0]} rotation={[Math.PI / 1.1, Math.PI, Math.PI]}>
            <Spine position={[0, 0, 0]} />
            <Cover
                ref={leftCoverRef}
                position={[-0.3125, 0, 0.094]}
                rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                side="left"
            />
            <Cover
                ref={rightCoverRef}
                position={[0.3125, 0, 0.094]}
                rotation={[Math.PI, Math.PI / -rotate, Math.PI]}
                side="right"
            />
            <group ref={leftPagesGroupRef} position={[-0.25 + 0.0125, 0, 0]}>
                {Array.from({ length: pages }).map((_, i) => {
                    const startingZ = 0.2315 + 0.025 * i;
                    const posX = i === 0 ? 0 : x * i;
                    const posZ = THREE.MathUtils.lerp(0.094, startingZ, t);

                    return (
                        <Page
                            key={i}
                            ref={(el) => {
                                leftPageRefs.current![i] = el;
                            }}
                            thickness={0.025}
                            position={[posX, 0, posZ]}
                            rotation={[Math.PI, Math.PI / rotate, Math.PI]}
                            side="left"
                        />
                    );
                })}
            </group>
            <group ref={rightPagesGroupRef} position={[0.25 - 0.0125, 0, 0]}>
                {Array.from({ length: pages }).map((_, i) => {
                    const startingZ = 0.2315 + 0.025 * i;
                    const posX = i === 0 ? 0 : x * -i;
                    const posZ = THREE.MathUtils.lerp(0.094, startingZ, t);

                    return (
                        <Page
                            key={i}
                            ref={(el) => {
                                rightPageRefs.current![i] = el;
                            }}
                            thickness={0.025}
                            position={[posX, 0, posZ]}
                            rotation={[Math.PI, Math.PI / -rotate, Math.PI]}
                            side="right"
                        />
                    );
                })}
            </group>
        </group>
    );
}
