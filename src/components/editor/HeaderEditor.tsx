import { useState, useRef } from 'react';
import { useResume } from '../../hooks/useResume';
import type { HeaderItem } from '../../types/resume';

export default function HeaderEditor() {
    const { state, dispatch } = useResume();
    const { header, photo } = state;
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            dispatch({ type: 'SET_PHOTO', payload: reader.result as string });
        };
        reader.readAsDataURL(file);
    };

    const handlePhotoRemove = () => {
        dispatch({ type: 'SET_PHOTO', payload: '' });
    };

    const handleChange = (id: string, field: 'label' | 'value', val: string) => {
        dispatch({ type: 'UPDATE_HEADER_ITEM', payload: { id, data: { [field]: val } } });
    };

    const handleAdd = () => {
        dispatch({ type: 'ADD_HEADER_ITEM' });
    };

    const handleDelete = (id: string) => {
        dispatch({ type: 'DELETE_HEADER_ITEM', payload: { id } });
    };

    const handleDragStart = (index: number) => {
        setDragIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (dragIndex === null || dragIndex === index) return;
        // 通过多次移动实现拖拽到目标位置
        const direction = dragIndex < index ? 'down' : 'up';
        const steps = Math.abs(dragIndex - index);
        const item = header[dragIndex];
        for (let i = 0; i < steps; i++) {
            dispatch({
                type: 'MOVE_HEADER_ITEM',
                payload: { id: item.id, direction },
            });
        }
        setDragIndex(index);
    };

    const handleDragEnd = () => {
        setDragIndex(null);
    };

    return (
        <div className="mb-6">
            {/* ========== 证件照上传 ========== */}
            <div className="mb-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
                <div className="flex items-center gap-4">
                    {/* 照片预览 */}
                    <div
                        className="w-20 h-24 rounded border border-gray-300 bg-white flex items-center justify-center overflow-hidden shrink-0"
                        style={{ aspectRatio: '3/4' }}
                    >
                        {photo ? (
                            <img
                                src={photo}
                                alt="证件照"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-400 text-xs text-center px-1">
                                证件照
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700">证件照</span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1 text-xs text-blue-600 border border-blue-300 rounded
                                       hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                            {photo ? '更换照片' : '上传照片'}
                        </button>
                        {photo && (
                            <button
                                onClick={handlePhotoRemove}
                                className="px-3 py-1 text-xs text-red-500 border border-red-200 rounded
                                           hover:bg-red-50 transition-colors cursor-pointer"
                            >
                                移除照片
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ========== 头部标签 ========== */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">头部信息</h3>
                <button
                    onClick={handleAdd}
                    className="px-3 py-1 text-xs text-blue-600 border border-blue-300 rounded
                               hover:bg-blue-50 transition-colors cursor-pointer"
                >
                    + 添加标签
                </button>
            </div>

            <div className="space-y-2">
                {header.map((item, index) => (
                    <HeaderItemRow
                        key={item.id}
                        item={item}
                        index={index}
                        isDragging={dragIndex === index}
                        onChange={handleChange}
                        onDelete={handleDelete}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                    />
                ))}
            </div>

            {header.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                    暂无标签，点击「+ 添加标签」开始
                </p>
            )}
        </div>
    );
}

interface HeaderItemRowProps {
    item: HeaderItem;
    index: number;
    isDragging: boolean;
    onChange: (id: string, field: 'label' | 'value', val: string) => void;
    onDelete: (id: string) => void;
    onDragStart: (index: number) => void;
    onDragOver: (e: React.DragEvent, index: number) => void;
    onDragEnd: () => void;
}

function HeaderItemRow({
    item,
    index,
    isDragging,
    onChange,
    onDelete,
    onDragStart,
    onDragOver,
    onDragEnd,
}: HeaderItemRowProps) {
    return (
        <div
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragEnd={onDragEnd}
            className={`flex items-center gap-2 p-2 rounded-lg border transition-colors
                        ${isDragging ? 'border-blue-400 bg-blue-50 opacity-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
        >
            {/* 拖拽手柄 */}
            <span className="cursor-grab text-gray-400 hover:text-gray-600 select-none px-1">
                ⠿
            </span>

            {/* 标签名 */}
            <input
                type="text"
                value={item.label}
                onChange={(e) => onChange(item.id, 'label', e.target.value)}
                placeholder="标签名"
                className="w-24 px-2 py-1.5 text-xs border border-gray-300 rounded
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* 内容 */}
            <input
                type="text"
                value={item.value}
                onChange={(e) => onChange(item.id, 'value', e.target.value)}
                placeholder="内容"
                className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* 删除按钮 */}
            <button
                onClick={() => onDelete(item.id)}
                className="px-2 py-1 text-xs text-red-500 rounded hover:bg-red-50
                           transition-colors cursor-pointer shrink-0"
                title="删除"
            >
                ✕
            </button>
        </div>
    );
}
