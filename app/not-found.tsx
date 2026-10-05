import Link from 'next/link';
import NeonLogo from '@/components/NeonLogo';

export default function NotFound() {
  return (
    <div className="page container not-found">
      <NeonLogo size="md" />
      <p className="not-found__code">404</p>
      <h1 className="page-title">Страница не найдена</h1>
      <p className="section-lead">Возможно, она переехала или ещё в разработке.</p>
      <Link href="/" className="btn btn--accent btn--lg">
        На главную
      </Link>
    </div>
  );
}
