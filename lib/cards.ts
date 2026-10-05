import type { Project } from '@/types';
import type { CardProject } from '@/components/ProjectCard';
import { publicFileExists, toPublicSrc } from './assets';

/** Готовит проекты для карточек: проверяет на сервере, что обложки существуют. */
export function toCards(list: Project[]): CardProject[] {
  return list.map((p) => {
    const cover = toPublicSrc(p.cover);
    return { ...p, cover, coverOk: publicFileExists(cover) };
  });
}
