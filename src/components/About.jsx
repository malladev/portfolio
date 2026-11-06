import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { reveal } from "../utils/motion.ts";
import { ScrollWords } from "./ui/ScrollWords.jsx";
import { SectionLabel } from "./ui/SectionLabel.jsx";

const stats = [
  { value: 4, labelKey: "about.yearsExperience" },
  { value: 20, labelKey: "about.accomplishments" },
  { value: 30, labelKey: "about.satisfiedCustomers" },
];

const Counter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setShown(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{value}+</span>
      <span aria-hidden="true">
        {shown}
        <span className="text-saffron">+</span>
      </span>
    </span>
  );
};

export default function About() {
  const { t } = useLanguage();
  const equation = [t('about.efficientUX'), t('about.beautifulUI'), t('about.softwareDevelopment')];

  return (
    <section id="about" className="relative px-5 py-28 sm:px-8 lg:py-40" aria-label={t('about.ariaLabel')}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
          <SectionLabel index="01">{t('about.label')}</SectionLabel>
          <div>
            <ScrollWords text={t('about.manifesto')} className="text-step font-medium" />
            <motion.p {...reveal()} className="mt-10 max-w-2xl text-lg leading-relaxed text-paper-muted">
              {t('about.detail')}
            </motion.p>
          </div>
        </div>

        {/* The equation: three disciplines, one person */}
        <motion.ul {...reveal()} className="mt-24 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-sm">
          {equation.map((term, index) => (
            <li key={term} className="flex items-center gap-4">
              <span className="rounded-full border border-paper/20 px-4 py-2">{term}</span>
              <span aria-hidden="true" className="text-saffron">
                {index < equation.length - 1 ? "+" : "="}
              </span>
            </li>
          ))}
          <li className="rounded-full bg-saffron px-4 py-2 font-medium text-ink">{t('about.result')}</li>
        </motion.ul>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-paper/10 bg-paper/10 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div key={stat.labelKey} {...reveal(index)} className="flex flex-col-reverse gap-2 bg-ink p-8">
              <dt className="text-paper-muted">{t(stat.labelKey)}</dt>
              <dd className="text-section">
                <Counter value={stat.value} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
