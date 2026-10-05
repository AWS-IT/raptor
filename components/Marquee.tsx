import { divisions } from '@/data/site';

/** Бегущая строка с направлениями между первым экраном и работами. */
export default function Marquee() {
  const items = [...divisions.map((d) => d.name), 'Игры · Приложения · Сайты'];
  const row = (
    <div className="marquee__row">
      {items.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <span className="marquee__star" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {row}
        {row}
      </div>
    </div>
  );
}
