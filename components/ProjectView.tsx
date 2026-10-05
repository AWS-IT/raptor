import Link from 'next/link';
import Image from 'next/image';
import type { MediaItem } from '@/types';
import type { DivisionInfo } from '@/data/site';
import { formatPrice } from '@/data/projects';
import ProjectCard, { ProjectCover, StatusBadge, type CardProject } from './ProjectCard';
import Gallery from './Gallery';
import NotifyForm from './NotifyForm';
import Reveal from './Reveal';
import { ArrowIcon, CheckIcon, DivisionIcon } from './Icons';

/** Содержимое страницы проекта — в духе страницы игры в Steam, но в стиле Raptor. */
export default function ProjectView({
  project: p,
  division: d,
  gallery,
  related,
}: {
  project: CardProject;
  division: DivisionInfo;
  gallery: MediaItem[];
  related: CardProject[];
}) {
  const released = p.status === 'released';
  const canBuy = released && p.commerce?.price != null && !!p.commerce.buyUrl;

  const meta: { label: string; value?: string }[] = [
    { label: 'Направление', value: d.name },
    { label: 'Тип', value: p.genre },
    { label: 'Платформы', value: p.platforms?.join(', ') },
    { label: 'Выход', value: p.releaseDate },
  ];

  return (
    <article className={`page project project--${p.division}`}>
      {/* Размытая обложка на фоне шапки */}
      {p.coverOk && p.cover && (
        <div className="project__backdrop" aria-hidden>
          <Image src={p.cover} alt="" fill sizes="100vw" className="project__backdrop-img" />
        </div>
      )}

      <div className="container">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Raptor</Link>
          <span aria-hidden>/</span>
          <Link href={`/${d.id}`}>{d.name}</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{p.title}</span>
        </nav>

        <header className="project__head">
          <div>
            <h1 className="page-title project__title">{p.title}</h1>
            <p className="project__tagline">{p.tagline}</p>
          </div>
          <StatusBadge status={p.status} />
        </header>

        <div className="project__top">
          <div className="project__media">
            {gallery.length > 0 ? (
              <Gallery items={gallery} title={p.title} />
            ) : (
              <div className="gallery__stage gallery__stage--static">
                <ProjectCover project={p} sizes="(max-width: 1000px) 100vw, 760px" priority />
              </div>
            )}
          </div>

          <aside className="project__aside panel">
            <div className="project__capsule">
              <ProjectCover project={p} sizes="380px" />
            </div>
            <p className="project__summary">{p.summary ?? p.description[0]}</p>

            <dl className="meta">
              {meta
                .filter((m) => m.value)
                .map((m) => (
                  <div key={m.label} className="meta__row">
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
            </dl>

            {p.tags && p.tags.length > 0 && (
              <ul className="tags">
                {p.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            )}

            <div className="project__actions">
              {canBuy && p.commerce && (
                <a href={p.commerce.buyUrl!} className="buy" target="_blank" rel="noopener noreferrer">
                  <span className="buy__price">{formatPrice(p.commerce.price!, p.commerce.currency)}</span>
                  <span className="buy__label">Купить</span>
                </a>
              )}
              {p.links?.site && (
                <a href={p.links.site} target="_blank" rel="noopener noreferrer" className="btn btn--accent btn--block">
                  Открыть сайт <ArrowIcon dir="up-right" size={16} />
                </a>
              )}
              {p.links?.download && (
                <a href={p.links.download} target="_blank" rel="noopener noreferrer" className="btn btn--accent btn--block">
                  Скачать <ArrowIcon dir="up-right" size={16} />
                </a>
              )}
              {p.links?.github && (
                <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--block">
                  GitHub <ArrowIcon dir="up-right" size={16} />
                </a>
              )}
              {!released && <NotifyForm project={p.slug} title={p.title} />}
            </div>
          </aside>
        </div>

        <div className="project__body">
          <Reveal className="project__about">
            <h2 className="block-title">Об этом проекте</h2>
            {p.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {p.features && p.features.length > 0 && (
              <>
                <h3 className="block-subtitle">Особенности</h3>
                <ul className="features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <CheckIcon size={18} />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>

          <Reveal className="project__side" delay={120}>
            {p.stack && p.stack.length > 0 && (
              <div className="panel">
                <h3 className="block-subtitle">Технологии</h3>
                <ul className="tags">
                  {p.stack.map((s) => (
                    <li key={s} className="tag tag--solid">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.review && (
              <figure className="review panel">
                <blockquote>«{p.review.text}»</blockquote>
                <figcaption>
                  {p.review.companyLogo && (
                    <Image src={p.review.companyLogo} alt="" width={40} height={40} className="review__logo" />
                  )}
                  <span>
                    <strong>{p.review.authorName}</strong>
                    <span>{p.review.authorPosition}</span>
                  </span>
                </figcaption>
              </figure>
            )}

            <div className="panel panel--accent">
              <h3 className="block-subtitle">{d.id === 'games' ? 'Есть идея игры?' : 'Хотите такой же?'}</h3>
              <p>Расскажите о задаче — предложу решение под ваш бюджет.</p>
              <Link href="/#contact" className="btn btn--accent btn--block">
                Обсудить проект
              </Link>
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <section className="related" aria-labelledby="related-title">
            <div className="related__head">
              <h2 id="related-title" className="block-title">
                <DivisionIcon id={d.id} size={22} /> Ещё в {d.name}
              </h2>
              <Link href={`/${d.id}`} className="link-arrow">
                Весь раздел <ArrowIcon size={16} />
              </Link>
            </div>
            <div className="grid-cards">
              {related.slice(0, 3).map((r) => (
                <ProjectCard key={r.slug} project={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
