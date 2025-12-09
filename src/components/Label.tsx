import { type ReactNode } from 'react';
import { Text3D } from '@react-three/drei';
import { Vector3 } from 'three';

const LARGE_FONT_SIZE = 0.1;
const MEDIUM_FONT_SIZE = 0.09;
const SMALL_FONT_SIZE = 0.08;

const sizes = {
    small: SMALL_FONT_SIZE,
    medium: MEDIUM_FONT_SIZE,
    large: LARGE_FONT_SIZE,
};

const weights = {
    light: 'Light',
    regular: 'Regular',
    bold: 'Bold',
};

type LabelProps = {
    children: ReactNode;
    weight: 'light' | 'regular' | 'bold';
    size: 'small' | 'medium' | 'large';
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    letterCount?: number;
    width: number;
    height: number;
};

export function Label({ children, weight, size, position, letterCount = 1, width, height }: LabelProps) {
    const TOP_LEFT = new Vector3(LARGE_FONT_SIZE, height - LARGE_FONT_SIZE - LARGE_FONT_SIZE / 2, 0);
    const TOP_RIGHT = new Vector3(width - LARGE_FONT_SIZE * 2.5, height - LARGE_FONT_SIZE - LARGE_FONT_SIZE / 2, 0);
    const BOTTOM_LEFT = new Vector3(0.03 * (letterCount / 2), LARGE_FONT_SIZE / 2, 0);
    const BOTTOM_RIGHT = new Vector3(0.03 * (letterCount / 2), LARGE_FONT_SIZE / 2, 0);
    const CENTER = new Vector3(width / 2 - LARGE_FONT_SIZE / 2, height / 2 - LARGE_FONT_SIZE / 2, 0);
    const CENTER_LEFT = new Vector3(0.02 * (letterCount / 2), height / 2 - LARGE_FONT_SIZE / 2, 0);
    const CENTER_RIGHT = new Vector3(0.035 * (letterCount / 2), height / 2 - LARGE_FONT_SIZE / 2, 0);

    const positions = {
        'top-left': TOP_LEFT,
        'top-right': TOP_RIGHT,
        'bottom-left': BOTTOM_LEFT,
        'bottom-right': BOTTOM_RIGHT,
        'center-left': CENTER_LEFT,
        'center-right': CENTER_RIGHT,
        center: CENTER,
    };

    return (
        <Text3D
            position={positions[position]}
            height={0.01}
            size={sizes[size]}
            font={`/fonts/Mono_${weights[weight]}.json`}
        >
            {children}
            <meshBasicMaterial color="#000000" />
        </Text3D>
    );
}
