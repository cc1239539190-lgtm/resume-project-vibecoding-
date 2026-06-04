import HeaderEditor from './HeaderEditor';
import ContentEditor from './ContentEditor';

export default function EditorPanel() {
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">编辑简历</h2>
            <HeaderEditor />
            <ContentEditor />
        </div>
    );
}
