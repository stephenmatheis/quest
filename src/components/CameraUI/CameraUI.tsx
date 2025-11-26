import { useCamera } from '@/providers/CameraProvider';
import styles from './CameraUI.module.scss';

export function CameraUI() {
    const { isCameraLocked, toggleCameraLock, start, end, overhead, inside } = useCamera();

    return (
        <div className={styles.ui}>
            <div className={styles.buttons}>
                <button
                    className={`${isCameraLocked ? styles.red : styles.green}`}
                    onClick={(event) => {
                        event.preventDefault();
                        toggleCameraLock();
                    }}
                >
                    Camera {isCameraLocked ? 'Locked' : 'Free'}
                </button>

                <button
                    onClick={(event) => {
                        event.preventDefault();
                        start();
                    }}
                >
                    Back to Start
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        end();
                    }}
                >
                    Look at Quest Board
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        overhead();
                    }}
                >
                    Overhead
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        inside();
                    }}
                >
                    Inside Roof
                </button>
            </div>
        </div>
    );
}
