import { useEffect, useMemo, type Dispatch, type SetStateAction } from 'react';
import { Window, type WindowProps } from '@/components/Window';
import { Modal, type ModalProps } from '@/components/Modal';
import { useWorld } from '@/providers/World';
import styles from './UI.module.scss';
import { Tooltip } from '../Tooltip';

type Pane = 'window' | 'modal';

type Windows = WindowProps & {
    type: Pane;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type Modals = ModalProps & {
    type: Pane;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

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

    const windows: (Windows | Modals)[] = [
        {
            type: 'window',
            name: 'Character',
            isOpen: isCharacterMenuOpen,
            setIsOpen: setIsCharacterMenuOpen,
            top: 132,
            left: 32,
            width: 600,
            height: 400,
            children: 'This is your Character.',
        },
        {
            type: 'window',
            name: 'Quest Log',
            isOpen: isQuestLogOpen,
            setIsOpen: setIsQuestLogOpen,
            top: 132,
            left: 32,
            width: 800,
            height: 400,
            children: 'This is your Quest Log.',
        },
        {
            type: 'modal',
            name: 'Menu',
            isOpen: isGameMenuOpen,
            setIsOpen: setIsGameMenuOpen,
            width: 300,
            height: 500,
            children: 'This is the Game Menu.',
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

    // TODO: Add action description card tooltip
    const keybinds = useMemo(() => {
        return [
            {
                key: 'escape',
                action() {
                    if (openWindows.length === 0) return;

                    openWindows.at(-1)?.setIsOpen(false);
                },
            },
            {
                key: 'c',
                action() {
                    setIsCharacterMenuOpen(true);
                },
            },
            {
                key: 'l',
                action() {
                    setIsQuestLogOpen(true);
                },
            },
            {
                key: 'm',
                action() {
                    setIsGameMenuOpen(true);
                },
            },
            // Spells
            {
                key: '1',
                action() {
                    console.log('spell 1');
                },
            },
            {
                key: '2',
                action() {
                    console.log('spell 2');
                },
            },
            {
                key: '3',
                action() {
                    console.log('spell 3');
                },
            },
            {
                key: '4',
                action() {
                    console.log('spell 4');
                },
            },
            {
                key: 'q',
                action() {
                    console.log('spell q');
                },
            },
            {
                key: 'w',
                action() {
                    console.log('spell w');
                },
            },
            {
                key: 'e',
                action() {
                    console.log('spell e');
                },
            },
            {
                key: 'r',
                action() {
                    console.log('spell r');
                },
            },
        ];
    }, [setIsCharacterMenuOpen, setIsGameMenuOpen, setIsQuestLogOpen, openWindows]);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            keybinds.find(({ key }) => key === event.key.toLowerCase())?.action();
        }

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [keybinds]);

    return (
        <div className={styles.ui}>
            <div className={styles.left}>
                {/* Character Frame */}
                <div className={styles['character-frame']}>Character Frame</div>

                {/* Actions */}
                <div className={styles.actions}>
                    <div className={styles.spell}>1</div>
                    <div className={styles.spell}>2</div>
                    <div className={styles.spell}>3</div>
                    <div className={styles.spell}>4</div>
                    <div className={styles.spell}>Q</div>
                    <div className={styles.spell}>W</div>
                    <div className={styles.spell}>E</div>
                    <div className={styles.spell}>R</div>
                </div>
            </div>
            <div className={styles.right}>
                {/* Mini Map */}
                <div className={styles['mini-map']}>Mini Map</div>

                {/* Tracked Quests */}
                <div className={styles['tracked-quests']}>Tracked Quests</div>

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
                            L
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
            </div>

            {/* Render windows in correct stacking order */}
            {openWindows.map((w) => {
                if (w.type === 'modal') {
                    return (
                        <Modal
                            key={w.name}
                            name={w.name}
                            top={w.top}
                            left={w.left}
                            width={w.width}
                            height={w.height}
                            onFocus={() => bringToFront(w.name)}
                            onClose={() => w.setIsOpen(false)}
                        >
                            {w.children}
                        </Modal>
                    );
                }

                if (w.type === 'window') {
                    return (
                        <Window
                            key={w.name}
                            name={w.name}
                            top={w.top}
                            left={w.left}
                            width={w.width}
                            height={w.height}
                            onFocus={() => bringToFront(w.name)}
                            onClose={() => w.setIsOpen(false)}
                        >
                            {w.children}
                        </Window>
                    );
                }
            })}
        </div>
    );
}
