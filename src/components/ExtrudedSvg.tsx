// ExtrudedSvg.tsx  ← temporary test version
import { SVGLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

type ExtrudeSvgProps = {
    src: string;
    scale?: number;
    depth?: number;
    rotation?: [number, number, number];
    color?: string;
};

export function ExtrudedSvg({
    src,
    scale = 0.0125,
    depth = 0.04,
    rotation = [0, 0, 0],
    color = '#000000',
}: ExtrudeSvgProps) {
    const svgResult = useLoader(SVGLoader, src);
    const paths = Array.isArray(svgResult) ? svgResult[0].paths : svgResult.paths;
    const shapes = paths.flatMap((p: any) => SVGLoader.createShapes(p));

    return (
        <group scale={[scale, -scale, scale]} rotation={rotation}>
            {/* Y flip + scale down */}
            {shapes.map((shape: any, i: number) => (
                <mesh key={i}>
                    <extrudeGeometry args={[shape, { depth, bevelEnabled: false }]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            ))}
        </group>
    );
}
