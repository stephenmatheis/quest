import { type ReactNode } from 'react';
import { Center, Text3D } from '@react-three/drei';

const LARGE_FONT_SIZE = 0.115;
const MEDIUM_FONT_SIZE = 0.1;
const SMALL_FONT_SIZE = 0.085;

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
    size: 'small' | 'medium' | 'large' | number;
    width: number;
    height: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
};

export function Label({
    children,
    weight,
    size,
    width,
    height,
    position = [width / 2, height / 2, 0],
    rotation = [0, 0, 0],
}: LabelProps) {
    return (
        <Center position={position} rotation={rotation}>
            {typeof children === 'string' ? (
                <Text3D
                    height={0.01}
                    size={typeof size === 'number' ? size : sizes[size]}
                    font={`/fonts/Mono_${weights[weight]}.json`}
                >
                    {children}
                    <meshBasicMaterial color="#000000" />
                </Text3D>
            ) : (
                children
            )}
        </Center>
    );
}
