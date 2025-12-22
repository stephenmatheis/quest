import { SVGLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';
import { LINE_COLOR } from '@/lib/constants';

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
    color = LINE_COLOR,
}: ExtrudeSvgProps) {
    const svgResult = useLoader(SVGLoader, src);
    const paths = Array.isArray(svgResult) ? svgResult[0].paths : svgResult.paths;
    const shapes = paths.flatMap((p: any) => SVGLoader.createShapes(p));

    return (
        <group scale={[scale, -scale, scale]} rotation={rotation}>
            {shapes.map((shape: any, i: number) => (
                <mesh key={i}>
                    <extrudeGeometry args={[shape, { depth, bevelEnabled: false }]} />
                    <meshBasicMaterial color={color} />
                </mesh>
            ))}
        </group>
    );
}
