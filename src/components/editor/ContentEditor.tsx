import { useState } from 'react';
import { useResume } from '../../hooks/useResume';
import EntryEditor from './EntryEditor';

export default function ContentEditor() {
    const { state, dispatch } = useResume();
    const { content } = state;
    const [dragSectionIndex, setDragSectionIndex] = useState<number | null>(null);

    const handleAddSection = () => {
        dispatch({ type: 'ADD_SECTION' });
    };

    const handleDeleteSection = (sectionIndex: number) => {
        dispatch({ type: 'DELETE_SECTION', payload: { sectionIndex } });
    };

    const handleSectionDragStart = (index: number) => {
        setDragSectionIndex(index);
    };

    const handleSectionDragOver = (e: React.DragEvent, toIndex: number) => {
        e.preventDefault();
        if (dragSectionIndex === null || dragSectionIndex === toIndex) return;
        const direction = dragSectionIndex < toIndex ? 'down' : 'up';
        const steps = Math.abs(dragSectionIndex - toIndex);
        for (let i = 0; i < steps; i++) {
            dispatch({
                type: 'MOVE_SECTION',
                payload: { sectionIndex: dragSectionIndex, direction },
            });
        }
        setDragSectionIndex(toIndex);
    };

    const handleSectionDragEnd = () => {
        setDragSectionIndex(null);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">内容区域</h3>
                <button
                    onClick={handleAddSection}
                    className="px-3 py-1 text-xs text-blue-600 border border-blue-300 rounded
                               hover:bg-blue-50 transition-colors cursor-pointer"
                >
                    + 添加分区
                </button>
            </div>

            {content.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                    暂无分区，点击「+ 添加分区」开始
                </p>
            )}

            {content.map((section, sectionIndex) => (
                <SectionEditor
                    key={section.id}
                    sectionId={section.id}
                    sectionIndex={sectionIndex}
                    totalSections={content.length}
                    isDragging={dragSectionIndex === sectionIndex}
                    onDelete={handleDeleteSection}
                    onDragStart={handleSectionDragStart}
                    onDragOver={handleSectionDragOver}
                    onDragEnd={handleSectionDragEnd}
                />
            ))}
        </div>
    );
}

interface SectionEditorProps {
    sectionId: string;
    sectionIndex: number;
    totalSections: number;
    isDragging: boolean;
    onDelete: (index: number) => void;
    onDragStart: (index: number) => void;
    onDragOver: (e: React.DragEvent, index: number) => void;
    onDragEnd: () => void;
}

function SectionEditor({
    sectionIndex,
    totalSections,
    isDragging,
    onDelete,
    onDragStart,
    onDragOver,
    onDragEnd,
}: SectionEditorProps) {
    const { state, dispatch } = useResume();
    const actualSection = state.content[sectionIndex];

    const handleTitleChange = (title: string) => {
        dispatch({
            type: 'UPDATE_SECTION_TITLE',
            payload: { sectionIndex, title },
        });
    };

    const handleAddEntry = () => {
        dispatch({ type: 'ADD_ENTRY', payload: { sectionIndex } });
    };

    return (
        <div
            draggable
            onDragStart={() => onDragStart(sectionIndex)}
            onDragOver={(e) => onDragOver(e, sectionIndex)}
            onDragEnd={onDragEnd}
            className={`mb-6 p-4 rounded-lg border-2 transition-colors
                        ${isDragging ? 'border-blue-400 bg-blue-50/50' : 'border-dashed border-gray-300 bg-white'}`}
        >
            {/* 分区标题栏 */}
            <div className="flex items-center gap-2 mb-3">
                <span className="cursor-grab text-gray-400 hover:text-gray-600 select-none text-lg">
                    ⠿
                </span>
                <input
                    type="text"
                    value={actualSection.sectionTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="分区标题（如：项目/实习经历）"
                    className="flex-1 px-3 py-1.5 text-sm font-semibold border border-gray-300 rounded
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-xs text-gray-400 whitespace-nowrap">
                    {actualSection.entries.length} 个条目
                </span>
                {totalSections > 1 && (
                    <button
                        onClick={() => onDelete(sectionIndex)}
                        className="px-2 py-1 text-xs text-red-500 rounded hover:bg-red-50
                                   transition-colors cursor-pointer shrink-0"
                        title="删除分区"
                    >
                        删除分区
                    </button>
                )}
            </div>

            {/* 分区内条目列表 */}
            {actualSection.entries.map((entry, entryIndex) => (
                <EntryEditor
                    key={entry.id}
                    entry={entry}
                    entryIndex={entryIndex}
                    entryTotal={actualSection.entries.length}
                    sectionIndex={sectionIndex}
                />
            ))}

            {/* 添加条目按钮 */}
            <button
                onClick={handleAddEntry}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg
                           text-gray-500 text-sm hover:border-blue-400 hover:text-blue-500
                           transition-colors cursor-pointer"
            >
                + 添加条目
            </button>
        </div>
    );
}
