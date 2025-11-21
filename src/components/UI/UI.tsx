import { useWorld } from '@/providers/World';
import styles from './UI.module.scss';

export function UI() {
    const { isCameraLocked, cameraControlsRef, setIsCameraLocked } = useWorld();

    return (
        <div className={styles.ui}>
            {/* <div className={styles.topleft}>
                <h2>My Fleet</h2>
            </div> */}
            {/* <button className={styles.topright}>Menu</button> */}
            <button
                className={`${styles.bottom} ${isCameraLocked ? styles.red : styles.green}`}
                onClick={(event) => {
                    event.preventDefault();

                    setIsCameraLocked((prev) => {
                        const controls = cameraControlsRef.current;

                        if (prev === false && controls) {
                            controls.reset(true);
                        }

                        return !prev;
                    });
                }}
            >
                Camera {isCameraLocked ? 'locked' : 'unlocked'}
            </button>
        </div>
    );
}
