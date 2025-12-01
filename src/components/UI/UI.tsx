import { useEffect, useMemo } from 'react';
import { useWorld } from '@/providers/WorldProvider';
import styles from './UI.module.scss';

export function UI() {
    const { setIsCharacterMenuOpen, setIsGameMenuOpen, setIsQuestLogOpen, bringToFront } = useWorld();

    const keybinds = useMemo(() => {
        return [
            // Menus
            {
                key: 'c',
                action() {
                    setIsCharacterMenuOpen((prev) => !prev);
                },
            },
            {
                key: 'l',
                action() {
                    setIsQuestLogOpen((prev) => !prev);
                },
            },
            {
                key: 'm',
                action() {
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
    }, [bringToFront, setIsCharacterMenuOpen, setIsQuestLogOpen, setIsGameMenuOpen]);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            keybinds.find(({ key }) => key === event.key.toLowerCase())?.action();
        }

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [keybinds]);

    return (
        <div className={styles.ui}>
            {/*  */}
            {/*  */}
        </div>
    );
}
