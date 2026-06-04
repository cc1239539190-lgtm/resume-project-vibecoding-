import { useCallback } from 'react';
import { exportResumeToPDF } from '../utils/exportPDF';

export function useExportPDF() {
    const exportPDF = useCallback(() => {
        exportResumeToPDF();
    }, []);

    return { exportPDF };
}
