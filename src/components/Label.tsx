import { type ReactNode } from 'react';
import { Text3D } from '@react-three/drei';
import { Vector3 } from 'three';

const ASPECT_RATIO = 6 / 9;
const WIDTH = 0.75;
const HEIGHT = ASPECT_RATIO * WIDTH;
const LARGE_FONT_SIZE = 0.1;
const MEDIUM_FONT_SIZE = 0.09;
const SMALL_FONT_SIZE = 0.08;
const TOP_LEFT = new Vector3(LARGE_FONT_SIZE, HEIGHT - LARGE_FONT_SIZE - LARGE_FONT_SIZE / 2, 0);
const TOP_RIGHT = new Vector3(WIDTH - LARGE_FONT_SIZE * 2.5, HEIGHT - LARGE_FONT_SIZE - LARGE_FONT_SIZE / 2, 0);
const BOTTOM_LEFT = new Vector3(LARGE_FONT_SIZE, LARGE_FONT_SIZE / 2, 0);
const BOTTOM_RIGHT = new Vector3(WIDTH - LARGE_FONT_SIZE * 2.5, LARGE_FONT_SIZE / 2, 0);
const CENTER = new Vector3(WIDTH / 2 - LARGE_FONT_SIZE / 2, HEIGHT / 2 - LARGE_FONT_SIZE / 2, 0);

const positions = {
    'top-left': TOP_LEFT,
    'top-right': TOP_RIGHT,
    'bottom-left': BOTTOM_LEFT,
    'bottom-right': BOTTOM_RIGHT,
    center: CENTER,
};

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
};

export function Label({ children, weight, size, position }: LabelProps) {
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
