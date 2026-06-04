import { useContext } from 'react';
import { ResumeContext } from '../context/ResumeContext';
import type { ResumeContextValue } from '../context/ResumeContext';

export function useResume(): ResumeContextValue {
    const ctx = useContext(ResumeContext);
    if (!ctx) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return ctx;
}
