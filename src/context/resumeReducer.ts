import type { ResumeData, ResumeAction } from '../types/resume';

function newId(): string {
    return crypto.randomUUID();
}

export function resumeReducer(state: ResumeData, action: ResumeAction): ResumeData {
    switch (action.type) {
        // ========== 头部标签 ==========
        case 'ADD_HEADER_ITEM':
            return {
                ...state,
                header: [
                    ...state.header,
                    { id: newId(), label: '', value: '' },
                ],
            };
        case 'UPDATE_HEADER_ITEM':
            return {
                ...state,
                header: state.header.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, ...action.payload.data }
                        : item
                ),
            };
        case 'DELETE_HEADER_ITEM':
            return {
                ...state,
                header: state.header.filter((item) => item.id !== action.payload.id),
            };
        case 'MOVE_HEADER_ITEM': {
            const items = [...state.header];
            const index = items.findIndex((item) => item.id === action.payload.id);
            if (index === -1) return state;
            const target = action.payload.direction === 'up' ? index - 1 : index + 1;
            if (target < 0 || target >= items.length) return state;
            [items[index], items[target]] = [items[target], items[index]];
            return { ...state, header: items };
        }

        // ========== 内容分区 ==========
        case 'ADD_SECTION':
            return {
                ...state,
                content: [
                    ...state.content,
                    {
                        id: newId(),
                        sectionTitle: '',
                        entries: [],
                    },
                ],
            };
        case 'DELETE_SECTION':
            return {
                ...state,
                content: state.content.filter(
                    (_, i) => i !== action.payload.sectionIndex
                ),
            };
        case 'UPDATE_SECTION_TITLE':
            return {
                ...state,
                content: state.content.map((section, i) =>
                    i === action.payload.sectionIndex
                        ? { ...section, sectionTitle: action.payload.title }
                        : section
                ),
            };
        case 'MOVE_SECTION': {
            const sections = [...state.content];
            const idx = action.payload.sectionIndex;
            const target = action.payload.direction === 'up' ? idx - 1 : idx + 1;
            if (target < 0 || target >= sections.length) return state;
            [sections[idx], sections[target]] = [sections[target], sections[idx]];
            return { ...state, content: sections };
        }

        // ========== 分区内条目 ==========
        case 'ADD_ENTRY':
            return {
                ...state,
                content: state.content.map((section, i) =>
                    i === action.payload.sectionIndex
                        ? {
                              ...section,
                              entries: [
                                  ...section.entries,
                                  {
                                      id: newId(),
                                      title: '',
                                      subtitle: '',
                                      dateRange: '',
                                      description: '',
                                      tags: [],
                                  },
                              ],
                          }
                        : section
                ),
            };
        case 'UPDATE_ENTRY':
            return {
                ...state,
                content: state.content.map((section, i) =>
                    i === action.payload.sectionIndex
                        ? {
                              ...section,
                              entries: section.entries.map((entry) =>
                                  entry.id === action.payload.id
                                      ? { ...entry, ...action.payload.data }
                                      : entry
                              ),
                          }
                        : section
                ),
            };
        case 'DELETE_ENTRY':
            return {
                ...state,
                content: state.content.map((section, i) =>
                    i === action.payload.sectionIndex
                        ? {
                              ...section,
                              entries: section.entries.filter(
                                  (entry) => entry.id !== action.payload.id
                              ),
                          }
                        : section
                ),
            };
        case 'MOVE_ENTRY': {
            return {
                ...state,
                content: state.content.map((section, i) => {
                    if (i !== action.payload.sectionIndex) return section;
                    const entries = [...section.entries];
                    const index = entries.findIndex((e) => e.id === action.payload.id);
                    if (index === -1) return section;
                    const target =
                        action.payload.direction === 'up' ? index - 1 : index + 1;
                    if (target < 0 || target >= entries.length) return section;
                    [entries[index], entries[target]] = [entries[target], entries[index]];
                    return { ...section, entries };
                }),
            };
        }

        // ========== 证件照 ==========
        case 'SET_PHOTO':
            return { ...state, photo: action.payload };

        // ========== 模板 ==========
        case 'SET_TEMPLATE':
            return { ...state, templateId: action.payload };

        case 'LOAD_RESUME':
            return action.payload;

        default:
            return state;
    }
}
