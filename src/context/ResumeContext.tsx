import React, { createContext, useReducer } from 'react';
import type { Dispatch } from 'react';
import type { ResumeData, ResumeAction } from '../types/resume';
import { resumeReducer } from './resumeReducer';
import { initialResume } from '../data/initialResume';

const STORAGE_KEY = 'resume-builder-data';

function loadInitialState(): ResumeData {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            // 验证数据结构是否匹配新版本
            if (Array.isArray(parsed.header) && Array.isArray(parsed.content)) {
                return { photo: parsed.photo || '', ...parsed };
            }
        }
    } catch {
        // 数据损坏时忽略，使用默认数据
    }
    return initialResume;
}

export interface ResumeContextValue {
    state: ResumeData;
    dispatch: Dispatch<ResumeAction>;
}

export const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(resumeReducer, null, loadInitialState);

    // 每次 state 变化时持久化到 localStorage
    React.useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    return (
        <ResumeContext.Provider value={{ state, dispatch }}>
            {children}
        </ResumeContext.Provider>
    );
}
