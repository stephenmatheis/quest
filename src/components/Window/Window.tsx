import type { PointerEvent, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useDragControls } from 'motion/react';
import styles from './Window.module.scss';

export function Window({
    children,
    name,

    top,
    left,
    onFocus,
    onClose,
}: {
    name: string;

    children: ReactNode;
    top: number | string;
    left: number | string;
    onFocus?: () => void;
    onClose?: () => void;
}) {
    const dragControls = useDragControls();

    function handleClose(event: PointerEvent) {
        event.preventDefault();
        event.stopPropagation();
        onClose?.();
    }

    function startDrag(event: PointerEvent) {
        dragControls.start(event);
    }

    return (
        <motion.div
            className={styles.window}
            style={{ top, left }}
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragListener={false}
            onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest(`.${styles.close}`)) return;

                onFocus?.();
            }}
            layout
        >
            <div className={styles.titlebar} onPointerDown={startDrag}>
                <div>{name || 'Untitled'}</div>
                <div className={styles.close} onPointerDown={handleClose}>
                    &times;
                </div>
            </div>
            <div className={styles.content}>{children}</div>
        </motion.div>
    );
}
