import { useState, useEffect } from 'react';
import type { ContentEntry } from '../../types/resume';
import { useResume } from '../../hooks/useResume';

interface EntryEditorProps {
    entry: ContentEntry;
    entryIndex: number;
    entryTotal: number;
    sectionIndex: number;
}

export default function EntryEditor({
    entry,
    entryIndex,
    entryTotal,
    sectionIndex,
}: EntryEditorProps) {
    const { dispatch } = useResume();

    // 技术标签用本地 state，失焦或回车时才提交
    const [tagsInput, setTagsInput] = useState(entry.tags.join(', '));

    // 当外部 entry.tags 变化时同步到本地 state（如移动/删除条目后）
    useEffect(() => {
        setTagsInput(entry.tags.join(', '));
    }, [entry.tags]);

    const handleChange = (field: string, value: unknown) => {
        dispatch({
            type: 'UPDATE_ENTRY',
            payload: { sectionIndex, id: entry.id, data: { [field]: value } },
        });
    };

    const commitTags = () => {
        const tags = tagsInput
            .split(/[,，]/)
            .map((t) => t.trim())
            .filter(Boolean);
        dispatch({
            type: 'UPDATE_ENTRY',
            payload: { sectionIndex, id: entry.id, data: { tags } },
        });
    };

    const handleTagsKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            commitTags();
        }
    };

    const handleMove = (direction: 'up' | 'down') => {
        dispatch({
            type: 'MOVE_ENTRY',
            payload: { sectionIndex, id: entry.id, direction },
        });
    };

    const handleDelete = () => {
        dispatch({
            type: 'DELETE_ENTRY',
            payload: { sectionIndex, id: entry.id },
        });
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">
                    条目 {entryIndex + 1}
                </span>
                <div className="flex gap-1">
                    <button
                        onClick={() => handleMove('up')}
                        disabled={entryIndex === 0}
                        className="px-2 py-1 text-xs rounded bg-white border border-gray-300
                                   hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
                                   transition-colors cursor-pointer"
                    >
                        ↑
                    </button>
                    <button
                        onClick={() => handleMove('down')}
                        disabled={entryIndex === entryTotal - 1}
                        className="px-2 py-1 text-xs rounded bg-white border border-gray-300
                                   hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
                                   transition-colors cursor-pointer"
                    >
                        ↓
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-2 py-1 text-xs rounded bg-red-50 text-red-600 border border-red-200
                                   hover:bg-red-100 transition-colors cursor-pointer"
                    >
                        删除
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            项目/公司名称
                        </label>
                        <input
                            type="text"
                            value={entry.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="如：电商平台重构"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            角色/职位
                        </label>
                        <input
                            type="text"
                            value={entry.subtitle}
                            onChange={(e) => handleChange('subtitle', e.target.value)}
                            placeholder="如：前端开发工程师"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        时间范围
                    </label>
                    <input
                        type="text"
                        value={entry.dateRange}
                        onChange={(e) => handleChange('dateRange', e.target.value)}
                        placeholder="如：2024.06 - 2024.09"
                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        详细描述
                    </label>
                    <textarea
                        value={entry.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="描述项目内容、成果、职责等"
                        rows={3}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm resize-y
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        技术标签（逗号分隔）
                    </label>
                    <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        onBlur={commitTags}
                        onKeyDown={handleTagsKeyDown}
                        placeholder="如：React, TypeScript, Node.js"
                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    );
}
