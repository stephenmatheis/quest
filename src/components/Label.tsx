import { type ReactNode } from 'react';
import { Center, Text3D } from '@react-three/drei';
import { FONT } from '@/lib/constants';

const LARGE_FONT_SIZE = 0.115;
const MEDIUM_FONT_SIZE = 0.1;
const SMALL_FONT_SIZE = 0.085;

const sizes = {
    small: SMALL_FONT_SIZE,
    medium: MEDIUM_FONT_SIZE,
    large: LARGE_FONT_SIZE,
};

const weights = {
    light: 'Regular',
    regular: 'Regular',
    bold: 'Regular',
};

type LabelProps = {
    children: ReactNode;
    size?: 'small' | 'medium' | 'large' | number;
    weight?: 'light' | 'regular' | 'bold';
    color?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
};

export function Label({
    children,
    size = 'medium',
    weight = 'regular',
    color = '#000000',
    position = [0, 0, 0],
    rotation = [0, 0, 0],
}: LabelProps) {
    return (
        <>
            {typeof children === 'string' ? (
                <Text3D
                    position={position}
                    rotation={rotation}
                    height={0.01}
                    size={typeof size === 'number' ? size : sizes[size]}
                    font={weights[weight] && FONT}
                >
                    {children}
                    <meshBasicMaterial color={color} />
                </Text3D>
            ) : (
                <Center top right>
                    {children}
                </Center>
            )}
        </>
    );
}
