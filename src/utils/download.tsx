import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

function saveArrayBuffer(buffer: ArrayBuffer, filename: string) {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

export function downloadGroupAsGLB(group: THREE.Group, filename = 'scene.glb') {
    const exporter = new GLTFExporter();

    // Options: set binary to true for GLB format
    const options = {
        binary: true,
    };

    exporter.parse(
        group,
        // Called when the export completes
        function (result) {
            if (result instanceof ArrayBuffer) {
                saveArrayBuffer(result, filename);
            }
        },
        // Called when the export encounters an error
        function (error) {
            console.log('An error happened during export:', error);
        },
        // Options object
        options
    );
}
