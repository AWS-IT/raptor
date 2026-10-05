import { NextRequest, NextResponse } from 'next/server';
import https from 'node:https';
import type { Agent } from 'node:http';
import { site } from '@/data/site';

/**
 * Приём заявок с сайта и отправка их в Telegram.
 *
 * Переменные окружения (файл .env на сервере, в код их НЕ вписывать):
 *   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
 *   TELEGRAM_CHAT_ID   — куда присылать заявки
 *   PROXY_HOST / PROXY_PORT — необязательно, если Telegram недоступен с сервера напрямую
 *
 * Защита: проверка источника запроса, ограничение частоты, лимиты длины,
 * ловушка для ботов, обязательное согласие на обработку данных.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY = 10_000; // байт
const RATE_LIMIT = 5; // заявок
const RATE_WINDOW = 10 * 60 * 1000; // за 10 минут с одного IP

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  // Чистим память, чтобы карта не росла бесконечно
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= RATE_WINDOW)) hits.delete(key);
  }
  return recent.length > RATE_LIMIT;
}

/** Обрезает строку и убирает управляющие символы */
function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

/** Запросы принимаются только с нашего же сайта */
function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host;
    const allowed = [req.headers.get('x-forwarded-host'), req.headers.get('host'), new URL(site.url).host];
    return allowed.some((h) => h && (h === originHost || h === `www.${originHost}` || `www.${h}` === originHost));
  } catch {
    return false;
  }
}

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return fail('Запрос отклонён', 403);

  const length = Number(req.headers.get('content-length') || 0);
  if (length > MAX_BODY) return fail('Слишком большой запрос', 413);

  if (rateLimited(getIp(req))) {
    return fail('Слишком много заявок. Попробуйте через несколько минут или напишите в Telegram.', 429);
  }

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) return fail('Слишком большой запрос', 413);
    body = JSON.parse(text);
    if (!body || typeof body !== 'object') throw new Error();
  } catch {
    return fail('Неверный формат данных', 400);
  }

  // Ловушка: поле видят только боты. Делаем вид, что всё хорошо.
  if (clean(body.website, 200)) return NextResponse.json({ success: true });

  const kind = body.kind === 'notify' ? 'notify' : 'lead';
  const name = clean(body.name, 80);
  const contact = clean(body.contact, 120);
  const service = clean(body.service, 40);
  const message = clean(body.message, 2000);
  const project = clean(body.project, 120);

  if (body.consent !== true) return fail('Нужно согласие на обработку персональных данных', 400);
  if (contact.length < 3) return fail('Укажите, как с вами связаться', 400);
  if (kind === 'lead' && name.length < 2) return fail('Укажите имя', 400);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  // Запасной ID чата — из прежней версии сайта
  const chatId = process.env.TELEGRAM_CHAT_ID || '8033066008';
  if (!token) {
    console.error('[lead] TELEGRAM_BOT_TOKEN не задан в .env');
    return fail('Форма временно не работает. Напишите, пожалуйста, в Telegram.', 503);
  }

  const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  const lines =
    kind === 'notify'
      ? ['🔔 Подписка на выход проекта', '', `📦 Проект: ${project || '—'}`, `📬 Контакт: ${contact}`]
      : [
          '📩 Новая заявка с сайта Raptor',
          '',
          `👤 Имя: ${name}`,
          `📱 Контакт: ${contact}`,
          service ? `🧩 Услуга: ${service}` : '',
          message ? `💬 Сообщение:\n${message}` : '',
        ];
  const text = [...lines.filter(Boolean), '', `📅 ${time}`].join('\n');

  try {
    const result = await sendTelegram(token, chatId, text);
    if (!result.ok) {
      console.error('[lead] Telegram API error:', result.description);
      return fail('Не удалось отправить заявку. Напишите, пожалуйста, в Telegram.', 502);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[lead] Network error:', error);
    return fail('Не удалось отправить заявку. Напишите, пожалуйста, в Telegram.', 502);
  }
}

export function GET() {
  return fail('Method Not Allowed', 405);
}

/** Отправка сообщения боту. Сообщение уходит обычным текстом — без разметки, чтобы его нельзя было «сломать». */
async function sendTelegram(token: string, chatId: string, text: string): Promise<{ ok: boolean; description?: string }> {
  const payload = JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true });
  const { PROXY_HOST, PROXY_PORT } = process.env;

  let agent: Agent | undefined;
  if (PROXY_HOST && PROXY_PORT) {
    const { HttpsProxyAgent } = await import('https-proxy-agent');
    agent = new HttpsProxyAgent(`http://${PROXY_HOST}:${PROXY_PORT}`);
  }

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: 'api.telegram.org',
        path: `/bot${token}/sendMessage`,
        method: 'POST',
        agent,
        timeout: 10_000,
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve({ ok: false, description: `HTTP ${res.statusCode}` });
          }
        });
      },
    );
    request.on('timeout', () => request.destroy(new Error('Telegram timeout')));
    request.on('error', reject);
    request.write(payload);
    request.end();
  });
}
