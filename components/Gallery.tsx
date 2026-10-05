'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import type { MediaItem } from '@/types';
import Modal from './Modal';
import { ArrowIcon, ExpandIcon, PlayIcon } from './Icons';

/**
 * Галерея в стиле страницы игры в Steam: большой экран + лента миниатюр.
 * Поддерживает картинки, видео-файлы и встроенные плееры (RuTube, YouTube, VK).
 * Листается свайпом, стрелками клавиатуры и кнопками; картинку можно открыть на весь экран.
 */
export default function Gallery({ items, title }: { items: MediaItem[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const thumbs = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const count = items.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  // Держим активную миниатюру в зоне видимости
  useEffect(() => {
    const el = thumbs.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [index]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, go]);

  if (count === 0) return null;
  const item = items[index];

  const swipe = {
    onTouchStart: (e: TouchEvent) => (touchX.current = e.touches[0].clientX),
    onTouchEnd: (e: TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      touchX.current = null;
    },
  };

  return (
    <div className="gallery">
      <div
        className="gallery__stage"
        {...swipe}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
        tabIndex={0}
        aria-roledescription="галерея"
        aria-label={`${title}: ${index + 1} из ${count}`}
      >
        <Slide key={index} item={item} title={title} index={index} />

        {item.type === 'image' && (
          <button className="icon-btn gallery__expand" onClick={() => setLightbox(true)} aria-label="Открыть на весь экран">
            <ExpandIcon />
          </button>
        )}
        {count > 1 && (
          <>
            <button className="icon-btn gallery__nav gallery__nav--prev" onClick={() => go(-1)} aria-label="Предыдущий">
              <ArrowIcon dir="left" />
            </button>
            <button className="icon-btn gallery__nav gallery__nav--next" onClick={() => go(1)} aria-label="Следующий">
              <ArrowIcon />
            </button>
            <span className="gallery__counter">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="gallery__thumbs" ref={thumbs}>
          {items.map((m, i) => (
            <button
              key={i}
              className={`gallery__thumb ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Показать ${i + 1}`}
              aria-current={i === index}
            >
              {m.type === 'image' ? (
                <Image src={m.src} alt="" fill sizes="140px" className="gallery__thumb-img" />
              ) : m.poster ? (
                <Image src={m.poster} alt="" fill sizes="140px" className="gallery__thumb-img" />
              ) : (
                <span className="gallery__thumb-video" />
              )}
              {m.type !== 'image' && (
                <span className="gallery__thumb-play">
                  <PlayIcon size={16} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <Modal open={lightbox} onClose={() => setLightbox(false)} label={`${title} — просмотр`}>
        <div className="lightbox" {...swipe}>
          {item.type === 'image' && (
            <Image src={item.src} alt={item.alt || title} fill sizes="100vw" className="lightbox__img" />
          )}
          {count > 1 && (
            <>
              <button className="icon-btn gallery__nav gallery__nav--prev" onClick={() => go(-1)} aria-label="Предыдущий">
                <ArrowIcon dir="left" />
              </button>
              <button className="icon-btn gallery__nav gallery__nav--next" onClick={() => go(1)} aria-label="Следующий">
                <ArrowIcon />
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

/** Один слайд. Встроенный плеер загружается только после нажатия — так страница быстрее и без лишних трекеров. */
function Slide({ item, title, index }: { item: MediaItem; title: string; index: number }) {
  const [play, setPlay] = useState(false);

  if (item.type === 'image') {
    return (
      <Image
        src={item.src}
        alt={item.alt || `${title} — изображение ${index + 1}`}
        fill
        sizes="(max-width: 1000px) 100vw, 760px"
        className="gallery__img"
        priority={index === 0}
      />
    );
  }

  if (item.type === 'video') {
    return (
      <video className="gallery__video" src={item.src} poster={item.poster} controls preload="metadata" playsInline>
        Ваш браузер не поддерживает видео.
      </video>
    );
  }

  if (!play) {
    return (
      <button className="gallery__facade" onClick={() => setPlay(true)} aria-label="Смотреть видео">
        {item.poster && <Image src={item.poster} alt="" fill sizes="760px" className="gallery__img" />}
        <span className="gallery__play">
          <PlayIcon size={28} />
        </span>
      </button>
    );
  }

  return (
    <iframe
      className="gallery__iframe"
      src={item.src}
      title={item.alt || `${title} — видео`}
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
