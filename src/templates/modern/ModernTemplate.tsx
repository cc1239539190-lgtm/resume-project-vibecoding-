import type { ResumeData } from '../../types/resume';
import MarkdownRenderer from '../../components/common/MarkdownRenderer';

const MARKDOWN_CSS = `
.markdown-body { font-size: 14px; line-height: 1.6; color: #374151; }
.markdown-body p { margin: 0 0 6px 0; }
.markdown-body ul, .markdown-body ol { margin: 0 0 6px 0; padding-left: 20px; }
.markdown-body li { margin-bottom: 2px; }
.markdown-body strong { font-weight: 600; color: #1f2937; }
.markdown-body em { font-style: italic; }
.markdown-body code {
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 12px;
    background: #f3f4f6;
    padding: 1px 4px;
    border-radius: 3px;
    color: #1d4ed8;
}
.markdown-body a { color: #2563eb; text-decoration: none; }
.markdown-body blockquote {
    margin: 0 0 6px 0;
    padding-left: 12px;
    border-left: 3px solid #d1d5db;
    color: #6b7280;
}
.markdown-body h4 { font-size: 14px; font-weight: 600; margin: 0 0 4px 0; color: #1f2937; }
.markdown-body h5 { font-size: 13px; font-weight: 600; margin: 0 0 2px 0; color: #374151; }

/* 打印分页控制 */
@media print {
    .resume-header { break-after: avoid; }
    .resume-section-header { break-after: avoid; }
    /* 条目内部允许自然分页，避免长条目整体推到下一页造成大面积留白 */
    .resume-entry { break-inside: auto; }
    .resume-section { break-before: auto; }
    /* 打印时取消最小高度，让内容自然流动 */
    .resume-root { min-height: auto !important; }
}
`;

interface ModernTemplateProps {
    data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
    const { photo, header, content } = data;

    return (
        <div
            className="resume-root bg-white font-sans text-gray-800"
            style={{
                width: '210mm',
                minHeight: '297mm',
                padding: '15mm 18mm',
                boxSizing: 'border-box',
                fontFamily: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
            }}
        >
            <style>{MARKDOWN_CSS}</style>

            {/* ========== 头部 ========== */}
            <header className="resume-header mb-6 flex justify-between items-start">
                <div className="flex-1">
                    {/* 姓名放最前面，大号显示 */}
                    {header.length > 0 && (
                        <h1 className="text-3xl font-bold tracking-wide mb-3" style={{ color: '#1a1a1a' }}>
                            {header[0].value || '姓名'}
                        </h1>
                    )}
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
                        {header.slice(1).map((item) => (
                            <span key={item.id} className="flex items-center gap-1">
                                <span className="text-gray-300">|</span>
                                {item.label && (
                                    <span className="font-medium text-gray-600">{item.label}:</span>
                                )}
                                {item.value}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 证件照 */}
                {photo && (
                    <div className="ml-6 shrink-0">
                        <img
                            src={photo}
                            alt="证件照"
                            style={{
                                width: '30mm',
                                height: '40mm',
                                objectFit: 'cover',
                                border: '1px solid #d1d5db',
                                borderRadius: '2px',
                            }}
                        />
                    </div>
                )}
            </header>

            {/* 分隔线 */}
            <hr className="border-gray-300 mb-5" />

            {/* ========== 内容区（多分区） ========== */}
            {content.map((section) => (
                <section key={section.id} className="resume-section mb-6">
                    <h2
                        className="resume-section-header text-xl font-bold mb-4 pl-3"
                        style={{ borderLeft: '4px solid #2563eb', lineHeight: 1.4 }}
                    >
                        {section.sectionTitle || '未命名分区'}
                    </h2>

                    {section.entries.map((entry) => (
                        <div key={entry.id} className="resume-entry mb-5">
                            {/* 标题行 */}
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-base font-semibold text-gray-900">
                                    {entry.title || '未命名项目'}
                                </h3>
                                {entry.dateRange && (
                                    <span className="text-xs text-gray-400 whitespace-nowrap ml-3">
                                        {entry.dateRange}
                                    </span>
                                )}
                            </div>

                            {/* 副标题 */}
                            {entry.subtitle && (
                                <p className="text-sm text-gray-500 mb-2" style={{ fontStyle: 'italic' }}>
                                    {entry.subtitle}
                                </p>
                            )}

                            {/* 描述（支持 Markdown） */}
                            <MarkdownRenderer content={entry.description} />

                            {/* 技术标签 */}
                            {entry.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {entry.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-xs px-2 py-0.5 rounded-full"
                                            style={{
                                                backgroundColor: '#eff6ff',
                                                color: '#1d4ed8',
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {section.entries.length === 0 && (
                        <p className="text-sm text-gray-400 italic">暂无内容</p>
                    )}
                </section>
            ))}
        </div>
    );
}
