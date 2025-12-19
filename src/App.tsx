import { WorldProvider } from '@/providers/WorldProvider';
import { CameraProvider } from '@/providers/CameraProvider';
import { World } from './components/World';

export default function App() {
    return (
        <WorldProvider>
            <CameraProvider>
                <World />
            </CameraProvider>
        </WorldProvider>
    );
}
