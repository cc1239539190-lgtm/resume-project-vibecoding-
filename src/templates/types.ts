import type { ResumeData } from '../types/resume';

export interface ResumeTemplate {
    id: string;
    name: string;
    render: (data: ResumeData) => React.ReactNode;
}
