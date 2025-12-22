import { useEffect, useMemo, useRef, useState } from 'react';
import { MeshBasicMaterial } from 'three';
import { Center, Text3D } from '@react-three/drei';
import { FONT } from '@/lib/constants';

// TODO: Differentiate when a key is held down BEFORE or AFTER a mod key. For example, cmd + f is not the same as f + cmd.
// TODO: Also, keep track of chorded combos. For example, cmd + k PAUSE cmd + j

export type ControlEvent = {
    text: string;
};

export function EventVisualizer() {
    const textMaterial = useMemo(() => new MeshBasicMaterial({ color: 'black' }), []);
    const [events, setEvents] = useState<string[]>([]);
    const isShiftDown = useRef<boolean>(false);
    const isControlDown = useRef<boolean>(false);
    const isOptionDown = useRef<boolean>(false);
    const isCommandDown = useRef<boolean>(false);

    useEffect(() => {
        const activeKeys: Set<string> = new Set();

        function onKeydown(event: KeyboardEvent) {
            event.preventDefault();

            if (event.repeat) return;

            if (event.key === 'Control') {
                isControlDown.current = true;

                return;
            }

            if (event.key === 'Alt') {
                isOptionDown.current = true;

                return;
            }

            if (event.key === 'Shift') {
                isShiftDown.current = true;

                return;
            }

            if (event.key === 'Meta') {
                isCommandDown.current = true;

                return;
            }

            let mods: string[] = [];

            if (isControlDown.current) mods.push('ctl');
            if (isOptionDown.current) mods.push('opt');
            if (isShiftDown.current) mods.push('shift');
            if (isCommandDown.current) mods.push('cmd');

            const text = `${mods.join('+')}+${event.key}`;

            console.log('down:', text);

            activeKeys.add(text);

            console.log(activeKeys);

            setEvents([...activeKeys]);
        }

        // TODO: Figure out how to tell when a mod key is held on keyup
        function onKeyup(event: KeyboardEvent) {
            // event.preventDefault();

            if (event.key === 'Control') {
                isControlDown.current = false;
            }

            if (event.key === 'Alt') {
                isOptionDown.current = false;
            }

            if (event.key === 'Shift') {
                isShiftDown.current = false;
            }

            if (event.key === 'Meta') {
                isCommandDown.current = false;
            }

            let mods: string[] = [];

            if (isControlDown.current) mods.push('ctl');
            if (isOptionDown.current) mods.push('opt');
            if (isShiftDown.current) mods.push('shift');
            if (isCommandDown.current) mods.push('cmd');

            const text = `${mods.join('+')}+${event.key}`;

            console.log('down:', text);

            activeKeys.delete(text);

            console.log(activeKeys);

            setTimeout(() => {
                setEvents([...activeKeys]);
            }, 150);
        }

        window.addEventListener('keydown', onKeydown);
        window.addEventListener('keyup', onKeyup);

        return () => {
            window.removeEventListener('keydown', onKeydown);
            window.removeEventListener('keyup', onKeyup);
        };
    }, []);

    return (
        <group position={[2.5, 2.5, 0]}>
            {/* <group position={[2.95, 2.5, 0]}> */}
            {events.map((text, index) => {
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

// import { useEffect, useMemo, useState } from 'react';
// import { MeshBasicMaterial } from 'three';
// import { Text3D } from '@react-three/drei';
// import { FONT } from '@/lib/constants';

// export type ControlEvent = {
//     keyPressed: string;
// };

// export function EventVisualizer() {
//     const textMaterial = useMemo(() => new MeshBasicMaterial({ color: 'black' }), []);
//     const [keys, setKeys] = useState<ControlEvent[]>([]);

//     useEffect(() => {
//         function onKeydown(event: KeyboardEvent) {
//             event.preventDefault();

//             if (event.repeat) return;

//             const CIKey = event.key.toUpperCase();

//             console.log('down:', event);

//             setKeys((prev) => [...prev, { keyPressed: CIKey }]);
//         }

//         function onKeyup(event: KeyboardEvent) {
//             event.preventDefault();

//             const CIKey = event.key.toUpperCase();

//             console.log('up:', event);

//             setKeys((prev) => prev.filter(({ keyPressed }) => keyPressed !== CIKey));
//         }

//         window.addEventListener('keydown', onKeydown);
//         window.addEventListener('keyup', onKeyup);

//         return () => {
//             window.removeEventListener('keydown', onKeydown);
//             window.removeEventListener('keyup', onKeyup);
//         };
//     }, []);

//     return (
//         <group position={[2.5, 2.5, 0]}>
//             {keys.map(({ keyPressed }, index) => {
//                 const y = index === 0 ? 0 : index * -0.2;

//                 return (
//                     <Text3D
//                         key={index}
//                         position={[0, y, 0]}
//                         height={0.01}
//                         size={0.1}
//                         font={FONT}
//                         material={textMaterial}
//                     >
//                         {keyPressed}
//                     </Text3D>
//                 );
//             })}
//         </group>
//     );
// }
