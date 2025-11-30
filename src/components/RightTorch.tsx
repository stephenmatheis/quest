import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { PointLight, PointLightHelper } from 'three';
import { Torch } from '@/components/Models/Torch';
import { useCameraControls } from '@/providers/CameraProvider';

export function RightTorch() {
    const { showHelpers } = useCameraControls();
    const rightTorchLight = useRef<PointLight>(null);

    useHelper(showHelpers ? (rightTorchLight as React.RefObject<PointLight>) : false, PointLightHelper, 0.25, 'red');

    return (
        <>
            <pointLight ref={rightTorchLight} position={[3, 2.5, 0.25]} intensity={1} color="#ffb84d" />
            <Torch position={[3, 2, 0.25]} scale={1} />
        </>
    );
}
