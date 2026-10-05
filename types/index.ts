/**
 * Типы данных сайта Raptor.
 * Все работы описываются в data/projects.json — эти типы описывают его формат.
 */

/** Направления студии. Совпадают с адресами страниц: /games, /web, /tools */
export type DivisionId = 'games' | 'web' | 'tools';

/** Статус проекта */
export type ProjectStatus =
  | 'released' // Опубликован
  | 'in-development' // В разработке
  | 'coming-soon'; // Скоро

/** Элемент галереи на странице проекта */
export type MediaItem =
  | { type: 'image'; src: string; alt?: string }
  /** Видео-файл из папки public, например /videos/trailer.mp4 */
  | { type: 'video'; src: string; poster?: string; alt?: string }
  /**
   * Встроенное видео: ссылка на плеер YouTube / RuTube / VK Видео.
   * Пример RuTube: https://rutube.ru/play/embed/<id>
   * Пример YouTube: https://www.youtube-nocookie.com/embed/<id>
   */
  | { type: 'embed'; src: string; poster?: string; alt?: string };

export interface Review {
  companyLogo?: string;
  text: string;
  authorName: string;
  authorPosition: string;
}

/**
 * Задел под продажи. Пока price = null — блок покупки не показывается.
 * Когда появится оплата: укажи цену и ссылку на оплату — кнопка «Купить» появится сама.
 */
export interface Commerce {
  price: number | null;
  currency: 'RUB' | 'USD' | 'EUR';
  buyUrl: string | null;
}

export interface ProjectLinks {
  site?: string;
  github?: string;
  /** Ссылка на магазин приложений / страницу загрузки */
  download?: string;
}

export interface Project {
  /** Уникальный адрес проекта: /<division>/<slug> */
  slug: string;
  division: DivisionId;
  title: string;
  /** Короткая строка под названием (для карточки) */
  tagline: string;
  /** Короткое описание (2–3 строки) для блока справа от галереи */
  summary?: string;
  /** Подробное описание — каждый элемент массива = отдельный абзац */
  description: string[];
  /** Ключевые особенности (список на странице проекта) */
  features?: string[];
  /** Обложка карточки. Если файла нет — нарисуется фирменная заглушка */
  cover?: string;
  gallery?: MediaItem[];
  tags?: string[];
  stack?: string[];
  platforms?: string[];
  /** Тип проекта: «Интернет-магазин», «Экшен», «Мобильное приложение» … */
  genre?: string;
  status: ProjectStatus;
  /** Свободный текст: «2025», «Весна 2027», «Скоро» */
  releaseDate?: string;
  links?: ProjectLinks;
  commerce?: Commerce;
  review?: Review | null;
  /** Порядок вывода внутри раздела (меньше — выше) */
  order?: number;
  /** true — проект скрыт с сайта (черновик) */
  hidden?: boolean;
}

export interface ProjectsFile {
  projects: Project[];
}

/** Данные формы заявки */
export interface LeadPayload {
  kind: 'lead' | 'notify';
  name?: string;
  contact: string;
  service?: string;
  message?: string;
  project?: string;
  consent: boolean;
  /** Ловушка для ботов — у людей всегда пустая */
  website?: string;
}
