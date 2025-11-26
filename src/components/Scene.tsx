import { Suspense, useEffect, useRef, useState } from 'react';
import supabase from '@/lib/supabase';
import { type Database } from '@/types/supabase';
import { CameraControls, CameraControlsImpl, Grid, Text, useHelper } from '@react-three/drei';
import {
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    PointLight,
    PointLightHelper,
} from 'three';
import { useCamera } from '@/providers/CameraProvider';
import { Torch } from '@/components/Models/Torch';
import { Dagger } from '@/components/Models/Dagger';

type Quest = Database['public']['Tables']['quests']['Row'];

const { ACTION } = CameraControlsImpl;

const ROOM_WIDTH = 24;
const ROOM_DEPTH = 24;

function Floor() {
    return (
        <mesh position={[0, 0.125, ROOM_DEPTH / 2]}>
            <boxGeometry args={[ROOM_WIDTH, 0.25, ROOM_DEPTH]} />
            <meshStandardMaterial color="#A6703E" />
        </mesh>
    );
}

function BackWall() {
    return (
        <mesh position={[0, 3.0625, -0.25]}>
            <boxGeometry args={[ROOM_WIDTH, 6.125, 0.5]} />
            <meshStandardMaterial color="#808080" />
        </mesh>
    );
}

function Roof() {
    return (
        // <mesh position={[0, 3.875, ROOM_DEPTH / 2]}>
        <mesh position={[0, 6, ROOM_DEPTH / 2]}>
            <boxGeometry args={[ROOM_WIDTH, 0.25, ROOM_DEPTH]} />
            <meshStandardMaterial color="#643A16" />
        </mesh>
    );
}

function Board() {
    return (
        <group>
            {/* Top */}
            <mesh position={[0, 3, 0.0625]}>
                <boxGeometry args={[4, 0.125, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Bottom */}
            <mesh position={[0, 1, 0.0625]}>
                <boxGeometry args={[4, 0.125, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Right */}
            <mesh position={[1.9375, 2, 0.0625]}>
                <boxGeometry args={[0.125, 1.875, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Left */}
            <mesh position={[-1.9375, 2, 0.0625]}>
                <boxGeometry args={[0.125, 1.875, 0.125]} />
                <meshStandardMaterial color="#643A16" />
            </mesh>

            {/* Center */}
            <mesh position={[0, 2, 0.0625]}>
                <boxGeometry args={[3.75, 2, 0.0125]} />
                <meshStandardMaterial color="#c2ac99" />
            </mesh>
        </group>
    );
}

function QuestCard({ text, grade, position }: { text: string; grade: string; position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={[0.5, 0.7, 0.03125]} />
                <meshStandardMaterial color="#F1E9D2" />
            </mesh>
            <Text
                position={[0, 0.2, 0.016]}
                font="fonts/Jacquard24-Regular.ttf"
                fontSize={0.1}
                color="hsl(29, 52%, 25%)"
                textAlign="center"
            >
                {text}
            </Text>
            <Text
                position={[0, -0.2, 0.016]}
                font="fonts/Jacquard24-Regular.ttf"
                fontSize={0.1}
                color="hsl(5, 95%, 40%)"
                textAlign="center"
            >
                [ {grade} ]
            </Text>
        </group>
    );
}

export default function Quests() {
    const [quests, setQuests] = useState<Quest[]>([]);

    const COLUMNS = 6;
    const COL_WIDTH = 0.6;
    const ROW_HEIGHT = 0.8;
    const START_Y = 2.4;

    useEffect(() => {
        async function fetchQuests() {
            const { data, error } = await supabase
                .from('quests')
                .select('id, created_at, text, grade')
                .order('id', { ascending: true });

            if (error) {
                console.error('Supabase error:', error);
            } else {
                setQuests(data || []);
            }
        }

        fetchQuests();
    }, []);

    return (
        <group position={[-1.5, 0, 0]}>
            {quests.map(({ text, grade }, index) => {
                const col = index % COLUMNS;
                const row = Math.floor(index / COLUMNS);
                const position: [number, number, number] = [col * COL_WIDTH, START_Y - row * ROW_HEIGHT, 0.078125];

                return <QuestCard key={index} text={text} grade={grade || 'F'} position={position} />;
            })}
        </group>
    );
}

function RightTorch() {
    const rightTorchLight = useRef<PointLight>(null);

    useHelper(rightTorchLight as React.RefObject<PointLight>, PointLightHelper, 0.25, 'red');

    return (
        <>
            <pointLight ref={rightTorchLight} position={[3, 2.5, 0.25]} intensity={1} color="#ffb84d" />
            <Torch position={[3, 2, 0.25]} scale={1} />
        </>
    );
}

function LeftTorch() {
    const leftTorchLight = useRef<PointLight>(null);

    useHelper(leftTorchLight as React.RefObject<PointLight>, PointLightHelper, 0.25, 'red');

    return (
        <>
            <pointLight ref={leftTorchLight} position={[-3, 2.5, 0.25]} intensity={1} color="#ffb84d" />
            <Torch position={[-3, 2, 0.25]} scale={1} />
        </>
    );
}

export function Scene() {
    const { cameraControlsRef, isCameraLocked, start, end } = useCamera();
    const rightDirLightRef = useRef<DirectionalLight>(null);
    const leftDirLightRef = useRef<DirectionalLight>(null);
    const hemiLightRef = useRef<HemisphereLight>(null);

    useHelper(rightDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 0.25, 'red');
    useHelper(leftDirLightRef as React.RefObject<DirectionalLight>, DirectionalLightHelper, 0.25, 'red');
    useHelper(hemiLightRef as React.RefObject<HemisphereLight>, HemisphereLightHelper, 0.25, 'red');

    useEffect(() => {
        start();

        requestAnimationFrame(() => {
            end();
        });

        const controls = cameraControlsRef.current;

        if (!controls) return;

        controls.smoothTime = 1.1;
    }, [cameraControlsRef, end, start]);

    return (
        <>
            {/* Camera */}
            <CameraControls
                ref={cameraControlsRef}
                mouseButtons={{
                    left: isCameraLocked ? ACTION.NONE : ACTION.ROTATE,
                    middle: ACTION.DOLLY,
                    right: isCameraLocked ? ACTION.NONE : ACTION.TRUCK,
                    wheel: ACTION.DOLLY,
                }}
                touches={{
                    one: ACTION.TOUCH_ROTATE,
                    two: ACTION.TOUCH_DOLLY_TRUCK,
                    three: ACTION.TOUCH_DOLLY_TRUCK,
                }}
            />

            <directionalLight ref={rightDirLightRef} position={[6, 2, 2]} intensity={1} />
            <directionalLight ref={leftDirLightRef} position={[-6, 2, 2]} intensity={1} />
            <hemisphereLight
                ref={hemiLightRef}
                position={[0, 2, 10]}
                intensity={3}
                color="#fff2e2"
                groundColor="#4a341f"
            />
            <RightTorch />
            <LeftTorch />
            <Roof />
            <BackWall />
            <Floor />
            <Board />
            <Dagger position={[1.5, 2.7, 0.5]} scale={0.75} rotation={[Math.PI / 1, Math.PI / 2.2, Math.PI / 2.75]} />
            <Suspense>
                <Quests />
            </Suspense>
            <Grid
                position={[0, 0, 0]}
                cellSize={1}
                cellThickness={1}
                cellColor="#6f6f6f"
                sectionSize={4}
                sectionThickness={1}
                sectionColor="#000000"
                followCamera={false}
                infiniteGrid={true}
            />
        </>
    );
}
