import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WebRaptor | Разработка веб-сайтов и приложений',
  description: 'Профессиональная разработка веб-сайтов и приложений. Современные технологии, качественный код, индивидуальный подход.',
  keywords: ['веб-разработка', 'создание сайтов', 'разработка приложений', 'Next.js', 'React', 'TypeScript'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
