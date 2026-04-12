'use client';

import { motion } from 'framer-motion';
import NeonLogo from './NeonLogo';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-white/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mb-10">
        {/* Логотип */}
        <NeonLogo size="lg" animated />

        {/* Заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mt-24 mb-10 tracking-tight neon-text"
        >
          WebRaptor
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl lg:text-2xl text-text-secondary mb-10 max-w-2xl"
        >
          Разработка веб-сайтов и приложений
        </motion.p>

        {/* Кнопки */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative px-8 py-4 bg-white text-bg-primary font-heading font-semibold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-neon"
          >
            <span className="relative z-10">Смотреть работы</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="group px-8 py-4 border-2 border-accent-light text-white font-heading font-semibold text-lg rounded-lg transition-all duration-300 hover:bg-white/5 hover:shadow-neon-sm"
          >
            Связаться
          </button>
        </motion.div>
      </div>

      {/* Индикатор скролла */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-accent rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-accent-light rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
