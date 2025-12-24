import { type ReactNode } from 'react';
import { Center, Text3D } from '@react-three/drei';
import { FONT, LINE_COLOR } from '@/lib/constants';
import { animated, type SpringValue } from '@react-spring/three';
import type { Euler, Vector3 } from 'three';

export type LabelSize = 'small' | 'medium' | 'large' | number | undefined;

const LARGE_FONT_SIZE = 0.115;
const MEDIUM_FONT_SIZE = 0.1;
const SMALL_FONT_SIZE = 0.085;

const sizes = {
    small: SMALL_FONT_SIZE,
    medium: MEDIUM_FONT_SIZE,
    large: LARGE_FONT_SIZE,
};

type LabelProps = {
    children: ReactNode;
    font?: string;
    size?: LabelSize;
    color?: string;
    position?: [number, number, number] | SpringValue<number[]> | Vector3;
    rotation?: [number, number, number] | SpringValue<number[]> | Euler;
};

export function Label({
    children,
    size = 'small',
    font,
    color = LINE_COLOR,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
}: LabelProps) {
    return (
        <>
            {typeof children === 'string' ? (
                <animated.group position={position as Vector3} rotation={rotation as Euler}>
                    <Text3D
                        height={0.01}
                        size={typeof size === 'number' ? size : sizes[size]}
                        font={font || FONT}
                        raycast={() => {}}
                    >
                        {children}
                        <meshBasicMaterial color={color} />
                    </Text3D>
                </animated.group>
            ) : (
                <Center top right>
                    {children}
                </Center>
            )}
        </>
    );
}
