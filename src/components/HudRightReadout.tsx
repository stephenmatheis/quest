import { Vector2, Vector3 } from 'three';
import { Text3D } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { FONT, LINE_COLOR } from '@/lib/constants';

type HudRightReadoutProps = {
    pointerPos: Vector2;
    hitPos: Vector3;
    fontSize?: number;
};

type Viewport = {
    width: number;
    height: number;
};

function pad(n: number) {
    return n.toString().padStart(2, '0');
}

function formatAbs(number: number) {
    return number < 0 ? number.toFixed(3) : ` ${number.toFixed(3)}`;
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

    return `${hh}:${mm}:${ss}`;
}

export function HudRightReadout({ pointerPos, hitPos, fontSize = 0.08 }: HudRightReadoutProps) {
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

    const lines = [`date     ${date}`, `time     ${time}`, `view     ${viewport.width} x ${viewport.height}`];
    const pointerLabel = 'pointer';
    const pointerPosLines = [`${formatAbs(pointerPos.x)} x`, `${formatAbs(pointerPos.y)} y`];
    const objectLabel = 'object';
    const hitPosLines = [`${formatAbs(hitPos.x)} x`, `${formatAbs(hitPos.y)} y`, `${formatAbs(hitPos.z)} z`];

    return (
        <group position={[2.175, 4.45, 0]}>
            {/* date, time, and viewport */}
            <group>
                {lines.map((line, index) => {
                    return (
                        <Text3D key={index} position={[0, index * -0.2, 0]} height={0.001} size={fontSize} font={FONT}>
                            {line}
                            <meshBasicMaterial color={LINE_COLOR} />
                        </Text3D>
                    );
                })}
            </group>

            {/* pointer pos */}
            <group position={[0, lines.length * -0.2, 0]}>
                <Text3D height={0.001} size={fontSize} font={FONT}>
                    {pointerLabel}
                    <meshBasicMaterial color={LINE_COLOR} />
                </Text3D>
                <group position={[0, 0, 0]}>
                    {pointerPosLines.map((line, index) => {
                        return (
                            <Text3D
                                key={index}
                                position={[0, index * -0.2, 0]}
                                height={0.001}
                                size={fontSize}
                                font={FONT}
                            >
                                {Array.from({ length: pointerLabel.length }).map((_) => ' ')} {line}
                                <meshBasicMaterial color={LINE_COLOR} />
                            </Text3D>
                        );
                    })}
                </group>
            </group>

            {/* hit pos */}
            <group position={[0, (lines.length + pointerPosLines.length) * -0.2, 0]}>
                <Text3D height={0.001} size={fontSize} font={FONT}>
                    {objectLabel}
                    <meshBasicMaterial color={LINE_COLOR} />
                </Text3D>
                <group position={[0, 0, 0]}>
                    {hitPosLines.map((line, index) => {
                        return (
                            <Text3D
                                key={index}
                                position={[0, index * -0.2, 0]}
                                height={0.001}
                                size={fontSize}
                                font={FONT}
                            >
                                {Array.from({ length: pointerLabel.length }).map((_) => ' ')} {line}
                                <meshBasicMaterial color={LINE_COLOR} />
                            </Text3D>
                        );
                    })}
                </group>
            </group>
        </group>
    );
}
