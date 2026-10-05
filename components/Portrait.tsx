import Image from 'next/image';
import { profile } from '@/data/site';
import { publicFileExists, toPublicSrc } from '@/lib/assets';

/**
 * Фото автора в рамке со свечением.
 * Если файла profile.photo ещё нет — показывается аккуратная заглушка с подсказкой.
 */
export default function Portrait({ priority, large }: { priority?: boolean; large?: boolean }) {
  const photo = toPublicSrc(profile.photo);
  const hasPhoto = publicFileExists(photo);
  return (
    <figure className={`portrait ${large ? 'portrait--large' : ''}`}>
      <span className="portrait__corner portrait__corner--tl" aria-hidden />
      <span className="portrait__corner portrait__corner--br" aria-hidden />
      <div className="portrait__frame">
        {hasPhoto ? (
          <Image
            src={photo}
            alt={profile.name}
            fill
            sizes="(max-width: 900px) 80vw, 440px"
            className="portrait__img"
            priority={priority}
          />
        ) : (
          <div className="portrait__empty">
            <span className="portrait__initials">{initials(profile.name)}</span>
            <span className="portrait__hint">Фото: public{photo}</span>
          </div>
        )}
      </div>
      <figcaption className="portrait__caption">
        <span className="portrait__name">{profile.name}</span>
        <span className="portrait__role">{profile.role}</span>
      </figcaption>
    </figure>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);
}
