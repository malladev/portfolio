import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { cn } from "../utils/cn.ts";
import { reveal, spring } from "../utils/motion.ts";
import { SectionLabel } from "./ui/SectionLabel.jsx";

const services = [
  { id: "web", path: "web" },
  { id: "mobile", path: "mobile" },
];

export default function Services() {
  const { t } = useLanguage();
  const [active, setActive] = useState("web");

  return (
    <section id="service" className="relative px-5 py-24 sm:px-8 lg:py-32" aria-label={t('service.ariaLabel')}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-t border-paper/10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
          <SectionLabel index="04">{t('service.label')}</SectionLabel>
          <motion.h2 {...reveal()} className="text-section">
            {t('service.title')}
          </motion.h2>
        </div>

        <div className="mt-12 flex flex-col gap-4 lg:flex-row">
          {services.map(({ id, path }) => {
            const isActive = active === id;
            return (
              <motion.article
                key={id}
                layout
                transition={spring}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(id)}
                onFocus={() => setActive(id)}
                style={{ flexGrow: isActive ? 1.5 : 1, flexBasis: 0, borderRadius: 24 }}
                className={cn(
                  "flex min-w-0 flex-col border p-8 transition-colors duration-200 lg:min-h-[32rem]",
                  isActive ? "border-saffron/50 bg-ink-raised" : "border-paper/10"
                )}
              >
                <motion.div layout="position" transition={spring} className="flex items-baseline justify-between gap-4">
                  <h3 className="text-section">{t(`service.${path}.title`)}</h3>
                  <p className="font-mono text-sm text-paper-muted">
                    4+ {t('service.experience')}
                  </p>
                </motion.div>

                <motion.div layout="position" transition={spring} className="mt-6">
                  <p className="max-w-lg text-lg leading-relaxed text-paper-muted">{t(`service.${path}.description`)}</p>
                  <ul className="mt-6 grid gap-y-2">
                    {t(`service.${path}.features`).map((feature) => (
                      <li key={feature} className="flex items-baseline gap-3">
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 -translate-y-0.5 rounded-full bg-saffron" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <a
                  href="#contact"
                  aria-label={`${t('service.getInTouch')} : ${t(`service.${path}.title`)}`}
                  className="pressable group mt-auto flex min-h-11 w-fit items-center gap-2 pt-8 font-medium text-saffron"
                >
                  {t('service.getInTouch')}
                  <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
