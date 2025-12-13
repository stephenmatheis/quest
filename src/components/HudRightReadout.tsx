import { Text3D } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector2 } from 'three';

type Viewport = {
    width: number;
    height: number;
};

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function formatDateTime(date: Date) {
    const yyyy = date.getFullYear();
    const M = date.getMonth() + 1;
    const MM = M < 10 ? `0${M}` : M;
    const d = date.getDate();
    const dd = d < 10 ? `0${d}` : d;
    const day = days[date.getDay()];
    const h = date.getHours();
    const hh = h < 10 ? `0${h}` : h;
    const m = date.getMinutes();
    const mm = m < 10 ? `0${m}` : h;
    const s = date.getSeconds();
    const ss = s < 10 ? `0${s}` : s;

    return `d ${yyyy}.${MM}.${dd} t ${hh}.${mm}.${ss}`;
}

export function HudRightReadout() {
    const fontSize = 0.08;
    const [viewport, setViewport] = useState<Viewport>({
        width: 0,
        height: 0,
    });
    const [pointerPos, setPointerPos] = useState<Vector2>(new Vector2());
    const [date, setDate] = useState<string>(formatDateTime(new Date()));

    const { pointer, camera, raycaster } = useThree();

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
        }

        window.addEventListener('pointermove', onPointerMove);

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
        };
    }, [pointer]);

    return (
        <group position={[2.3, 4.475, 0]}>
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
                x {pointerPos.x.toFixed(3)} y {pointerPos.y.toFixed(3)}
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 4 */}
            {/* <Text3D position={[0, -0.592, 0]} height={0.001} size={fontSize} font={`/fonts/Mono_Regular.json`}>
                sgnl 2035 ///
                <meshBasicMaterial color="#000000" />
            </Text3D> */}
        </group>
    );
}
