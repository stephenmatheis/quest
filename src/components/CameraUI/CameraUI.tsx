import { useCamera } from '@/providers/CameraProvider';
import styles from './CameraUI.module.scss';

export function CameraUI() {
    const { isCameraLocked, cameraControlsRef, setIsCameraLocked } = useCamera();

    return (
        <div className={styles.ui}>
            <button
                className={`${styles.bottom} ${isCameraLocked ? styles.red : styles.green}`}
                onClick={(event) => {
                    event.preventDefault();

                    setIsCameraLocked((prev) => {
                        const controls = cameraControlsRef.current;

                        if (prev === false && controls) {
                            controls.reset(true);
                            controls.setLookAt(0, 4.5, 11, 0, 5, -10, true);
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
