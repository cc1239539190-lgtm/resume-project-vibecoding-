import AppLayout from './components/layout/AppLayout';
import EditorPanel from './components/editor/EditorPanel';
import ResumePreview from './components/preview/ResumePreview';
import ExportButton from './components/export/ExportButton';

function App() {
    return (
        <AppLayout
            editor={<EditorPanel />}
            preview={
                <div className="flex flex-col items-center gap-4">
                    <ExportButton />
                    <ResumePreview />
                </div>
            }
        />
    );
}

export default App;
