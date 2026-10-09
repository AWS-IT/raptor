'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NeonLogo from './NeonLogo';
import { DivisionIcon } from './Icons';
import { divisions } from '@/data/site';

/** Шапка сайта: логотип, направления, «Обо мне», кнопка связи. На телефоне — выезжающее меню. */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Закрываем меню при переходе и блокируем прокрутку под ним
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Если окно расширили до компьютерной ширины — закрываем мобильное меню
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}>
      <div className="header__inner container">
        <Link href="/" className="header__brand" aria-label="Raptor — на главную">
          <NeonLogo size="sm" />
          <span className="header__wordmark">RAPTOR</span>
        </Link>

        <nav className="header__nav" aria-label="Основная навигация">
          {divisions.map((d) => (
            <Link
              key={d.id}
              href={`/${d.id}`}
              className={`header__link ${isActive(`/${d.id}`) ? 'is-active' : ''}`}
            >
              <DivisionIcon id={d.id} size={16} />
              {d.short}
            </Link>
          ))}
          <Link href="/about" className={`header__link ${isActive('/about') ? 'is-active' : ''}`}>
            Обо мне
          </Link>
        </nav>

        <Link href="/#contact" className="btn btn--accent btn--sm header__cta">
          Связаться
        </Link>

        <button
          className="header__burger"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

    </header>

    {/* Меню вынесено из <header>: размытие шапки (backdrop-filter) иначе «запирает» его внутри полоски 72px */}
    <div id="mobile-menu" className="mobile-menu" hidden={!open}>
      <nav className="mobile-menu__nav" aria-label="Мобильная навигация">
        {divisions.map((d, i) => (
          <Link
            key={d.id}
            href={`/${d.id}`}
            className="mobile-menu__link"
            style={{ '--i': i } as CSSProperties}
            onClick={() => setOpen(false)}
          >
            <span className="mobile-menu__icon">
              <DivisionIcon id={d.id} size={22} />
            </span>
            <span>
              <span className="mobile-menu__name">{d.name}</span>
              <span className="mobile-menu__sub">{d.short}</span>
            </span>
          </Link>
        ))}
        <Link href="/about" className="mobile-menu__link" style={{ '--i': 3 } as CSSProperties} onClick={() => setOpen(false)}>
          <span className="mobile-menu__name">Обо мне</span>
        </Link>
        <Link href="/#contact" className="btn btn--accent btn--lg mobile-menu__cta" onClick={() => setOpen(false)}>
          Оставить заявку
        </Link>
      </nav>
    </div>
    </>
  );
}
