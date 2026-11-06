import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { cn } from "../utils/cn.ts";
import { reveal } from "../utils/motion.ts";
import { BrowserFrame, PhoneFrame } from "./ui/BrowserFrame.jsx";
import { SectionLabel } from "./ui/SectionLabel.jsx";

const getProjects = (t) => [
  {
    ...t('projects.claireFontaine'),
    link: "https://www.claire-fontaine.org/",
    host: "claire-fontaine.org",
    image: {
      src: "./assets/projects/claire-fontaine.webp",
      width: 1600,
      height: 770,
      alt: t('projects.claireFontaine.alt'),
    },
  },
  {
    ...t('projects.lakanaPlus'),
    link: "https://lakanaplus.netlify.app/",
    host: "lakanaplus.netlify.app",
    image: {
      src: "./assets/projects/lakana-plus.webp",
      width: 1600,
      height: 834,
      alt: t('projects.lakanaPlus.alt'),
    },
  },
  {
    ...t('projects.documali'),
    link: "https://documali.net/",
    host: "documali.net",
    image: {
      src: "./assets/projects/documali.webp",
      width: 1600,
      height: 782,
      alt: t('projects.documali.alt'),
    },
  },
  {
    ...t('projects.evimo'),
    link: "https://apkpure.com/p/com.malladev.evimomobile",
    image: {
      src: "./assets/projects/evimo.webp",
      width: 720,
      height: 1280,
      alt: t('projects.evimo.alt'),
    },
  },
  {
    ...t('projects.telecelUssd'),
    link: "https://apkpure.com/p/com.malladev.telecel_ussd",
    image: {
      src: "./assets/projects/telecel-ussd.webp",
      width: 720,
      height: 1280,
      alt: t('projects.telecelUssd.alt'),
    },
  },
];

const DESKTOP = "(min-width: 1024px)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP).matches);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP);
    const handleChange = (e) => setIsDesktop(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

function ProjectCard({ project, index, onFocus, className }) {
  const { t } = useLanguage();

  return (
    <article
      onFocus={onFocus}
      className={cn(
        "group relative grid overflow-hidden rounded-3xl border border-paper/10 bg-ink-raised transition-colors duration-200 hover:border-paper/30",
        project.host ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]" : "lg:grid-cols-2",
        className
      )}
    >
      <div className="flex flex-col p-7 sm:p-10">
        <p className="font-mono text-sm text-paper-muted">
          {String(index + 1).padStart(2, "0")} / {project.kind}
        </p>
        <h3 className="text-step mt-5">{project.title}</h3>
        <p className="mt-4 leading-relaxed text-paper-muted">{project.description}</p>

        {project.features && (
          <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
            {project.features.map((feature) => (
              <li key={feature} className="rounded-full border border-paper/15 px-3 py-1 text-paper-muted">
                {feature}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-auto flex items-center gap-1 pt-8 font-medium text-saffron">
          {t('projects.visit')}
          <ArrowUpRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </p>
      </div>

      <div className="flex items-center justify-center bg-paper/[0.03] p-5 sm:p-8">
        {project.host ? <BrowserFrame image={project.image} host={project.host} /> : <PhoneFrame image={project.image} />}
      </div>

      {/* The whole card is the link: it looks like one target, so it behaves like one */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t('projects.open')} ${project.title} ${t('projects.opensNewTab')}`}
        className="pressable absolute inset-0 rounded-3xl"
      />
    </article>
  );
}

const Heading = () => {
  const { t } = useLanguage();
  return (
    <>
      <SectionLabel index="04">{t('projects.label')}</SectionLabel>
      <motion.h2 {...reveal()} className="text-section mt-6">
        {t('projects.title')}
      </motion.h2>
    </>
  );
};

// Vertical scroll turned into a horizontal pass along the projects. Native scrolling is
// untouched: this only maps the page position onto the track.
function PinnedProjects({ projects }) {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // Tabbing to a card that is still off to the side brings it into view
  const handleFocus = (e) => {
    const card = e.currentTarget;
    const centred = card.offsetLeft - (window.innerWidth - card.offsetWidth) / 2;
    const target = Math.min(Math.max(centred, 0), distance);
    const top = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + target });
  };

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen items-center [overflow-x:clip]">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-6 px-[max(2rem,calc((100vw-80rem)/2+2rem))] py-24">
          <div className="flex w-[26rem] shrink-0 flex-col justify-center">
            <Heading />
            <p className="mt-6 font-mono text-sm text-paper-muted">{t('projects.hint')} →</p>
          </div>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.link}
              project={project}
              index={index}
              onFocus={handleFocus}
              className={cn(
                "h-[min(74vh,37rem)] shrink-0",
                project.host ? "w-[min(86vw,74rem)]" : "w-[min(72vw,60rem)]"
              )}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const projects = getProjects(t);

  return (
    <section id="project" className="relative scroll-mt-0" aria-label={t('projects.ariaLabel')}>
      {isDesktop && !reduceMotion ? (
        <PinnedProjects projects={projects} />
      ) : (
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <Heading />
          <div className="mt-12 flex flex-col gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.link} project={project} index={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
