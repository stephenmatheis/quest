import { MeshBasicMaterial, Vector2, Vector3, Group, Box3 } from 'three';
import { Text3D } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { ASPECT_RATIO, FONT, LINE_COLOR } from '@/lib/constants';

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
    const ref = useRef<Group>(null);

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

        if (ref.current) {
            const boundingBox = new Box3();
            const size = new Vector3();

            boundingBox.setFromObject(ref.current);
            boundingBox.getSize(size);
        }

        return () => {
            window.removeEventListener('resize', onResize);
            clearInterval(id);
        };
    }, []);

    const lines = [
        `date     ${date}`,
        `time     ${time}`,
        `view     ${viewport.width} x ${viewport.height}`,
        `aspect   4 / 3`,
        `max vh   ${viewport.width * ASPECT_RATIO}`,
    ];
    const pointerLabel = 'pointer';
    const pointerPosLines = [`${formatAbs(pointerPos.x)} x`, `${formatAbs(pointerPos.y)} y`];
    const objectLabel = 'object';
    const hitPosLines = [`${formatAbs(hitPos.x)} x`, `${formatAbs(hitPos.y)} y`, `${formatAbs(hitPos.z)} z`];
    const material = new MeshBasicMaterial({
        color: LINE_COLOR,
        userData: { ignore: true },
    });

    return (
        <group ref={ref} position={[2.29, 2.55, 0]}>
            {/* date, time, and viewport */}
            <group>
                {lines.map((line, index) => {
                    return (
                        <Text3D
                            key={index}
                            position={[0, index * -0.2, 0]}
                            height={0.001}
                            size={fontSize}
                            font={FONT}
                            material={material}
                        >
                            {line}
                        </Text3D>
                    );
                })}
            </group>

            {/* pointer pos */}
            <group position={[0, lines.length * -0.2, 0]}>
                <Text3D height={0.001} size={fontSize} font={FONT} material={material}>
                    {pointerLabel}
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
                                material={material}
                            >
                                {Array.from({ length: pointerLabel.length }).map((_) => ' ')} {line}
                            </Text3D>
                        );
                    })}
                </group>
            </group>

            {/* hit pos */}
            <group position={[0, (lines.length + pointerPosLines.length) * -0.2, 0]}>
                <Text3D height={0.001} size={fontSize} font={FONT} material={material}>
                    {objectLabel}
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
                                material={material}
                            >
                                {Array.from({ length: pointerLabel.length }).map((_) => ' ')} {line}
                            </Text3D>
                        );
                    })}
                </group>
            </group>
        </group>
    );
}
