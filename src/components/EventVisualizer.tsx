import { useEffect, useMemo, useState } from 'react';
import { ShapeGeometry, MeshBasicMaterial } from 'three';
import { Center, Edges, Text3D } from '@react-three/drei';
import { createRect } from '@/utils/shapes';
import { FONT } from '@/lib/constants';

export type ControlEvent = {
    text: string;
};

const width = 1;
const height = 0.25;
const modKeys = ['Meta', 'Shift', 'Alt', 'Control'];

function getTextFromKeyCode(code: string, key: string) {
    switch (code) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            return code.replace('Arrow', '').toLocaleLowerCase();
        case 'MetaLeft':
        case 'MetaRight':
            return 'cmd';
        case 'ShiftLeft':
        case 'ShiftRight':
            return 'shift';
        case 'ControlLeft':
        case 'ControlRight':
            return 'ctl';
        case 'AltLeft':
        case 'ALtRight':
            return 'opt';
        default:
            return key.toUpperCase();
    }
}

export function EventVisualizer() {
    const rect = useMemo(() => createRect(width, height), []);
    const geometry = useMemo(() => new ShapeGeometry([rect]), []);
    const material = useMemo(() => new MeshBasicMaterial({ color: 'white' }), []);
    const textMaterial = useMemo(() => new MeshBasicMaterial({ color: 'black' }), []);
    const [events, setEvents] = useState<ControlEvent[]>([]);

    useEffect(() => {
        function onKeydown(event: KeyboardEvent) {
            if (event.repeat) return;

            if (modKeys.includes(event.key)) return;

            let mods = '';

            if (event.ctrlKey) mods += 'ctrl + ';
            if (event.shiftKey) mods += ' shift + ';
            if (event.altKey) mods += ' opt + ';
            if (event.metaKey) mods += ' cmd + ';

            const text = `${mods}${getTextFromKeyCode(event.code, event.key)}`.trim();

            setEvents((prev) => [...prev, { text }]);
        }

        function onKeyup() {
            setTimeout(() => {
                setEvents((prev) => prev.slice(0, -1));
            }, 100);
        }

        window.addEventListener('keydown', onKeydown);
        window.addEventListener('keyup', onKeyup);

        return () => {
            window.removeEventListener('keydown', onKeydown);
            window.removeEventListener('keyup', onKeyup);
        };
    }, []);

    return (
        <group position={[0, 4, 0]}>
            {events.map(({ text }, index) => {
                const y = index === 0 ? 0 : index * -height - 0.1 * index;

                return (
                    <group key={index} position={[0, y, 0]}>
                        <mesh position={[-width / 2, -height / 2, 0]} geometry={geometry} material={material}>
                            <Edges linewidth={2} threshold={15} color="#000000" />
                        </mesh>
                        <Center>
                            <Text3D
                                position={[0, 0, 0]}
                                key={index}
                                height={0.01}
                                size={0.1}
                                font={FONT}
                                material={textMaterial}
                            >
                                {text}
                            </Text3D>
                        </Center>
                    </group>
                );
            })}
        </group>
    );
}
