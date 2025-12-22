import { RED } from '@/lib/constants';
import { Grid } from '@react-three/drei';

export function FloorGuide() {
    return (
        <>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.125]} />
                <meshBasicMaterial color={RED} />
            </mesh>
            <Grid
                position={[0, 0, 0]}
                cellSize={1}
                cellThickness={1}
                cellColor="#eeeeee"
                followCamera={false}
                infiniteGrid={true}
                sectionSize={4}
                sectionThickness={1}
                sectionColor="#cccccc"
                side={2}
            />
        </>
    );
}
