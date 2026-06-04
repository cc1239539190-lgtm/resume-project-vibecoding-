import type { ResumeData } from '../types/resume';

export const initialResume: ResumeData = {
    photo: '',
    header: [
        { id: 'h1', label: '姓名', value: '张三' },
        { id: 'h2', label: '教育背景', value: '北京大学 计算机科学与技术 本科 2025届' },
        { id: 'h3', label: '邮箱', value: 'zhangsan@example.com' },
        { id: 'h4', label: '电话', value: '138-0000-0000' },
        { id: 'h5', label: 'GitHub', value: 'https://github.com/zhangsan' },
    ],
    content: [
        {
            id: 's1',
            sectionTitle: '项目/实习经历',
            entries: [
                {
                    id: '1',
                    title: '电商平台重构',
                    subtitle: '前端开发工程师',
                    dateRange: '2024.06 - 2024.09',
                    description: `- 使用 **React + TypeScript** 对原有 jQuery 项目进行全面重构，页面加载速度提升 **60%**
- 负责组件库搭建与状态管理方案设计，统一团队开发规范
- 配合后端完成接口联调，推动项目按时上线`,
                    tags: ['React', 'TypeScript', 'Zustand', 'Ant Design'],
                },
                {
                    id: '2',
                    title: '字节跳动',
                    subtitle: '前端实习生',
                    dateRange: '2024.01 - 2024.05',
                    description: `- 参与内部中台系统的开发与维护
- 独立负责**数据可视化模块**的设计与实现，使用 \`ECharts\` 完成复杂图表渲染
- 配合后端完成 10+ 个 RESTful API 接口联调`,
                    tags: ['Vue 3', 'ECharts', 'Element Plus', 'Git'],
                },
            ],
        },
    ],
    templateId: 'modern',
};
