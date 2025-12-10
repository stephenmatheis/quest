import { type ReactNode } from 'react';
import { Center, Text3D } from '@react-three/drei';

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
    width: number;
    height: number;
};

export function Label({ children, weight, size, width, height }: LabelProps) {
    return (
        <Center position={[width / 2, height / 2, 0]}>
            <Text3D height={0.01} size={sizes[size]} font={`/fonts/Mono_${weights[weight]}.json`}>
                {children}
                <meshBasicMaterial color="#000000" />
            </Text3D>
        </Center>
    );
}
