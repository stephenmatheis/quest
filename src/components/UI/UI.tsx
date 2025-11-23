import { Window } from '@/components/Window';
import { useWorld } from '@/providers/World';
import styles from './UI.module.scss';
import { Tooltip } from '../Tooltip';

export function UI() {
    const {
        isCharacterMenuOpen,
        setIsCharacterMenuOpen,
        isGameMenuOpen,
        setIsGameMenuOpen,
        isQuestLogOpen,
        setIsQuestLogOpen,
        windowOrder,
        bringToFront,
    } = useWorld();

    const windows = [
        {
            name: 'Character',
            isOpen: isCharacterMenuOpen,
            setIsOpen: setIsCharacterMenuOpen,
            top: 32,
            left: 32,
            content: 'This is your Character.',
        },
        {
            name: 'Quest Log',
            isOpen: isQuestLogOpen,
            setIsOpen: setIsQuestLogOpen,
            top: 32,
            left: 32,
            content: 'This is your Quest Log.',
        },
        {
            name: 'Menu',
            isOpen: isGameMenuOpen,
            setIsOpen: setIsGameMenuOpen,
            top: 32,
            left: 32,
            content: 'This is the Game Menu.',
        },
    ];

    const openWindows = windows
        .filter((w) => w.isOpen)
        .sort((a, b) => {
            const aIndex = windowOrder.indexOf(a.name);
            const bIndex = windowOrder.indexOf(b.name);

            if (aIndex === -1 && bIndex === -1) return 0;
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;

            return aIndex - bIndex;
        });

    return (
        <div className={styles.ui}>
            {/* Tracked Quests */}
            <div className={styles['tracked-quests']}>Tracked Quests</div>

            {/* Mini Map */}
            <div className={styles['mini-map']}>Mini Map</div>

            {/* Hot bars */}
            <div className={styles['hot-bars']}>
                <div className={styles.bar}>
                    <div className={styles.spell}>1</div>
                    <div className={styles.spell}>2</div>
                    <div className={styles.spell}>3</div>
                    <div className={styles.spell}>4</div>
                    <div className={styles.spell}>q</div>
                    <div className={styles.spell}>w</div>
                    <div className={styles.spell}>e</div>
                    <div className={styles.spell}>r</div>
                </div>
                {/* NOTE: Optional */}
                {/* <div className={styles.bar}>
                    <div className={styles.spell}>s-1</div>
                    <div className={styles.spell}>s-2</div>
                    <div className={styles.spell}>s-3</div>
                    <div className={styles.spell}>s-4</div>
                    <div className={styles.spell}>s-q</div>
                    <div className={styles.spell}>s-w</div>
                    <div className={styles.spell}>s-e</div>
                    <div className={styles.spell}>s-r</div>
                </div> */}
            </div>

            {/* Buttons */}
            <div className={styles.buttons}>
                <Tooltip content="Character">
                    <button
                        onClick={() => {
                            bringToFront('Character');
                            setIsCharacterMenuOpen(true);
                        }}
                    >
                        C
                    </button>
                </Tooltip>
                <Tooltip content="Quest Log">
                    <button
                        onClick={() => {
                            bringToFront('Quest Log');
                            setIsQuestLogOpen(true);
                        }}
                    >
                        Q
                    </button>
                </Tooltip>
                <Tooltip content="Menu">
                    <button
                        onClick={() => {
                            bringToFront('Menu');
                            setIsGameMenuOpen(true);
                        }}
                    >
                        M
                    </button>
                </Tooltip>
            </div>

            {/* Chat Log */}
            <div className={styles['chat-log']}>Chat Log</div>

            {/* Buffs */}
            <div className={styles.buffs}>Buffs</div>

            {/* Debuffs */}
            <div className={styles.debuffs}>Debuffs</div>

            {/* Character Pane */}
            <div className={styles['character-frame']}>Character Frame</div>

            {/* Target Pane */}
            <div className={styles['target-frame']}>Target Frame</div>

            {/* Cast Bar */}
            <div className={styles['cast-bar']}>
                <div>Cast Bar</div>
                <div className={styles.bar} />
            </div>

            {/* Render windows in correct stacking order */}
            {openWindows.map((w) => (
                <Window
                    key={w.name}
                    name={w.name}
                    top={w.top}
                    left={w.left}
                    onFocus={() => bringToFront(w.name)}
                    onClose={() => w.setIsOpen(false)}
                >
                    {w.content}
                </Window>
            ))}
        </div>
    );
}
