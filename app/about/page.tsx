import type { Metadata } from 'next';
import Link from 'next/link';
import Portrait from '@/components/Portrait';
import Reveal from '@/components/Reveal';
import { ArrowIcon } from '@/components/Icons';
import { profile, socials } from '@/data/site';

export const metadata: Metadata = {
  title: 'Обо мне',
  description: `${profile.name} — ${profile.role}. История, подход к работе и ссылки.`,
  alternates: { canonical: '/about' },
};

/** Подробная страница «Обо мне». Тексты редактируются в data/site.ts → profile.long */
export default function AboutPage() {
  const links = socials.filter((s) => s.href);
  return (
    <div className="page about-page">
      <section className="container page-hero">
        <nav className="crumbs" aria-label="Хлебные крошки">
          <Link href="/">Raptor</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">Обо мне</span>
        </nav>

        <div className="about about--page">
          <Reveal className="about__text">
            <span className="eyebrow">Обо мне</span>
            <h1 className="page-title">{profile.name}</h1>
            <p className="section-lead">{profile.role}</p>
            {profile.short.map((p, i) => (
              <p key={i} className="about__p">
                {p}
              </p>
            ))}
            <dl className="stats">
              {profile.stats.map((s) => (
                <div key={s.label} className="stats__item">
                  <dt className="stats__value">{s.value}</dt>
                  <dd className="stats__label">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="about__photo" delay={150}>
            <Portrait priority large />
          </Reveal>
        </div>
      </section>

      <section className="container section section--tight">
        <ol className="story">
          {profile.long.map((block, i) => (
            <Reveal as="li" key={block.title} className="story__item" delay={i * 80}>
              <span className="story__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="block-title">{block.title}</h2>
                {block.text.map((t, j) => (
                  <p key={j}>{t}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container section section--tight about-page__grid">
        <Reveal className="panel">
          <h2 className="block-subtitle">Навыки</h2>
          <ul className="tags">
            {profile.skills.map((s) => (
              <li key={s} className="tag tag--solid">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="panel" delay={100}>
          <h2 className="block-subtitle">Где меня найти</h2>
          <ul className="social-list">
            {links.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="social-link">
                  <span>
                    <strong>{s.label}</strong>
                    {s.note && <span>{s.note}</span>}
                  </span>
                  <ArrowIcon dir="up-right" size={18} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="container section section--tight">
        <Reveal className="cta-band">
          <div>
            <h2 className="cta-band__title">Давайте работать вместе</h2>
            <p>Игра, приложение или сайт — напишите, обсудим.</p>
          </div>
          <Link href="/#contact" className="btn btn--accent btn--lg">
            Оставить заявку <ArrowIcon size={18} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
