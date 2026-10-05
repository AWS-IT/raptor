'use client';

import Link from 'next/link';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { DivisionInfo } from '@/data/site';
import Carousel from './Carousel';
import ProjectCard, { NextSlotCard, type CardProject } from './ProjectCard';
import { DivisionIcon, ArrowIcon } from './Icons';

export interface StudioGroup {
  division: DivisionInfo;
  projects: CardProject[];
}

/** Вкладки направлений на главной: Raptor Games / Web / Tools + слайдер работ. */
export default function StudioTabs({ groups, initial = 'web' }: { groups: StudioGroup[]; initial?: string }) {
  // Какая вкладка открыта сразу. Поменяй initial на 'games', когда выйдет игра.
  const [active, setActive] = useState(() => Math.max(0, groups.findIndex((g) => g.division.id === initial)));
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = groups[active];

  // Управление стрелками клавиатуры — как у настоящих вкладок
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : -1) + groups.length) % groups.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="studio">
      <div className="studio__tabs" role="tablist" aria-label="Направления Raptor" onKeyDown={onKeyDown}>
        {groups.map((g, i) => {
          const selected = i === active;
          return (
            <button
              key={g.division.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`studio-tab studio-tab--${g.division.id} ${selected ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="studio-tab__icon">
                <DivisionIcon id={g.division.id} size={26} />
              </span>
              <span className="studio-tab__text">
                <span className="studio-tab__name">{g.division.name}</span>
                <span className="studio-tab__meta">
                  {g.division.short} · {g.projects.length} {plural(g.projects.length)}
                </span>
              </span>
              <span className="studio-tab__glow" aria-hidden />
            </button>
          );
        })}
      </div>

      <div
        key={group.division.id}
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        className={`studio__panel studio__panel--${group.division.id}`}
      >
        <div className="studio__intro">
          <p className="studio__desc">{group.division.description}</p>
          <Link href={`/${group.division.id}`} className="link-arrow">
            Весь раздел {group.division.name}
            <ArrowIcon size={16} />
          </Link>
        </div>

        <Carousel label={`Работы ${group.division.name}`}>
          {[
            ...group.projects.map((p, i) => <ProjectCard key={p.slug} project={p} priority={i === 0} />),
            <NextSlotCard key="slot" division={group.division.id} />,
          ]}
        </Carousel>
      </div>
    </div>
  );
}

function plural(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return 'проект';
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'проекта';
  return 'проектов';
}
