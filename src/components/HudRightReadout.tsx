import { useWorld } from '@/providers/WorldProvider';
import { Text3D } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { FONT } from '@/lib/constants';

const FONT_SIZE = 0.08;

type Viewport = {
    width: number;
    height: number;
};

function pad(n: number) {
    return n.toString().padStart(2, '0');
}

function formatDate(date: Date) {
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const d = date.getDay();

    return `${d}.${dd}.${MM}.${yyyy}`;
}

function formatTime(date: Date) {
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());

    return `${hh}.${mm}.${ss}`;
}

export function HudRightReadout() {
    const { pointerPos, hitPos } = useWorld();
    const [viewport, setViewport] = useState<Viewport>({
        width: 0,
        height: 0,
    });
    const [date, setDate] = useState<string>(formatDate(new Date()));
    const [time, setTime] = useState<string>(formatTime(new Date()));

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
            const now = new Date();

            setDate(formatDate(now));
            setTime(formatTime(now));
        }, 1000);

        return () => {
            window.removeEventListener('resize', onResize);
            clearInterval(id);
        };
    }, []);

    return (
        <group position={[2.45, 4.45, 0]}>
            {[
                `date ${date}`,
                `time ${time}`,
                `view ${viewport.width} x ${viewport.height}`,
                `point ${pointerPos.x.toFixed(3)} y ${pointerPos.y.toFixed(3)}`,
                ``,
                `object`,
                `x ${hitPos.x.toFixed(3)} `,
                `y ${hitPos.y.toFixed(3)}`,
                `z ${hitPos.z.toFixed(3)}`,
            ].map((line, index) => {
                return (
                    <Text3D
                        key={index}
                        position={[0, index * -0.2, 0]}
                        height={0.001}
                        size={FONT_SIZE}
                        font={FONT}
                    >
                        {line}
                        <meshBasicMaterial color="#000000" />
                    </Text3D>
                );
            })}
        </group>
    );
}
