import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, getProjectsByDivision, projects } from '@/data/projects';
import { getDivision } from '@/data/site';
import { publicFileExists, toPublicSrc } from '@/lib/assets';
import { isAllowedEmbed } from '@/lib/media';
import { toCards } from '@/lib/cards';
import ProjectView from '@/components/ProjectView';
import type { MediaItem } from '@/types';

/** Страница проекта в стиле Steam: /<направление>/<проект> */

type Params = { params: Promise<{ division: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ division: p.division, slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { division, slug } = await params;
  const p = getProject(division, slug);
  if (!p) return {};
  const cover = publicFileExists(p.cover) ? toPublicSrc(p.cover) : undefined;
  return {
    title: p.title,
    description: p.tagline,
    alternates: { canonical: `/${p.division}/${p.slug}` },
    openGraph: { title: p.title, description: p.tagline, images: cover ? [cover] : undefined },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { division, slug } = await params;
  const project = getProject(division, slug);
  const d = getDivision(division);
  if (!project || !d) notFound();

  // Показываем только существующие файлы и разрешённые плееры
  const gallery: MediaItem[] = (project.gallery ?? []).map(normalizeMedia).filter((m) =>
    m.type === 'embed' ? isAllowedEmbed(m.src) : publicFileExists(m.src),
  );
  const [card] = toCards([project]);
  const related = toCards(getProjectsByDivision(project.division).filter((p) => p.slug !== project.slug));

  return <ProjectView project={card} division={d} gallery={gallery} related={related} />;
}

/** Приводит пути в галерее к виду "/images/..." */
function normalizeMedia(m: MediaItem): MediaItem {
  if (m.type === 'image') return { ...m, src: toPublicSrc(m.src) };
  if (m.type === 'video') return { ...m, src: toPublicSrc(m.src), poster: m.poster ? toPublicSrc(m.poster) : undefined };
  return { ...m, poster: m.poster ? toPublicSrc(m.poster) : undefined };
}
