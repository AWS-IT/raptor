'use client';

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowIcon } from './Icons';

/**
 * Слайдер карточек. Основан на нативной прокрутке с «прилипанием»,
 * поэтому на телефоне листается пальцем, на компьютере — стрелками, колесом и тачпадом.
 */
export default function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [progress, setProgress] = useState(0);
  const count = Children.count(children);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [update, count]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.carousel__slide');
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const scrollable = canPrev || canNext;

  return (
    <div className="carousel" role="region" aria-roledescription="слайдер" aria-label={label}>
      <div className="carousel__track" ref={track} tabIndex={0}>
        {Children.map(children, (child, i) => (
          <div className="carousel__slide" key={i} role="group" aria-label={`${i + 1} из ${count}`}>
            {child}
          </div>
        ))}
      </div>

      {scrollable && (
        <div className="carousel__controls">
          <div className="carousel__bar" aria-hidden>
            <span style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
          </div>
          <div className="carousel__buttons">
            <button className="icon-btn" onClick={() => scrollBy(-1)} disabled={!canPrev} aria-label="Назад">
              <ArrowIcon dir="left" />
            </button>
            <button className="icon-btn" onClick={() => scrollBy(1)} disabled={!canNext} aria-label="Вперёд">
              <ArrowIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
