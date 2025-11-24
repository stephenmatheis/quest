import type { PointerEvent, ReactNode } from 'react';
import { motion } from 'motion/react';
import styles from './Modal.module.scss';

export type ModalProps = {
    children: ReactNode;
    name: string;
    top?: number | string;
    left?: number | string;
    width?: number | string;
    height?: number | string;
    onFocus?: () => void;
    onClose?: () => void;
};

export function Modal({ children, top, left, width, height, onClose }: ModalProps) {
    function handleClose(event: PointerEvent) {
        event.preventDefault();
        event.stopPropagation();

        onClose?.();
    }

    return (
        <div className={styles.backdrop}>
            <motion.div
                className={styles.modal}
                style={{
                    top,
                    left,
                    width,
                    height,
                }}
            >
                <div className={styles.content}>{children}</div>
                <div className={styles.toolbar}>
                    <button onPointerDown={handleClose}>Return</button>
                </div>
            </motion.div>
        </div>
    );
}
