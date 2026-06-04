import type { ResumeTemplate } from './types';

const registry: Map<string, ResumeTemplate> = new Map();

export function registerTemplate(template: ResumeTemplate): void {
    registry.set(template.id, template);
}

export function getTemplate(id: string): ResumeTemplate | undefined {
    return registry.get(id);
}

export function getAllTemplates(): ResumeTemplate[] {
    return Array.from(registry.values());
}
