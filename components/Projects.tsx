'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Работы
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-6">
            Опубликованные проекты, демонстрирующие мой опыт и подход к разработке. Также есть неопубликованные каркасы под веб.приложения 
          </p>
          <div className="w-20 h-1 bg-accent-light mx-auto rounded-full shadow-neon-sm" />
        </motion.div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
