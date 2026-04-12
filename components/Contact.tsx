'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import { ContactFormData } from '@/types';

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-to-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', message: '' });
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 px-4 bg-bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Контакт
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-6">
            Готовы обсудить ваш проект? Оставьте заявку или напишите напрямую
          </p>
          <div className="w-20 h-1 bg-accent-light mx-auto rounded-full shadow-neon-sm" />
        </motion.div>

        {/* Кнопки */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative px-10 py-5 bg-white text-bg-primary font-heading font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-neon"
          >
            <span className="relative z-10">Оставить заявку</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <a
            href="https://t.me/Iovdal_ma_lel"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-10 py-5 border-2 border-accent-light text-white font-heading font-semibold text-lg rounded-xl transition-all duration-300 hover:bg-white/5 hover:shadow-neon-sm"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="group-hover:scale-110 transition-transform duration-300"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Написать в Telegram
          </a>
        </motion.div>

        {/* Декоративные элементы */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex justify-center gap-8 text-text-secondary"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-heading font-bold text-white neon-text">10+</span>
            <span className="text-sm">проектов</span>
          </div>
          <div className="w-px bg-bg-quaternary" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-heading font-bold text-white neon-text">2+</span>
            <span className="text-sm">лет опыта</span>
          </div>
          <div className="w-px bg-bg-quaternary" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-heading font-bold text-white neon-text">100%</span>
            <span className="text-sm">довольных</span>
          </div>
        </motion.div>
      </div>

      {/* Модальное окно формы */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-8">
          <h3 className="font-heading text-2xl font-bold text-white mb-6">
            Оставить заявку
          </h3>

          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-white text-lg">Заявка отправлена!</p>
              <p className="text-text-secondary">Свяжусь с вами в ближайшее время</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm text-text-secondary mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-tertiary border border-bg-quaternary rounded-lg text-white placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors duration-200"
                  placeholder="Как к вам обращаться?"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-text-secondary mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-tertiary border border-bg-quaternary rounded-lg text-white placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors duration-200"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-text-secondary mb-2">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-bg-tertiary border border-bg-quaternary rounded-lg text-white placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                  placeholder="Расскажите о вашем проекте..."
                />
              </div>

              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm">
                  Произошла ошибка. Попробуйте ещё раз или напишите в Telegram.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-bg-primary font-heading font-semibold text-lg rounded-lg hover:shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          )}
        </div>
      </Modal>
    </section>
  );
}
