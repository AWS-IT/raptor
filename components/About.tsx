'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Docker', icon: '🐳' },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Обо мне
          </h2>
          <div className="w-20 h-1 bg-accent-light mx-auto rounded-full shadow-neon-sm" />
        </motion.div>

        {/* Контент: биография и аватар */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Биография */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Я — Бисултанов Муслим, веб-разработчик, специализируюсь на создании современных сайтов и веб-приложений. Работаю с интерфейсами и логикой, уделяю внимание удобству пользователя, скорости работы и аккуратной реализации.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Разрабатываю проекты разного уровня — от простых лендингов до более сложных интерфейсов. В работе использую актуальные технологии и стремлюсь делать решения, которые не только выглядят хорошо, но и стабильно работают в реальных условиях.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Открыт к сотрудничеству и новым задачам. Вникаю в цели проекта, предлагаю понятные решения и довожу работу до результата, который соответствует ожиданиям заказчика.
            </p>
          </motion.div>

          {/* Аватар */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-bg-quaternary shadow-neon-sm">
                <Image
                  src="/"
                  alt="Аватар разработчика"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Декоративные элементы */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-accent/30 rounded-lg" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border-2 border-accent/30 rounded-lg" />
            </div>
          </motion.div>
        </div>

        {/* Стек технологий */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-heading text-2xl font-semibold text-white text-center mb-8">
            Технологии
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group flex flex-col items-center justify-center p-4 bg-bg-tertiary rounded-xl border border-bg-quaternary hover:border-accent/50 hover:shadow-neon-sm transition-all duration-300"
              >
                <span className="text-2xl mb-2 grayscale group-hover:grayscale-0 transition-all duration-300">
                  {tech.icon}
                </span>
                <span className="text-sm text-text-secondary group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
