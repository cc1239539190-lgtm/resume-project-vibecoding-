// ============================================================
// 头部标签项（可拖拽排序、自定义添加）
// ============================================================
export interface HeaderItem {
    id: string;
    label: string;
    value: string;
}

// ============================================================
// 单个项目/实习条目
// ============================================================
export interface ContentEntry {
    id: string;
    title: string;
    subtitle: string;
    dateRange: string;
    description: string;
    tags: string[];
}

// ============================================================
// 内容分区（可多个）
// ============================================================
export interface ContentSection {
    id: string;
    sectionTitle: string;
    entries: ContentEntry[];
}

// ============================================================
// 完整简历数据
// ============================================================
export interface ResumeData {
    photo: string;
    header: HeaderItem[];
    content: ContentSection[];
    templateId: string;
}

// ============================================================
// Reducer Action 联合类型
// ============================================================
export type ResumeAction =
    // 头部标签
    | { type: 'ADD_HEADER_ITEM' }
    | { type: 'UPDATE_HEADER_ITEM'; payload: { id: string; data: Partial<HeaderItem> } }
    | { type: 'DELETE_HEADER_ITEM'; payload: { id: string } }
    | { type: 'MOVE_HEADER_ITEM'; payload: { id: string; direction: 'up' | 'down' } }
    // 内容分区
    | { type: 'ADD_SECTION' }
    | { type: 'DELETE_SECTION'; payload: { sectionIndex: number } }
    | { type: 'UPDATE_SECTION_TITLE'; payload: { sectionIndex: number; title: string } }
    | { type: 'MOVE_SECTION'; payload: { sectionIndex: number; direction: 'up' | 'down' } }
    // 分区内条目
    | { type: 'ADD_ENTRY'; payload: { sectionIndex: number } }
    | { type: 'UPDATE_ENTRY'; payload: { sectionIndex: number; id: string; data: Partial<ContentEntry> } }
    | { type: 'DELETE_ENTRY'; payload: { sectionIndex: number; id: string } }
    | { type: 'MOVE_ENTRY'; payload: { sectionIndex: number; id: string; direction: 'up' | 'down' } }
    // 证件照
    | { type: 'SET_PHOTO'; payload: string }
    // 模板
    | { type: 'SET_TEMPLATE'; payload: string }
    | { type: 'LOAD_RESUME'; payload: ResumeData };
