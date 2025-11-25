import { useCamera } from '@/providers/CameraProvider';
import styles from './CameraUI.module.scss';

export function CameraUI() {
    const { isCameraLocked, cameraControlsRef, setIsCameraLocked } = useCamera();

    return (
        <div className={styles.ui}>
            <div className={styles.buttons}>
                <button
                    className={`${isCameraLocked ? styles.red : styles.green}`}
                    onClick={(event) => {
                        event.preventDefault();

                        setIsCameraLocked((prev) => !prev);
                    }}
                >
                    {isCameraLocked ? 'Locked' : 'Free'} Camera
                </button>

                <button
                    onClick={(event) => {
                        event.preventDefault();

                        const controls = cameraControlsRef.current;

                        if (!controls) return;

                        controls.setLookAt(0, 4.5, 16, 0, 5, -10, true);
                    }}
                >
                    Back to Start
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault();

                        const controls = cameraControlsRef.current;

                        if (!controls) return;

                        controls.setLookAt(0, 4.5, 11, 0, 5, -10, true);
                    }}
                >
                    Look at Quest Board
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault();

                        const controls = cameraControlsRef.current;

                        if (!controls) return;

                        controls.setLookAt(0, 24, 48, 0, 0, -24, true);
                    }}
                >
                    Overhead
                </button>
                <button
                    onClick={(event) => {
                        event.preventDefault();

                        const controls = cameraControlsRef.current;

                        if (!controls) return;

                        controls.setLookAt(0, -6, 32, 0, 12, 4, true);
                    }}
                >
                    Inside Roof
                </button>
            </div>
        </div>
    );
}
