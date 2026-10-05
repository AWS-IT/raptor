'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const KEY = 'raptor-cookie-consent';
export type CookieChoice = 'all' | 'necessary';

/** Текущий выбор посетителя. Пригодится, когда подключишь аналитику (Яндекс Метрику и т.п.). */
export function getCookieChoice(): CookieChoice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'all' || v === 'necessary' ? v : null;
  } catch {
    return null;
  }
}

/** Плашка согласия на cookie. Можно открыть снова из подвала («Настройки cookie»). */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!getCookieChoice()) setVisible(true);
    }, 900);
    const reopen = () => setVisible(true);
    window.addEventListener('raptor:cookies', reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('raptor:cookies', reopen);
    };
  }, []);

  const choose = (choice: CookieChoice) => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* приватный режим — просто скрываем */
    }
    window.dispatchEvent(new CustomEvent('raptor:cookie-choice', { detail: choice }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie" role="dialog" aria-live="polite" aria-label="Согласие на использование cookie">
      <div className="cookie__text">
        <strong>Мы используем cookie</strong>
        <p>
          Они нужны, чтобы сайт работал корректно и становился удобнее. Подробнее — в{' '}
          <Link href="/privacy">политике конфиденциальности</Link>.
        </p>
      </div>
      <div className="cookie__actions">
        <button className="btn btn--ghost btn--sm" onClick={() => choose('necessary')}>
          Только необходимые
        </button>
        <button className="btn btn--accent btn--sm" onClick={() => choose('all')}>
          Принять
        </button>
      </div>
    </div>
  );
}

/** Кнопка в подвале, которая снова открывает плашку. */
export function CookieSettingsButton() {
  return (
    <button className="footer__link footer__btn" onClick={() => window.dispatchEvent(new Event('raptor:cookies'))}>
      Настройки cookie
    </button>
  );
}
