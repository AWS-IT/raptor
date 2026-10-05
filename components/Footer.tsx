import Link from 'next/link';
import NeonLogo from './NeonLogo';
import { CookieSettingsButton } from './CookieBanner';
import { contacts, divisions, site } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link href="/" className="header__brand" aria-label="Raptor — на главную">
            <NeonLogo size="sm" />
            <span className="header__wordmark">RAPTOR</span>
          </Link>
          <p className="footer__tag">{site.tagline}</p>
        </div>

        <nav className="footer__col" aria-label="Направления">
          <span className="footer__heading">Направления</span>
          {divisions.map((d) => (
            <Link key={d.id} href={`/${d.id}`} className="footer__link">
              {d.name}
            </Link>
          ))}
        </nav>

        <nav className="footer__col" aria-label="Студия">
          <span className="footer__heading">Студия</span>
          <Link href="/about" className="footer__link">
            Обо мне
          </Link>
          <Link href="/#contact" className="footer__link">
            Оставить заявку
          </Link>
          <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="footer__link">
            Telegram
          </a>
        </nav>

        <nav className="footer__col" aria-label="Документы">
          <span className="footer__heading">Документы</span>
          <Link href="/privacy" className="footer__link">
            Политика конфиденциальности
          </Link>
          <CookieSettingsButton />
        </nav>
      </div>
      <div className="container">
        <div className="footer__bottom">
          <span>© {year} Raptor. Все права защищены.</span>
          <span className="footer__made">Сделано в Raptor Web</span>
        </div>
      </div>
    </footer>
  );
}
