import { useRef, useEffect, useState } from 'react';
import { useSpring, animated, useSprings } from '@react-spring/three';
import { useWorld } from '@/providers/WorldProvider';
import * as THREE from 'three';
import { Cover } from '@/components/Cover';
import { Page } from '@/components/Page';
import { Spine } from '@/components/Spine';
// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const PAGES = 10;
const DELAY = 0;
// const MASS = 1;
// const TENSION = 170;
// const FRICTION = 26;
const MASS = 2;
const TENSION = 120;
const FRICTION = 26;

const TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export function Book() {
    const { isQuestLogOpen, setIsQuestLogOpen } = useWorld();
    const [mounted, setMounted] = useState<boolean>(false);
    const bookRef = useRef<THREE.Group | null>(null);
    const leftCoverRef = useRef<THREE.Group | null>(null);
    const rightCoverRef = useRef<THREE.Group | null>(null);
    const leftPagesGroupRef = useRef<THREE.Group | null>(null);
    const leftPageRefs = useRef<(THREE.Group | null)[]>(null);
    leftPageRefs.current = Array(PAGES).fill(null);
    const rightPagesGroupRef = useRef<THREE.Group | null>(null);
    const rightPageRefs = useRef<(THREE.Group | null)[]>(null);
    rightPageRefs.current = Array(PAGES).fill(null);

    const { bookPosition, bookRotation } = useSpring(
        isQuestLogOpen
            ? {
                  from: {
                      bookPosition: [0, -2, 0] as [number, number, number],
                      bookRotation: [0.25, -0.5, 0.25],
                  },
                  to: {
                      bookPosition: [0, 0, 0] as [number, number, number],
                      bookRotation: [-0.125, 0, 0],
                  },
                  config: { mass: MASS, tension: TENSION, friction: FRICTION },
              }
            : {
                  from: {
                      bookPosition: [0, 0, 0] as [number, number, number],
                      bookRotation: [-0.125, 0, 0],
                  },
                  to: {
                      bookPosition: [0, -2, 0] as [number, number, number],
                      bookRotation: [0.25, -0.5, 0.25],
                  },
                  immediate: !mounted,
                  config: { mass: MASS, tension: TENSION, friction: FRICTION },
              }
    );

    const {
        lefCoverRotation,
        leftCoverPosition,
        leftPagesGroupPosition,
        rightCoverRotation,
        rightCoverPosition,
        rightPagesGroupPosition,
    } = useSpring(
        isQuestLogOpen
            ? {
                  from: {
                      lefCoverRotation: [0, Math.PI / 2, 0] as [number, number, number],
                      leftCoverPosition: [-0.3125, 0, 0.094] as [number, number, number],
                      leftPagesGroupPosition: [-0.25 + 0.0125, 0, 0] as [number, number, number],
                      rightCoverRotation: [0, Math.PI / -2, 0] as [number, number, number],
                      rightCoverPosition: [0.3125, 0, 0.094] as [number, number, number],
                      rightPagesGroupPosition: [0.25 - 0.0125, 0, 0] as [number, number, number],
                  },
                  to: {
                      lefCoverRotation: [0, 0.1, 0],
                      leftCoverPosition: [-0.25, 0, 0.1565] as [number, number, number],
                      leftPagesGroupPosition: [-0.25 + 0.025, 0, 0] as [number, number, number],
                      rightCoverRotation: [0, -0.1, 0],
                      rightCoverPosition: [0.25, 0, 0.1565] as [number, number, number],
                      rightPagesGroupPosition: [0.25 - 0.025, 0, 0] as [number, number, number],
                  },
                  delay: DELAY,
                  config: { mass: MASS, tension: TENSION, friction: FRICTION },
              }
            : {
                  from: {
                      lefCoverRotation: [0, 0.1, 0] as [number, number, number],
                      leftCoverPosition: [-0.25, 0, 0.1565] as [number, number, number],
                      leftPagesGroupPosition: [-0.25 + 0.025, 0, 0] as [number, number, number],
                      rightCoverRotation: [0, -0.1, 0] as [number, number, number],
                      rightCoverPosition: [0.25, 0, 0.1565] as [number, number, number],
                      rightPagesGroupPosition: [0.25 - 0.025, 0, 0] as [number, number, number],
                  },
                  to: {
                      lefCoverRotation: [0, Math.PI / 2, 0],
                      leftCoverPosition: [-0.3125, 0, 0.094] as [number, number, number],
                      leftPagesGroupPosition: [-0.25 + 0.0125, 0, 0] as [number, number, number],
                      rightCoverRotation: [0, Math.PI / -2, 0],
                      rightCoverPosition: [0.3125, 0, 0.094] as [number, number, number],
                      rightPagesGroupPosition: [0.25 - 0.0125, 0, 0] as [number, number, number],
                  },
                  immediate: !mounted,
                  config: { mass: MASS, tension: TENSION, friction: FRICTION },
              }
    );

    const [leftSprings, _leftApi] = useSprings(
        PAGES,
        (i: number) =>
            isQuestLogOpen
                ? {
                      from: {
                          position: [i === 0 ? 0 : 0.025 * i, 0, 0.094] as [number, number, number],
                      },
                      to: {
                          position: [i === 0 ? 0 : 0.025 * i, 0, 0.2315 + 0.025 * i] as [number, number, number],
                      },
                      delay: DELAY,
                      config: { mass: MASS, tension: TENSION, friction: FRICTION },
                  }
                : {
                      from: {
                          position: [i === 0 ? 0 : 0.025 * i, 0, 0.2315 + 0.025 * i] as [number, number, number],
                      },
                      to: {
                          position: [i === 0 ? 0 : 0.025 * i, 0, 0.094] as [number, number, number],
                      },
                      immediate: !mounted,
                      config: { mass: MASS, tension: TENSION, friction: FRICTION },
                  },
        [isQuestLogOpen]
    );

    const [rightSprings, _rightApi] = useSprings(
        PAGES,
        (i: number) =>
            isQuestLogOpen
                ? {
                      from: {
                          position: [i === 0 ? 0 : 0.025 * -i, 0, 0.094] as [number, number, number],
                      },
                      to: {
                          position: [i === 0 ? 0 : 0.025 * -i, 0, 0.2315 + 0.025 * i] as [number, number, number],
                      },
                      delay: DELAY,
                      config: { mass: MASS, tension: TENSION, friction: FRICTION },
                  }
                : {
                      from: {
                          position: [i === 0 ? 0 : 0.025 * -i, 0, 0.2315 + 0.025 * i] as [number, number, number],
                      },
                      to: {
                          position: [i === 0 ? 0 : 0.025 * -i, 0, 0.094] as [number, number, number],
                      },
                      immediate: !mounted,
                      config: { mass: MASS, tension: TENSION, friction: FRICTION },
                  },
        [isQuestLogOpen]
    );

    useEffect(() => {
        setMounted(true);
        setIsQuestLogOpen(true);
    }, []);

    return (
        <animated.group ref={bookRef} position={bookPosition} rotation={bookRotation as any}>
            <Spine position={[0, 0, 0]} />
            <Cover ref={leftCoverRef} position={leftCoverPosition} rotation={lefCoverRotation} side="left" />
            <Cover ref={rightCoverRef} position={rightCoverPosition} rotation={rightCoverRotation} side="right" />
            <animated.group ref={leftPagesGroupRef} position={leftPagesGroupPosition}>
                {leftSprings.map(({ position }, i) => {
                    return (
                        <Page
                            ref={(el) => {
                                leftPageRefs.current![i] = el;
                            }}
                            key={i}
                            thickness={0.025}
                            position={position}
                            rotation={lefCoverRotation}
                            side="left"
                            edges={false}
                            text={i === PAGES - 1 ? TEXT : undefined}
                        />
                    );
                })}
            </animated.group>
            <animated.group ref={rightPagesGroupRef} position={rightPagesGroupPosition}>
                {rightSprings.map(({ position }, i) => {
                    return (
                        <Page
                            key={i}
                            ref={(el) => {
                                leftPageRefs.current![i] = el;
                            }}
                            thickness={0.025}
                            position={position}
                            rotation={rightCoverRotation}
                            side="right"
                            edges={false}
                        />
                    );
                })}
            </animated.group>
        </animated.group>
    );
}

// function saveArrayBuffer(buffer: ArrayBuffer, filename: string) {
//     const blob = new Blob([buffer], { type: 'application/octet-stream' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = filename;
//     link.click();
// }

// function downloadGroupAsGLB(group: THREE.Group, filename = 'scene.glb') {
//     const exporter = new GLTFExporter();

//     // Options: set binary to true for GLB format
//     const options = {
//         binary: true,
//     };

//     exporter.parse(
//         group,
//         // Called when the export completes
//         function (result) {
//             if (result instanceof ArrayBuffer) {
//                 saveArrayBuffer(result, filename);
//             }
//         },
//         // Called when the export encounters an error
//         function (error) {
//             console.log('An error happened during export:', error);
//         },
//         // Options object
//         options
//     );
// }
