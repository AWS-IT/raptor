import type { CSSProperties } from 'react';
import Link from 'next/link';
import NeonLogo from './NeonLogo';
import { DivisionIcon } from './Icons';
import { divisions, site } from '@/data/site';

/** Первый экран: светящийся логотип, название, три направления и кнопки. */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <NeonLogo size="hero" className="hero__logo" />

        <h1 id="hero-title" className="hero__title">
          <span className="hero__title-word">RAPTOR</span>
        </h1>
        <p className="hero__lead">{site.tagline}</p>

        <ul className="hero__chips" aria-label="Направления студии">
          {divisions.map((d, i) => (
            <li key={d.id} style={{ '--i': i } as CSSProperties}>
              <Link href={`/${d.id}`} className="chip">
                <DivisionIcon id={d.id} size={16} />
                {d.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hero__actions">
          <Link href="/#studio" className="btn btn--accent btn--lg">
            Смотреть работы
          </Link>
          <Link href="/#contact" className="btn btn--ghost btn--lg">
            Обсудить проект
          </Link>
        </div>
      </div>

      <a href="#studio" className="hero__scroll" aria-label="Прокрутить вниз">
        <span />
      </a>
    </section>
  );
}
