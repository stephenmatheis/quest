import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Cover } from './Cover';
import { Page } from './Page';
import { Spine } from './Spine';
import { useWorld } from '@/providers/WorldProvider';

import { useSpring, animated, useSprings } from '@react-spring/three';

const PAGES = 10;
const DELAY = 0;

export function Book() {
    const { isQuestLogOpen } = useWorld();
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
                      bookRotation: [-0.325, 0, 0],
                  },
              }
            : {
                  from: {
                      bookPosition: [0, 0, 0] as [number, number, number],
                      bookRotation: [-0.325, 0, 0],
                  },
                  to: {
                      bookPosition: [0, -2, 0] as [number, number, number],
                      bookRotation: [0.25, -0.5, 0.25],
                  },
                  immediate: !mounted,
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
                      lefCoverRotation: [0, 0, 0],
                      leftCoverPosition: [-0.25, 0, 0.1565] as [number, number, number],
                      leftPagesGroupPosition: [-0.25 + 0.025, 0, 0] as [number, number, number],
                      rightCoverRotation: [0, 0, 0],
                      rightCoverPosition: [0.25, 0, 0.1565] as [number, number, number],
                      rightPagesGroupPosition: [0.25 - 0.025, 0, 0] as [number, number, number],
                  },
                  delay: DELAY,
              }
            : {
                  from: {
                      lefCoverRotation: [0, 0, 0] as [number, number, number],
                      leftCoverPosition: [-0.25, 0, 0.1565] as [number, number, number],
                      leftPagesGroupPosition: [-0.25 + 0.025, 0, 0] as [number, number, number],
                      rightCoverRotation: [0, 0, 0] as [number, number, number],
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
                  }
                : {
                      from: {
                          position: [i === 0 ? 0 : 0.025 * i, 0, 0.2315 + 0.025 * i] as [number, number, number],
                      },
                      to: {
                          position: [i === 0 ? 0 : 0.025 * i, 0, 0.094] as [number, number, number],
                      },
                      immediate: !mounted,
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
                  }
                : {
                      from: {
                          position: [i === 0 ? 0 : 0.025 * -i, 0, 0.2315 + 0.025 * i] as [number, number, number],
                      },
                      to: {
                          position: [i === 0 ? 0 : 0.025 * -i, 0, 0.094] as [number, number, number],
                      },
                      immediate: !mounted,
                  },
        [isQuestLogOpen]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        // <animated.group ref={bookRef} position={[0, 0, 0]} rotation={[Math.PI / 1.1, Math.PI, Math.PI]}>
        <animated.group ref={bookRef} position={bookPosition} rotation={bookRotation as any}>
            <Spine position={[0, 0, 0]} />
            <Cover ref={leftCoverRef} position={leftCoverPosition} rotation={lefCoverRotation} side="left" />
            <Cover ref={rightCoverRef} position={rightCoverPosition} rotation={rightCoverRotation} side="right" />
            <animated.group ref={leftPagesGroupRef} position={leftPagesGroupPosition}>
                {leftSprings.map(({ position }, i) => {
                    return (
                        <Page
                            key={i}
                            ref={(el) => {
                                leftPageRefs.current![i] = el;
                            }}
                            thickness={0.025}
                            position={position}
                            rotation={lefCoverRotation}
                            side="left"
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
                        />
                    );
                })}
            </animated.group>
        </animated.group>
    );
}
