import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { reveal } from "../utils/motion.ts";
import { BrowserFrame } from "./ui/BrowserFrame.jsx";
import { SectionLabel } from "./ui/SectionLabel.jsx";

const tiltSpring = { stiffness: 220, damping: 26 };
const MAX_TILT = 4; // degrees: enough to feel the card, not enough to read as a gimmick

const getRecentProjects = (t) => [
  {
    ...t('recent.bko'),
    link: "https://bko-gosp-grill.vercel.app/",
    host: "bko-gosp-grill.vercel.app",
    image: { src: "./assets/projects/bko-gosp-grill.webp", width: 1600, height: 750, alt: t('recent.bko.alt') },
  },
  {
    ...t('recent.mille'),
    link: "https://mille-emotions.vercel.app/",
    host: "mille-emotions.vercel.app",
    image: { src: "./assets/projects/mille-emotions.webp", width: 1600, height: 746, alt: t('recent.mille.alt') },
  },
];

function RecentCard({ project, index }) {
  const { t } = useLanguage();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), tiltSpring);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), tiltSpring);

  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - box.left) / box.width - 0.5);
    pointerY.set((e.clientY - box.top) / box.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div {...reveal(index)} className="[perspective:1400px]">
      <motion.article
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        style={{ rotateX, rotateY }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-paper/10 bg-ink-raised p-5 transition-colors duration-200 hover:border-paper/30 sm:p-6"
      >
        <BrowserFrame image={project.image} host={project.host} />

        <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
          <p className="flex flex-wrap items-center justify-between gap-2 font-mono text-sm text-paper-muted">
            {project.kind}
            <span className="flex items-center gap-2 rounded-full border border-saffron/40 px-3 py-1 text-xs text-saffron">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-saffron" />
              {t('recent.status')}
            </span>
          </p>
          <h3 className="text-step mt-4">{project.title}</h3>
          <p className="mt-3 leading-relaxed text-paper-muted">{project.description}</p>

          <ul className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
            {project.features.map((feature) => (
              <li key={feature} className="rounded-full border border-paper/15 px-3 py-1 text-paper-muted">
                {feature}
              </li>
            ))}
          </ul>

          <p className="mt-auto flex items-center gap-1 pt-6 font-medium text-saffron">
            {t('projects.visit')}
            <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </p>
        </div>

        {/* The whole card is the link: it looks like one target, so it behaves like one */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t('projects.open')} ${project.title} ${t('projects.opensNewTab')}`}
          className="pressable absolute inset-0 rounded-3xl"
        />
      </motion.article>
    </motion.div>
  );
}

export default function Recent() {
  const { t } = useLanguage();

  return (
    <section id="recent" className="relative px-5 py-24 sm:px-8 lg:py-32" aria-label={t('recent.label')}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-t border-paper/10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
          <SectionLabel index="03">{t('recent.label')}</SectionLabel>
          <div>
            <motion.h2 {...reveal()} className="text-section">
              {t('recent.title')}
            </motion.h2>
            <motion.p {...reveal(1)} className="mt-5 max-w-2xl text-lg leading-relaxed text-paper-muted">
              {t('recent.subtitle')}
            </motion.p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {getRecentProjects(t).map((project, index) => (
            <RecentCard key={project.link} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
