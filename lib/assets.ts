// Используется только в серверных компонентах (работает с файловой системой).
import fs from 'node:fs';
import path from 'node:path';

/**
 * Приводит путь к картинке к виду, который понимает Next.js:
 * "./images/a.jpg", "public/images/a.jpg", "images/a.jpg" → "/images/a.jpg".
 */
export function toPublicSrc(src?: string | null): string {
  if (!src) return '';
  const s = src.trim().replace(/\\/g, '/');
  if (/^https?:\/\//.test(s)) return s;
  return '/' + s.replace(/^\.?\/+/, '').replace(/^public\//, '');
}

/**
 * Проверяет, что файл реально лежит в папке public.
 * Нужен, чтобы вместо «битой» картинки показать красивую заглушку,
 * пока ты не добавил фото или обложку.
 */
export function publicFileExists(src?: string | null): boolean {
  if (!src) return false;
  const normalized = toPublicSrc(src);
  if (/^https?:\/\//.test(normalized)) return true;
  const clean = normalized.split('?')[0].replace(/^\/+/, '');
  if (clean.includes('..')) return false;
  try {
    return fs.statSync(path.join(process.cwd(), 'public', clean)).isFile();
  } catch {
    return false;
  }
}
