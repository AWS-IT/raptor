import Reveal from './Reveal';
import ContactForm from './ContactForm';
import { TelegramIcon, PhoneIcon, MailIcon, ArrowIcon } from './Icons';
import { contacts } from '@/data/site';

/** Секция «Контакты»: прямые способы связи + форма заявки. */
export default function Contact() {
  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="container contact">
        <Reveal className="contact__info">
          <span className="eyebrow">Контакты</span>
          <h2 id="contact-title" className="section-title">
            Есть идея? <br />
            <span className="text-accent">Давайте её соберём.</span>
          </h2>
          <p className="section-lead">
            Сайт, приложение или игра — расскажите о задаче, и я предложу решение, сроки и стоимость. Обычно отвечаю в течение дня.
          </p>

          <ul className="contact__list">
            <li>
              <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="contact-link__icon">
                  <TelegramIcon />
                </span>
                <span>
                  <span className="contact-link__label">Telegram</span>
                  <span className="contact-link__value">{contacts.telegramLabel}</span>
                </span>
                <ArrowIcon dir="up-right" size={18} className="contact-link__arrow" />
              </a>
            </li>
            <li>
              <a href={`tel:${contacts.phone}`} className="contact-link">
                <span className="contact-link__icon">
                  <PhoneIcon />
                </span>
                <span>
                  <span className="contact-link__label">Телефон</span>
                  <span className="contact-link__value">{contacts.phoneLabel}</span>
                </span>
                <ArrowIcon dir="up-right" size={18} className="contact-link__arrow" />
              </a>
            </li>
            {contacts.email && (
              <li>
                <a href={`mailto:${contacts.email}`} className="contact-link">
                  <span className="contact-link__icon">
                    <MailIcon />
                  </span>
                  <span>
                    <span className="contact-link__label">Почта</span>
                    <span className="contact-link__value">{contacts.email}</span>
                  </span>
                  <ArrowIcon dir="up-right" size={18} className="contact-link__arrow" />
                </a>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal className="contact__form panel" delay={150}>
          <h3 className="panel__title">Оставить заявку</h3>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
