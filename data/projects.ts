import type { DivisionId, Project, ProjectsFile, ProjectStatus } from '@/types';
import raw from './projects.json';

/**
 * Работа с данными проектов.
 * Сами проекты редактируются в data/projects.json — этот файл только читает их.
 */

const data = raw as unknown as ProjectsFile;

const byOrder = (a: Project, b: Project) => (a.order ?? 99) - (b.order ?? 99);

/** Все видимые проекты */
export const projects: Project[] = data.projects.filter((p) => !p.hidden).sort(byOrder);

export function getProjectsByDivision(division: DivisionId): Project[] {
  return projects.filter((p) => p.division === division);
}

export function getProject(division: string, slug: string): Project | undefined {
  return projects.find((p) => p.division === division && p.slug === slug);
}

export const statusLabel: Record<ProjectStatus, string> = {
  released: 'Опубликован',
  'in-development': 'В разработке',
  'coming-soon': 'Скоро',
};

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price);
}
