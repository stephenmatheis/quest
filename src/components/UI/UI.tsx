import styles from './UI.module.scss';

export function UI() {
    return (
        <div className={styles.ui}>
            {/* Character Pane */}
            <div className={styles['character-pane']}>Character Frame</div>

            {/* Target Pane */}
            <div className={styles['target-pane']}>Target Frame</div>

            {/* Cast Bar */}
            <div className={styles['cast-bar']}>Cast Bar</div>

            {/* Mini Map */}
            <div className={styles['mini-map']}>Mini Map</div>

            {/* Tracked Quests */}
            <div className={styles['Tracked Quests']}>Tracked Quests</div>

            {/* Hot bars */}
            <div className={styles['hot bars']}>Hot Bars</div>

            {/* Chat Log */}
            <div className={styles['chat-log']}>Chat Log</div>

            {/* Buttons */}
            <div className={styles.buttons}>Buttons</div>
        </div>
    );
}
