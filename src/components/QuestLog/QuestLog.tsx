import { use } from 'react';
import { getDB, type Quest } from './data';
import styles from './QuestLog.module.scss';

export function QuestLog() {
    const quests: Quest[] = use(getDB('/quests'));

    return (
        <div className={styles['quest-log']}>
            {quests.map(({ text, grade }, index) => {
                return (
                    <div key={index}>
                        {text} {grade}
                    </div>
                );
            })}
        </div>
    );
}
