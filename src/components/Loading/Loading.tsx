import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import styles from './Loading.module.scss';

export function Loading() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className={styles.loading}
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                    }}
                    transition={{
                        ease: 'easeOut',
                        duration: 0.4,
                    }}
                >
                    Garage
                </motion.div>
            )}
        </AnimatePresence>
    );
}
