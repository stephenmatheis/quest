import { useEffect, useMemo, useState } from 'react';
import { MeshBasicMaterial } from 'three';
import { Center, Text3D } from '@react-three/drei';
import { FONT, GLYPH_FONT } from '@/lib/constants';

type DisplayItem = {
    modifiers?: string[];
    key?: string;
    isGlyph?: boolean;
};

function formatKey(key: string) {
    return key.length === 1 ? key.toUpperCase() : key.toLowerCase();
}

export function EventVisualizer() {
    const textMaterial = useMemo(() => new MeshBasicMaterial({ color: 'black' }), []);
    const [heldKeys, setHeldKeys] = useState<Set<string>>(new Set());

    const MODIFIER_GLYPHS: Record<string, string> = {
        control: '⌃',
        alt: '⌥',
        shift: '⇧',
        meta: '⌘',
    };
    const SPECIAL_GLYPHS: Record<string, string> = {
        enter: '↵',
        arrowup: '▲',
        arrowdown: '▼',
        arrowleft: '◀',
        arrowright: '►',
    };
    const modifierOrder = Object.keys(MODIFIER_GLYPHS);
    const heldModifiers = modifierOrder
        .filter((modifier) => heldKeys.has(modifier))
        .map((modifier) => MODIFIER_GLYPHS[modifier] || modifier);
    const heldNonModifiers = Array.from(heldKeys).filter((key) => !modifierOrder.includes(key));

    let displayItems: DisplayItem[] = [];

    if (heldModifiers.length > 0) {
        if (heldNonModifiers.length === 0) {
            displayItems.push({
                modifiers: heldModifiers,
            });
        } else {
            heldNonModifiers.forEach((key) => {
                displayItems.push({
                    modifiers: heldModifiers,
                    key: SPECIAL_GLYPHS[key] || key,
                    isGlyph: !!SPECIAL_GLYPHS[key],
                });
            });
        }
    } else {
        displayItems = heldNonModifiers.map((key) => ({
            key: SPECIAL_GLYPHS[key] || key,
            isGlyph: !!SPECIAL_GLYPHS[key],
        }));
    }

    useEffect(() => {
        function onKeydown(event: KeyboardEvent) {
            // event.preventDefault();

            if (event.key === 'CapsLock') return;
            if (event.repeat) return;

            const key = formatKey(event.key);

            setHeldKeys((prev) => {
                const next = new Set(prev);

                next.add(key);

                return next;
            });
        }

        function onKeyup(event: KeyboardEvent) {
            // event.preventDefault();

            if (event.key === 'CapsLock') return;

            const key = formatKey(event.key);

            setHeldKeys((prev) => {
                const next = new Set(prev);

                next.delete(key);

                return next;
            });
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
            {displayItems.map(({ modifiers, key, isGlyph }, index) => {
                const parts: { text: string; font: any }[] = [];

                if (modifiers) {
                    modifiers.forEach((glyph) => {
                        parts.push({ text: glyph, font: GLYPH_FONT });
                    });
                }

                if (key) {
                    parts.push({
                        text: key,
                        font: isGlyph ? GLYPH_FONT : FONT,
                    });
                }

                if (parts.length === 0) return null;

                const gap = 0.175;
                const totalWidth = (parts.length - 1) * gap;
                const xOffset = -totalWidth / 2;

                return (
                    <group key={index} position={[0, -index * 0.22, 0]}>
                        {parts.map((part, i) => (
                            <group key={part.text + i} position={[xOffset + i * gap, 0, 0]}>
                                <Center>
                                    <Text3D font={part.font} height={0.01} size={0.1} material={textMaterial}>
                                        {part.text}
                                    </Text3D>
                                </Center>
                            </group>
                        ))}
                    </group>
                );
            })}
        </group>
    );
}
