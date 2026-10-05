'use client';

import { useState, type FormEvent } from 'react';
import { ConsentField, sendLead } from './ContactForm';
import { CheckIcon } from './Icons';

/**
 * «Сообщить о выходе» — для проектов в разработке.
 * Собирает контакты людей, которые ждут релиз: когда появятся продажи, будет кому написать.
 */
export default function NotifyForm({ project, title }: { project: string; title: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus('sending');
    const result = await sendLead({
      kind: 'notify',
      contact: fd.get('contact'),
      website: fd.get('website'),
      project: `${title} (${project})`,
      consent,
    });
    if (result.ok) setStatus('success');
    else {
      setStatus('error');
      setError(result.error || 'Не получилось. Попробуйте позже.');
    }
  }

  if (status === 'success') {
    return (
      <div className="notify notify--done" role="status">
        <CheckIcon size={20} /> Готово! Напишем, как только «{title}» выйдет.
      </div>
    );
  }

  return (
    <form className="notify" onSubmit={onSubmit}>
      <p className="notify__title">Сообщить о выходе</p>
      <div className="notify__row">
        <input
          name="contact"
          type="text"
          required
          maxLength={120}
          placeholder="Email или @telegram"
          aria-label="Email или Telegram"
        />
        <button className="btn btn--accent" type="submit" disabled={status === 'sending' || !consent}>
          {status === 'sending' ? '…' : 'Жду'}
        </button>
      </div>
      <div className="hp" aria-hidden>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <ConsentField checked={consent} onChange={setConsent} />
      {status === 'error' && (
        <p className="form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
