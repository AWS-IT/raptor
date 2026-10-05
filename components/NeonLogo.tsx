import Image from 'next/image';

/**
 * Фирменный логотип Raptor с неоновым свечением.
 * size="hero" — большой логотип на первом экране (с анимацией «включения неона»),
 * size="sm" — маленький, для шапки и подвала.
 */
interface NeonLogoProps {
  size?: 'sm' | 'md' | 'hero';
  className?: string;
}

const px = { sm: 36, md: 96, hero: 320 } as const;

export default function NeonLogo({ size = 'hero', className = '' }: NeonLogoProps) {
  return (
    <span className={`logo logo--${size} ${className}`}>
      {size === 'hero' && <span className="logo__halo" aria-hidden />}
      <Image
        src="/images/reviews/raptorlogo.svg"
        alt="Raptor"
        width={px[size]}
        height={px[size]}
        className="logo__img"
        priority={size !== 'md'}
        unoptimized
      />
    </span>
  );
}
