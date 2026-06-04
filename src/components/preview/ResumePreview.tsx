import { useRef, useEffect, useState } from 'react';
import { useResume } from '../../hooks/useResume';
import { getTemplate } from '../../templates/TemplateRegistry';

export default function ResumePreview() {
    const { state } = useResume();
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    const template = getTemplate(state.templateId);

    // 根据容器大小自动缩放 A4 纸到合适尺寸
    useEffect(() => {
        const container = containerRef.current?.parentElement;
        if (!container) return;

        const updateScale = () => {
            const maxWidth = container.clientWidth - 48; // 减去 padding
            const a4Width = 210; // mm
            // 1mm ≈ 3.78px at 96dpi
            const baseWidth = a4Width * 3.78;
            const newScale = Math.min(1, maxWidth / baseWidth);
            setScale(newScale);
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    if (!template) {
        return (
            <div className="text-gray-500 text-sm">
                未找到模板: {state.templateId}
            </div>
        );
    }

    return (
        <div
            id="resume-preview"
            ref={containerRef}
            className="bg-white shadow-lg origin-top"
            style={{
                transform: `scale(${scale})`,
                marginBottom: `-${(1 - scale) * 100}%`,
            }}
        >
            {template.render(state)}
        </div>
    );
}
