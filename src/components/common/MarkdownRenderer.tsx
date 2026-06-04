import { useMemo } from 'react';
import { marked } from 'marked';

// 配置 marked：仅允许安全的内联和块级元素
marked.use({
    breaks: true,
    gfm: true,
});

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const html = useMemo(() => {
        if (!content) return '';
        const raw = marked.parse(content) as string;
        return raw;
    }, [content]);

    if (!content) return null;

    return (
        <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
