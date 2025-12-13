import { useWorld } from '@/providers/WorldProvider';
import { Text3D } from '@react-three/drei';
import { useEffect, useState } from 'react';

const FONT_SIZE = 0.08;

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
    const { pointerPos, hitPos } = useWorld();
    const [viewport, setViewport] = useState<Viewport>({
        width: 0,
        height: 0,
    });
    const [date, setDate] = useState<string>(formatDateTime(new Date()));

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

    return (
        <group position={[2.1, 4.475, 0]}>
            {/* Line 1 */}
            <Text3D position={[0, -0.002, 0]} height={0.001} size={FONT_SIZE} font={`/fonts/Mono_Regular.json`}>
                {date}
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 2 */}
            <Text3D position={[0, -0.2, 0]} height={0.001} size={FONT_SIZE} font={`/fonts/Mono_Regular.json`}>
                vw {viewport.width} vh {viewport.height}
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 3 */}
            <Text3D position={[0, -0.397, 0]} height={0.001} size={FONT_SIZE} font={`/fonts/Mono_Regular.json`}>
                x {pointerPos.x.toFixed(3)} y {pointerPos.y.toFixed(3)}
                <meshBasicMaterial color="#000000" />
            </Text3D>

            {/* Line 4 */}
            <Text3D position={[0, -0.592, 0]} height={0.001} size={FONT_SIZE} font={`/fonts/Mono_Regular.json`}>
                hit x {hitPos.x.toFixed(3)} y {hitPos.y.toFixed(3)} z {hitPos.z.toFixed(3)}
                <meshBasicMaterial color="#000000" />
            </Text3D>
        </group>
    );
}
