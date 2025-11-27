import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { PointLight, PointLightHelper } from 'three';
import { Torch } from '@/components/Models/Torch';

export function RightTorch() {
    const rightTorchLight = useRef<PointLight>(null);

    useHelper(rightTorchLight as React.RefObject<PointLight>, PointLightHelper, 0.25, 'red');

    return (
        <>
            <pointLight ref={rightTorchLight} position={[3, 2.5, 0.25]} intensity={1} color="#ffb84d" />
            <Torch position={[3, 2, 0.25]} scale={1} />
        </>
    );
}
