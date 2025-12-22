import { GRID_CELL_COLOR, GRID_SECTION_COLOR, LINE_COLOR } from '@/lib/constants';
import { Grid } from '@react-three/drei';

export function FloorGuide() {
    return (
        <>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.125]} />
                <meshBasicMaterial color={LINE_COLOR} />
            </mesh>
            <Grid
                position={[0, 0, 0]}
                cellSize={1}
                cellThickness={1}
                cellColor={GRID_CELL_COLOR}
                followCamera={false}
                infiniteGrid={true}
                sectionSize={4}
                sectionThickness={1}
                sectionColor={GRID_SECTION_COLOR}
                side={2}
            />
        </>
    );
}
