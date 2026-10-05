import Reveal from './Reveal';
import StudioTabs from './StudioTabs';
import { divisions } from '@/data/site';
import { getProjectsByDivision } from '@/data/projects';
import { toCards } from '@/lib/cards';

/** Секция «Направления» на главной — вместо старого общего портфолио. */
export default function Projects() {
  const groups = divisions.map((division) => ({
    division,
    projects: toCards(getProjectsByDivision(division.id)),
  }));

  return (
    <section id="studio" className="section" aria-labelledby="studio-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Работы</span>
          <h2 id="studio-title" className="section-title">
            Три направления. <span className="text-dim">Одна студия.</span>
          </h2>
          <p className="section-lead">
            Выберите направление, чтобы посмотреть проекты. Каждый проект открывается на отдельной странице со скриншотами,
            видео и подробностями.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <StudioTabs groups={groups} />
        </Reveal>
      </div>
    </section>
  );
}
