import Link from 'next/link';
import Reveal from './Reveal';
import Portrait from './Portrait';
import { ArrowIcon } from './Icons';
import { profile } from '@/data/site';

/** Секция «Обо мне» на главной: текст слева, фото справа, кнопка «Узнать больше». */
export default function About() {
  return (
    <section id="about" className="section section--about" aria-labelledby="about-title">
      <div className="container about">
        <Reveal className="about__text">
          <span className="eyebrow">Обо мне</span>
          <h2 id="about-title" className="section-title">
            Человек за <span className="text-accent">Raptor</span>
          </h2>
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

          <Link href="/about" className="btn btn--ghost btn--lg about__more">
            Узнать обо мне больше
            <ArrowIcon size={18} />
          </Link>
        </Reveal>

        <Reveal className="about__photo" delay={150}>
          <Portrait />
        </Reveal>
      </div>
    </section>
  );
}
