import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import styles from './Tooltip.module.scss';

export function Tooltip({ children, content }: { children: ReactNode; content: ReactNode | string }) {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    return (
        <motion.div
            className={styles.tooltip}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {children}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
