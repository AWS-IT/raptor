import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { divisions, getDivision } from '@/data/site';
import { getProjectsByDivision } from '@/data/projects';
import { toCards } from '@/lib/cards';
import DivisionView from '@/components/DivisionView';

/** Страница направления: /games, /web, /tools */

type Params = { params: Promise<{ division: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return divisions.map((d) => ({ division: d.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { division } = await params;
  const d = getDivision(division);
  if (!d) return {};
  return { title: d.name, description: d.description, alternates: { canonical: `/${d.id}` } };
}

export default async function DivisionPage({ params }: Params) {
  const { division } = await params;
  const d = getDivision(division);
  if (!d) notFound();
  return <DivisionView division={d} projects={toCards(getProjectsByDivision(d.id))} />;
}
