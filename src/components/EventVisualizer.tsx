import { useEffect, useMemo, useState } from 'react';
import { MeshBasicMaterial } from 'three';
import { Center, Text3D } from '@react-three/drei';
import { FONT } from '@/lib/constants';

export type ControlEvent = {
    id: string;
    text: string;
};

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
        case 'AltRight':
            return 'opt';
        default:
            return key.toUpperCase();
    }
}

export function EventVisualizer() {
    const textMaterial = useMemo(() => new MeshBasicMaterial({ color: 'black' }), []);
    const [events, setEvents] = useState<ControlEvent[]>([]);

    useEffect(() => {
        let id = '';

        function onKeydown(event: KeyboardEvent) {
            event.preventDefault();

            if (event.repeat) return;

            if (modKeys.includes(event.key)) return;

            let mods = '';

            if (event.ctrlKey) mods += 'ctrl + ';
            if (event.shiftKey) mods += ' shift + ';
            if (event.altKey) mods += ' opt + ';
            if (event.metaKey) mods += ' cmd + ';

            const text = `${mods}${getTextFromKeyCode(event.code, event.key)}`.trim();

            id = text + new Date().getTime();

            setEvents((prev) => [...prev, { id, text }]);
        }

        function onKeyup(event: KeyboardEvent) {
            event.preventDefault();

            setTimeout(() => {
                setEvents((prev) => prev.filter((e) => e.id !== id));
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
        <group position={[2.95, 2.5, 0]}>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 0.001]} />
                <meshBasicMaterial color="#ff0000" />
            </mesh>

            {events.map(({ text }, index) => {
                const y = index === 0 ? 0 : index * -0.2;

                return (
                    <group key={index} position={[0, y + 0.25, 0]}>
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
