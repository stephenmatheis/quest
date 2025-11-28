import type { PointerEvent, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useDragControls } from 'motion/react';
import styles from './Window.module.scss';

export type WindowProps = {
    children: ReactNode;
    name: string;
    top?: number | string;
    left?: number | string;
    width?: number | string;
    height?: number | string;
    onFocus?: () => void;
    onClose?: () => void;
    blank?: boolean;
};

export function Window({ children, name, top, left, width, height, onFocus, onClose, blank }: WindowProps) {
    const dragControls = useDragControls();

    function handleClose(event: PointerEvent) {
        event.preventDefault();
        event.stopPropagation();
        onClose?.();
    }

    function startDrag(event: PointerEvent) {
        dragControls.start(event);
    }

    if (blank) {
        return (
            <motion.div
                className={`${styles.window} ${styles.blank} ${!top || !left ? styles.center : ''}`}
                style={{
                    top,
                    left,
                    width,
                    height,
                }}
                drag={!top || !left ? false : true}
                dragMomentum={false}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className={`${styles.window} ${!top || !left ? styles.center : ''}`}
            style={{
                top,
                left,
                width,
                height,
            }}
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
                <button className={styles.close} onPointerDown={handleClose}>
                    &times;
                </button>
            </div>
            <div className={styles.content}>{children}</div>
        </motion.div>
    );
}
