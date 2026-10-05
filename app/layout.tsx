import type { Metadata, Viewport } from 'next';
import { Manrope, Unbounded } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveBackground from '@/components/LiveBackground';
import CookieBanner from '@/components/CookieBanner';
import { site } from '@/data/site';

/**
 * Шрифты подключаются через next/font: файлы скачиваются при сборке и отдаются
 * с нашего сервера — без запросов к Google у посетителей. Оба шрифта с кириллицей.
 */
const display = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const body = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: ['Raptor', 'разработка игр', 'разработка приложений', 'создание сайтов', 'веб-студия', 'портфолио'],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#070707',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>
        <LiveBackground />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
