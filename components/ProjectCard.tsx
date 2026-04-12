'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types';
import Modal from './Modal';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        onClick={() => setIsModalOpen(true)}
        className="group cursor-pointer bg-bg-tertiary rounded-2xl overflow-hidden border border-bg-quaternary hover:border-accent/30 hover:shadow-neon-sm transition-all duration-300"
      >
        {/* Изображение проекта */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-tertiary to-transparent" />
        </div>

        {/* Контент карточки */}
        <div className="p-6">
          <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-accent-light transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Теги технологий */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs text-accent bg-bg-quaternary rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs text-accent bg-bg-quaternary rounded-md">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Отзыв (краткий) */}
          <div className="pt-4 border-t border-bg-quaternary">
            <p className="text-text-secondary text-sm italic line-clamp-2">
              &ldquo;{project.review.text.slice(0, 100)}...&rdquo;
            </p>
            <p className="text-accent text-xs mt-2">
              — {project.review.authorName}
            </p>
          </div>
        </div>
      </motion.article>

      {/* Модальное окно с деталями проекта */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-8">
          {/* Изображение */}
          <div className="relative h-64 rounded-xl overflow-hidden mb-6">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Заголовок */}
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            {project.title}
          </h2>

          {/* Полное описание */}
          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          {/* Технологии */}
          <div className="mb-6">
            <h4 className="font-heading text-lg font-semibold text-white mb-3">
              Технологии
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm text-accent-light bg-bg-quaternary rounded-lg border border-accent/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Ссылки */}
          {(project.link || project.github) && (
            <div className="flex gap-4 mb-8">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-bg-primary font-semibold rounded-lg hover:shadow-neon transition-shadow duration-300"
                >
                  Открыть сайт
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-accent text-white font-semibold rounded-lg hover:bg-white/5 transition-colors duration-300"
                >
                  GitHub
                </a>
              )}
            </div>
          )}

          {/* Отзыв */}
          <div className="bg-bg-tertiary rounded-xl p-6 border border-bg-quaternary">
            <div className="flex items-start gap-4">
              {project.review.companyLogo && (
                <div className="w-16 h-16 rounded-lg bg-bg-quaternary flex items-center justify-center overflow-hidden flex-shrink-0">
                  <Image
                    src={project.review.companyLogo}
                    alt="Логотип компании"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
              )}
              <div>
                <p className="text-text-secondary italic leading-relaxed mb-4">
                  &ldquo;{project.review.text}&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold">
                    {project.review.authorName}
                  </p>
                  <p className="text-accent text-sm">
                    {project.review.authorPosition}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
