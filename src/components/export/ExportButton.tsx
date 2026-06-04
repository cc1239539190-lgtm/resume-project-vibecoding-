import { useExportPDF } from '../../hooks/useExportPDF';

export default function ExportButton() {
    const { exportPDF } = useExportPDF();

    return (
        <button
            onClick={exportPDF}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg
                       hover:bg-blue-700 transition-colors shadow-sm cursor-pointer
                       print:hidden"
        >
            导出 PDF
        </button>
    );
}
