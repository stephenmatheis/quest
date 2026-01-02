import { FONT, GRID_CELL_COLOR, GRID_SECTION_COLOR, LINE_COLOR } from '@/lib/constants';
import { Billboard, Grid, Text3D, Center } from '@react-three/drei';
import { MeshBasicMaterial } from 'three';

export function FloorGuide() {
    const material = new MeshBasicMaterial({ color: LINE_COLOR });

    return (
        <>
            <mesh material={material}>
                <sphereGeometry args={[0.125]} />
            </mesh>

            {/* <Billboard position={[0, 1, 0]} follow={true} lockX={false} lockY={false} lockZ={false}>
                <Center>
                    <Text3D font={FONT} size={0.5} height={0.01} material={material}>
                        [0,0]
                    </Text3D>
                </Center>
            </Billboard> */}

            <Grid
                position={[0, 0, 0]}
                cellSize={1}
                cellThickness={1}
                cellColor={GRID_CELL_COLOR}
                followCamera={false}
                infiniteGrid={true}
                fadeDistance={100}
                fadeStrength={0.5}
                sectionSize={4}
                sectionThickness={1}
                sectionColor={GRID_SECTION_COLOR}
                side={2}
            />
        </>
    );
}
