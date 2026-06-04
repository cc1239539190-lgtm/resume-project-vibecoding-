import React from 'react';

interface AppLayoutProps {
    editor: React.ReactNode;
    preview: React.ReactNode;
}

export default function AppLayout({ editor, preview }: AppLayoutProps) {
    return (
        <div className="flex h-full">
            {/* 左侧编辑器 */}
            <div className="editor-panel w-1/2 h-full overflow-y-auto border-r border-gray-200 bg-white">
                {editor}
            </div>
            {/* 右侧预览 */}
            <div className="preview-panel w-1/2 h-full overflow-y-auto bg-gray-100 flex flex-col items-center py-6">
                {preview}
            </div>
        </div>
    );
}
