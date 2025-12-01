import { useEffect, useMemo, type Dispatch, type SetStateAction } from 'react';
import { useWorld } from '@/providers/WorldProvider';
import { Window, type WindowProps } from '@/components/Window';
import { Modal, type ModalProps } from '@/components/Modal';
import { Tooltip } from '@/components/Tooltip';
import { QuestLog } from '@/components/QuestLog';
import styles from './UIWithHUD.module.scss';

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

export function UIWithHUD() {
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
            width: 600,
            height: 400,
            children: '[ INSERT ]',
        },
        {
            type: 'window',
            name: 'Quest Log',
            isOpen: isQuestLogOpen,
            setIsOpen: setIsQuestLogOpen,
            children: <QuestLog />,
        },
        {
            type: 'modal',
            name: 'Menu',
            isOpen: isGameMenuOpen,
            setIsOpen: setIsGameMenuOpen,
            children: (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color: 'var(--tan)',
                        gap: '1rem',
                    }}
                >
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--tan)',
                            fontSize: '1rem',
                        }}
                    >
                        Options
                    </button>
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--tan)',
                            fontSize: '1rem',
                        }}
                    >
                        Support
                    </button>
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--tan)',
                            fontSize: '1rem',
                        }}
                    >
                        Account
                    </button>
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--tan)',
                            fontSize: '1rem',
                        }}
                        onPointerDown={() => setIsGameMenuOpen(false)}
                    >
                        Return
                    </button>
                </div>
            ),
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

    // TODO: Add pop-up to show what key was pressed (for DEV: only);
    // TODO: Add action description card tooltip
    const keybinds = useMemo(() => {
        return [
            // Windows & Modals
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
                    bringToFront('Character');
                    setIsCharacterMenuOpen((prev) => !prev);
                },
            },
            {
                key: 'l',
                action() {
                    bringToFront('Quest Log');
                    setIsQuestLogOpen((prev) => !prev);
                },
            },
            {
                key: 'm',
                action() {
                    bringToFront('Menu');
                    setIsGameMenuOpen((prev) => !prev);
                },
            },
            // Actions
            {
                key: '1',
                action() {
                    console.log('Action 1');
                },
            },
            {
                key: '2',
                action() {
                    console.log('Action 2');
                },
            },
            {
                key: '3',
                action() {
                    console.log('Action 3');
                },
            },
            {
                key: '4',
                action() {
                    console.log('Action 4');
                },
            },
            {
                key: 'q',
                action() {
                    console.log('Action Q');
                },
            },
            {
                key: 'e',
                action() {
                    console.log('Action E');
                },
            },
            {
                key: 'r', // FIXME: Might mess with reload (cmd + r)
                action() {
                    console.log('Action R');
                },
            },
            {
                key: 'f',
                action() {
                    console.log('Action F');
                },
            },
        ];
    }, [openWindows, bringToFront, setIsCharacterMenuOpen, setIsQuestLogOpen, setIsGameMenuOpen]);

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
                    {['1', '2', '3', '4', 'Q', 'E', 'R', 'F'].map((keybind) => {
                        return (
                            <button
                                key={keybind}
                                className={styles.action}
                                onPointerDown={() =>
                                    keybinds.find(({ key }) => key === keybind.toLowerCase())?.action()
                                }
                            >
                                {keybind}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className={styles.right}>
                {/* Tracked Quests */}
                <div className={styles['tracked-quests']}>Tracked Quests</div>

                {/* Buttons */}
                <div className={styles.buttons}>
                    <Tooltip content="Character">
                        <button
                            onClick={() => {
                                bringToFront('Character');
                                setIsCharacterMenuOpen((prev) => !prev);
                            }}
                        >
                            C
                        </button>
                    </Tooltip>
                    <Tooltip content="Quest Log">
                        <button
                            onClick={() => {
                                bringToFront('Quest Log');
                                setIsQuestLogOpen((prev) => !prev);
                            }}
                        >
                            L
                        </button>
                    </Tooltip>
                    <Tooltip content="Menu">
                        <button
                            onClick={() => {
                                bringToFront('Menu');
                                setIsGameMenuOpen((prev) => !prev);
                            }}
                        >
                            M
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/* {openWindows.map((w) => {
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
                            blank
                        >
                            {w.children}
                        </Window>
                    );
                }
            })} */}
        </div>
    );
}
