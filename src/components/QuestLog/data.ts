// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

import supabase from '@/lib/supabase';
import type { Database } from '@/types/supabase';

export type Quest = Database['public']['Tables']['quests']['Row'];

let cache = new Map();

export function getDB(db: string) {
    if (!cache.has(db)) {
        console.log('fetching quests from the db');
        cache.set(db, getRows());
    }

    console.log('getting cached quests');
    return cache.get(db);
}

async function getRows(): Promise<Quest[]> {
    const { data, error } = await supabase
        .from('quests')
        .select('id, created_at, text, grade')
        .order('id', { ascending: true });

    if (error) {
        console.error('Supabase error:', error);

        return [];
    } else {
        return data;
    }
}
