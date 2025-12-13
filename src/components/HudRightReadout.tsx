import { Text3D } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector2, Vector3 } from 'three';

type Viewport = {
    width: number;
    height: number;
};

function pad(n: number) {
    return n.toString().padStart(2, '0');
}

function formatDateTime(date: Date) {
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());

    return `${date.getDay()}.${dd}.${MM}.${yyyy} ${hh}.${mm}.${ss}`;
}

export function HudRightReadout() {
    const fontSize = 0.08;
    const [viewport, setViewport] = useState<Viewport>({
        width: 0,
        height: 0,
    });
    const [pointerPos, setPointerPos] = useState<Vector2>(new Vector2());
    const [date, setDate] = useState<string>(formatDateTime(new Date()));
    const [hitPos, setHitPos] = useState(new Vector3());

    const { pointer, camera, raycaster, scene } = useThree();

    useEffect(() => {
        function onResize() {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        onResize();

        window.addEventListener('resize', onResize);

        const id = setInterval(() => {
            setDate(formatDateTime(new Date()));
        }, 1000);

        return () => {
            window.removeEventListener('resize', onResize);
            clearInterval(id);
        };
    }, []);

    useEffect(() => {
        function onPointerMove() {
            setPointerPos(new Vector2(pointer.x, pointer.y));

            raycaster.setFromCamera(pointer, camera);

            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                setHitPos(intersects[0].point.clone());
                console.log(intersects);
            } else {
                setHitPos(new Vector3(0, 0, 0)); // Or null/"No hit"
            }
        }

        window.addEventListener('pointermove', onPointerMove);

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
        };
    }, [pointer]);

    return (
        <group position={[2.1, 4.475, 0]}>
            {/* Line 1 */}
            <Text3D position={[0, -0.002, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                {date}
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 2 */}
            <Text3D position={[0, -0.2, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                vw {viewport.width} vh {viewport.height}
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 3 */}
            <Text3D position={[0, -0.397, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                2D x {pointerPos.x.toFixed(3)} y {pointerPos.y.toFixed(3)}
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 4 */}
            <Text3D position={[0, -0.592, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                3D x {hitPos.x.toFixed(3)} y {hitPos.y.toFixed(3)} z {hitPos.z.toFixed(3)}
                <meshBasicMaterial color="#000000" />
            </Text3D>
        </group>
    );
}
