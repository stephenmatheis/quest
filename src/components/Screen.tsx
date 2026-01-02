import { useEffect, useState } from 'react';
import { Center, Text3D } from '@react-three/drei';
import { FONT, LINE_COLOR, RED } from '@/lib/constants';
import { MeshBasicMaterial } from 'three';

const COLUMNS = 20;
const ROWS = 12;
const GAP = 0.5;

export function Screen() {
    const [position, setPosition] = useState<[number, number]>([ROWS - 1, 0]);
    const material = new MeshBasicMaterial({ color: LINE_COLOR });
    const selectedMaterial = new MeshBasicMaterial({ color: RED });

    useEffect(() => {
        function onKeydown(event: KeyboardEvent) {
            const key = event.key.toLowerCase();

            if (key === 'l') {
                setPosition((prev) => {
                    if (prev[1] < COLUMNS - 1) {
                        return [prev[0], prev[1] + 1];
                    }

                    return prev;
                });

                return;
            }

            if (key === 'h') {
                setPosition((prev) => {
                    if (prev[1] > 0) {
                        return [prev[0], prev[1] - 1];
                    }

                    return prev;
                });

                return;
            }

            if (key === 'k') {
                setPosition((prev) => {
                    if (prev[0] < ROWS - 1) {
                        return [prev[0] + 1, prev[1]];
                    }

                    return prev;
                });

                return;
            }

            if (key === 'j') {
                setPosition((prev) => {
                    if (prev[0] > 0) {
                        return [prev[0] - 1, prev[1]];
                    }

                    return prev;
                });

                return;
            }
        }

        window.addEventListener('keydown', onKeydown);

        return () => {
            window.removeEventListener('keydown', onKeydown);
        };
    }, []);

    return (
        <group position={[0, (ROWS * GAP) / 2, 0]}>
            <Center>
                {Array.from({ length: ROWS }).map((_, i) => {
                    return (
                        <group key={i} position={[0, i * GAP, 0]}>
                            {Array.from({ length: COLUMNS }).map((_, j) => {
                                const isSelected = position[0] === i && position[1] === j;
                                const label = isSelected ? '@' : '0';

                                return (
                                    <Text3D
                                        key={j}
                                        position={[j * 0.6, 0, 0]}
                                        size={0.3}
                                        height={0.001}
                                        font={FONT}
                                        material={isSelected ? selectedMaterial : material}
                                        raycast={() => {}}
                                    >
                                        {label}
                                    </Text3D>
                                );
                            })}
                        </group>
                    );
                })}
            </Center>
        </group>
    );
}
