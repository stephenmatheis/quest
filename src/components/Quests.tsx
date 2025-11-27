import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import { type Database } from '@/types/supabase';
import { Quest } from '@/components/Quest';

type Quest = Database['public']['Tables']['quests']['Row'];

export function Quests() {
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

                return <Quest key={index} text={text} grade={grade || 'F'} position={position} />;
            })}
        </group>
    );
}
