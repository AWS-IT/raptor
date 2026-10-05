'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { services } from '@/data/site';
import { CheckIcon } from './Icons';

type Status = 'idle' | 'sending' | 'success' | 'error';

/** Отправка заявки на сервер (/api/send-to-telegram). Общая для обеих форм. */
export async function sendLead(payload: Record<string, unknown>): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/send-to-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return res.ok ? { ok: true } : { ok: false, error: data.error };
  } catch {
    return { ok: false };
  }
}

/** Согласие на обработку персональных данных (152-ФЗ). */
export function ConsentField({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="consent">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} required />
      <span className="consent__box" aria-hidden>
        <CheckIcon size={14} />
      </span>
      <span className="consent__text">
        Я согласен на обработку персональных данных согласно{' '}
        <Link href="/privacy" target="_blank">
          политике конфиденциальности
        </Link>
      </span>
    </label>
  );
}

/** Форма заявки в секции «Контакты». */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [service, setService] = useState(services[0]);
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus('sending');
    setError('');
    const result = await sendLead({
      kind: 'lead',
      name: fd.get('name'),
      contact: fd.get('contact'),
      message: fd.get('message'),
      website: fd.get('website'),
      service,
      consent,
    });
    if (result.ok) {
      setStatus('success');
      form.reset();
      setConsent(false);
    } else {
      setStatus('error');
      setError(result.error || 'Не получилось отправить. Попробуйте ещё раз или напишите в Telegram.');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon">
          <CheckIcon size={28} />
        </span>
        <h3>Заявка отправлена</h3>
        <p>Спасибо! Свяжусь с вами в ближайшее время.</p>
        <button className="btn btn--ghost" onClick={() => setStatus('idle')}>
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <fieldset className="form__services">
        <legend className="form__label">Что нужно сделать?</legend>
        <div className="segmented">
          {services.map((s) => (
            <label key={s} className={`segmented__item ${service === s ? 'is-active' : ''}`}>
              <input
                type="radio"
                name="service"
                value={s}
                checked={service === s}
                onChange={() => setService(s)}
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form__row">
        <label className="field">
          <span className="form__label">Имя</span>
          <input name="name" type="text" required maxLength={80} autoComplete="name" placeholder="Как к вам обращаться" />
        </label>
        <label className="field">
          <span className="form__label">Телефон или Telegram</span>
          <input
            name="contact"
            type="text"
            required
            maxLength={120}
            autoComplete="tel"
            placeholder="+7 … или @username"
          />
        </label>
      </div>

      <label className="field">
        <span className="form__label">О проекте</span>
        <textarea name="message" rows={4} maxLength={2000} placeholder="Коротко: что за проект, сроки, бюджет" />
      </label>

      {/* Ловушка для спам-ботов: человек это поле не видит */}
      <div className="hp" aria-hidden>
        <label>
          Сайт
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <ConsentField checked={consent} onChange={setConsent} />

      {status === 'error' && (
        <p className="form__error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn--accent btn--lg btn--block" disabled={status === 'sending' || !consent}>
        {status === 'sending' ? 'Отправляю…' : 'Отправить заявку'}
      </button>
    </form>
  );
}
