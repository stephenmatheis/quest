import { Grid } from '@react-three/drei';

export function FloorGuide() {
    return (
        <>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.125]} />
                <meshBasicMaterial color="#ff0000" />
            </mesh>
            <Grid
                position={[0, 0, 0]}
                cellSize={1}
                cellThickness={1}
                cellColor="#cccccc"
                followCamera={false}
                infiniteGrid={true}
                sectionSize={4}
                sectionThickness={1}
                sectionColor="#909090"
                side={2}
            />
        </>
    );
}
