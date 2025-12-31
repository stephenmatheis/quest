import { FONT, LINE_COLOR } from '@/lib/constants';
import { Center, Text3D } from '@react-three/drei';
import { Dock } from '@/components/Dock';

export function Port() {
    return (
        <>
            {/* Level 2 */}
            <group position={[0, 24, 0]}>
                <Center position={[0, 12, 0]}>
                    <Text3D height={0.01} size={1} font={FONT} raycast={() => {}}>
                        Level 2
                        <meshBasicMaterial color={LINE_COLOR} />
                    </Text3D>
                </Center>
                <Dock position={[0, 1.5, -12]} rotation={[0, 0, 0]} name={'Dock 1'} />
                <Dock position={[12, 1.5, 0]} rotation={[0, Math.PI / -2, 0]} name={'Dock 2'} />
                <Dock position={[0, 1.5, 12]} rotation={[0, Math.PI, 0]} name={'Dock 3'} />
                <Dock position={[-12, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} name={'Dock 4'} />
            </group>
            ;{/* Level 1 */}
            <group>
                <Center position={[0, 12, 0]}>
                    <Text3D height={0.01} size={1} font={FONT} raycast={() => {}}>
                        Level 1
                        <meshBasicMaterial color={LINE_COLOR} />
                    </Text3D>
                </Center>
                <Dock position={[0, 1.5, -12]} rotation={[0, 0, 0]} name={'Dock 1'} />
                <Dock position={[12, 1.5, 0]} rotation={[0, Math.PI / -2, 0]} name={'Dock 2'} />
                <Dock position={[0, 1.5, 12]} rotation={[0, Math.PI, 0]} name={'Dock 3'} />
                <Dock position={[-12, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} name={'Dock 4'} />
            </group>
            ;
        </>
    );
}
