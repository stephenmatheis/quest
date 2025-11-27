import { useState } from 'react';
import { type Database } from '@/types/supabase';
import { Edges, Text } from '@react-three/drei';

type Quest = Database['public']['Tables']['quests']['Row'];

export function Quest({ text, grade, position }: { text: string; grade: string; position: [number, number, number] }) {
    const [highlight, setHighlight] = useState<boolean>(false);

    return (
        <group position={position}>
            <mesh onPointerEnter={() => setHighlight(true)} onPointerLeave={() => setHighlight(false)}>
                <boxGeometry args={[0.5, 0.7, 0.03125]} />
                <meshStandardMaterial color="#F1E9D2" />
                {highlight && <Edges linewidth={5} scale={1.01} threshold={15} color="#643A16" />}
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
