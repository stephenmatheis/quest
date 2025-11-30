import { WorldProvider } from '@/providers/WorldProvider';
import { CameraProvider } from '@/providers/CameraProvider';
import { AppContent } from '@/components/AppContent';

export default function App() {
    return (
        <WorldProvider>
            <CameraProvider>
                <AppContent />
            </CameraProvider>
        </WorldProvider>
    );
}
