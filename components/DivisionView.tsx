import Link from 'next/link';
import type { DivisionInfo } from '@/data/site';
import { divisions } from '@/data/site';
import ProjectCard, { NextSlotCard, type CardProject } from './ProjectCard';
import Reveal from './Reveal';
import { DivisionIcon, ArrowIcon } from './Icons';

/** Содержимое страницы направления (/games, /web, /tools). */
export default function DivisionView({ division: d, projects }: { division: DivisionInfo; projects: CardProject[] }) {
  return (
    <div className={`page division-page division-page--${d.id}`}>
      <section className="page-hero container">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Raptor</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{d.name}</span>
        </nav>
        <Reveal className="division-hero">
          <span className={`division-hero__icon division-hero__icon--${d.id}`}>
            <DivisionIcon id={d.id} size={40} />
          </span>
          <div>
            <h1 className="page-title">{d.name}</h1>
            <p className="section-lead">{d.description}</p>
            <ul className="division-hero__offer">
              {d.offer.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <nav className="division-switch" aria-label="Другие направления">
          {divisions.map((x) => (
            <Link
              key={x.id}
              href={`/${x.id}`}
              className={`chip ${x.id === d.id ? 'chip--active' : ''}`}
              aria-current={x.id === d.id ? 'page' : undefined}
            >
              <DivisionIcon id={x.id} size={16} />
              {x.name}
            </Link>
          ))}
        </nav>
      </section>

      <section className="container section section--tight" aria-label={`Проекты ${d.name}`}>
        <div className="grid-cards">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard project={p} priority={i < 2} />
            </Reveal>
          ))}
          <Reveal delay={projects.length * 80}>
            <NextSlotCard division={d.id} />
          </Reveal>
        </div>

        <Reveal className="cta-band">
          <div>
            <h2 className="cta-band__title">Нужен похожий проект?</h2>
            <p>Расскажите о задаче — предложу решение, сроки и стоимость.</p>
          </div>
          <Link href="/#contact" className="btn btn--accent btn--lg">
            Оставить заявку <ArrowIcon size={18} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
