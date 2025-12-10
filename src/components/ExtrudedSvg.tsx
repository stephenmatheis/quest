// ExtrudedSvg.tsx  ← temporary test version
import { SVGLoader } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

type ExtrudeSvgProps = {
    src: string;
    scale?: number;
    depth?: number;
    rotation?: [number, number, number];
};

export function ExtrudedSvg({ src, scale = 0.0125, depth = 0.04, rotation = [0, 0, 0] }: ExtrudeSvgProps) {
    const svgResult = useLoader(SVGLoader, src);
    const paths = Array.isArray(svgResult) ? svgResult[0].paths : svgResult.paths;
    const shapes = paths.flatMap((p: any) => SVGLoader.createShapes(p));

    return (
        <group scale={[scale, -scale, scale]} rotation={rotation}>
            {/* Y flip + scale down */}
            {shapes.map((shape: any, i: number) => (
                <mesh key={i}>
                    <extrudeGeometry args={[shape, { depth, bevelEnabled: false }]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
            ))}
        </group>
    );
}

// import { useLoader } from '@react-three/fiber';
// import { useLayoutEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { SVGLoader } from 'three-stdlib';
// import { extend } from '@react-three/fiber';

// extend({ Group: THREE.Group });

// type ExtrudedSvgProps = React.ComponentProps<'group'> & {
//     src: string;
//     depth?: number;
//     bevelEnabled?: boolean;
//     bevelThickness?: number;
//     bevelSize?: number;
//     bevelSegments?: number;
//     scale?: number;
//     materialProps?: THREE.MeshStandardMaterialParameters;
// };

// export function ExtrudedSvg({
//     src,
//     depth = 0.875,
//     bevelEnabled = false,
//     bevelThickness = 0.1,
//     bevelSize = 0.05,
//     bevelSegments = 3,
//     scale = 0.0125,
//     materialProps = { color: '#000000', side: THREE.DoubleSide },
//     ...props
// }: ExtrudedSvgProps) {
//     const svg = useLoader(SVGLoader, src);
//     const ref = useRef<THREE.Group>(null!);

//     useLayoutEffect(() => {
//         const shapes: THREE.Shape[] = [];
//         const colors: THREE.Color[] = [];

//         svg.paths.forEach((path) => {
//             const pathShapes = path.toShapes(true);
//             const fillColor =
//                 path.userData?.style.fill !== undefined && path.userData?.style.fill !== 'none' && path.color
//                     ? path.color
//                     : new THREE.Color(materialProps.color ?? '#000000');

//             pathShapes.forEach(() => colors.push(fillColor));
//             shapes.push(...pathShapes);
//         });

//         const tempGroup = new THREE.Group();

//         shapes.forEach((shape, i) => {
//             const geometry = new THREE.ExtrudeGeometry(shape, {
//                 depth,
//                 bevelEnabled,
//                 bevelThickness,
//                 bevelSize,
//                 bevelSegments,
//                 steps: 1,
//             });

//             geometry.computeVertexNormals();

//             const material = new THREE.MeshStandardMaterial({
//                 ...materialProps,
//                 color: colors[i],
//             });

//             const mesh = new THREE.Mesh(geometry, material);
//             tempGroup.add(mesh);
//         });

//         // flip svg Y (is inverted)
//         tempGroup.scale.set(scale, -scale, scale);

//         // center
//         const box = new THREE.Box3().setFromObject(tempGroup);
//         const center = box.getCenter(new THREE.Vector3());
//         tempGroup.position.sub(center.multiplyScalar(scale));

//         ref.current.add(tempGroup);

//         return () => {
//             tempGroup.traverse((child) => {
//                 if (child instanceof THREE.Mesh) {
//                     child.geometry.dispose();

//                     if (Array.isArray(child.material)) {
//                         child.material.forEach((m) => m.dispose());
//                     } else {
//                         (child.material as THREE.Material).dispose();
//                     }
//                 }
//             });

//             ref.current.remove(tempGroup);
//         };
//     }, [svg, depth, bevelEnabled, bevelThickness, bevelSize, bevelSegments, scale, materialProps]);

//     return <group ref={ref} {...props} />;
// }
