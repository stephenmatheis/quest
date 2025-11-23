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
};

export function Window({ children, name, top, left, width, height, onFocus, onClose }: WindowProps) {
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
                <div className={styles.close} onPointerDown={handleClose}>
                    &times;
                </div>
            </div>
            <div className={styles.content}>{children}</div>
        </motion.div>
    );
}
