import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';
import { DivisionIcon, ArrowIcon } from './Icons';
import { statusLabel } from '@/data/projects';
import { getDivision } from '@/data/site';

/** Проект + признак того, что файл обложки существует (проверяется на сервере). */
export type CardProject = Project & { coverOk: boolean };

/** Обложка проекта. Если картинки ещё нет — фирменная заглушка с иконкой раздела. */
export function ProjectCover({
  project,
  sizes,
  priority,
}: {
  project: CardProject;
  sizes: string;
  priority?: boolean;
}) {
  if (project.coverOk && project.cover) {
    return (
      <Image
        src={project.cover}
        alt={project.title}
        fill
        sizes={sizes}
        className="cover__img"
        priority={priority}
      />
    );
  }
  const division = getDivision(project.division);
  return (
    <div className={`cover-placeholder cover-placeholder--${project.division}`}>
      <span className="cover-placeholder__rings" aria-hidden />
      <DivisionIcon id={project.division} size={56} className="cover-placeholder__icon" />
      <span className="cover-placeholder__label">{division?.name}</span>
    </div>
  );
}

export function StatusBadge({ status }: { status: Project['status'] }) {
  return <span className={`badge badge--${status}`}>{statusLabel[status]}</span>;
}

/** Карточка проекта: ведёт на отдельную страницу проекта. */
export default function ProjectCard({ project, priority }: { project: CardProject; priority?: boolean }) {
  const href = `/${project.division}/${project.slug}`;
  return (
    <article className={`card card--${project.division}`}>
      <Link href={href} className="card__link" aria-label={`${project.title} — открыть страницу проекта`}>
        <div className="card__media">
          <ProjectCover project={project} sizes="(max-width: 640px) 85vw, 400px" priority={priority} />
          <div className="card__shade" />
          <StatusBadge status={project.status} />
        </div>
        <div className="card__body">
          <div className="card__head">
            <h3 className="card__title">{project.title}</h3>
            <span className="card__arrow" aria-hidden>
              <ArrowIcon dir="up-right" size={18} />
            </span>
          </div>
          <p className="card__tagline">{project.tagline}</p>
          {project.tags && project.tags.length > 0 && (
            <ul className="tags" aria-label="Теги">
              {project.tags.slice(0, 3).map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </article>
  );
}

/** Карточка-заглушка «Следующий проект в работе» в конце каждого раздела. */
export function NextSlotCard({ division }: { division: Project['division'] }) {
  const d = getDivision(division);
  return (
    <article className="card card--slot">
      <Link href="/#contact" className="card__link">
        <div className="card__media card__media--slot">
          <span className="slot__plus" aria-hidden>
            +
          </span>
        </div>
        <div className="card__body">
          <h3 className="card__title">Следующий проект</h3>
          <p className="card__tagline">
            {d?.name} растёт. Хотите, чтобы следующим был ваш проект? Напишите.
          </p>
        </div>
      </Link>
    </article>
  );
}
