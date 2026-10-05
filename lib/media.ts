/**
 * Разрешённые источники встроенного видео.
 * Если вставишь ссылку с другого сайта — она просто не покажется (защита от чужих iframe).
 * Эти же домены разрешены в Content-Security-Policy в next.config.ts.
 */
export const EMBED_HOSTS = [
  'www.youtube-nocookie.com',
  'www.youtube.com',
  'rutube.ru',
  'vk.com',
  'vkvideo.ru',
  'player.vimeo.com',
];

export function isAllowedEmbed(src: string): boolean {
  try {
    const url = new URL(src);
    return url.protocol === 'https:' && EMBED_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
}
