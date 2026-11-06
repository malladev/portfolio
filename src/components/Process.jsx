import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { reveal, spring } from "../utils/motion.ts";
import { ProcessPanel } from "./ui/ProcessPanel.jsx";
import { SectionLabel } from "./ui/SectionLabel.jsx";

export default function Process() {
  const { t } = useLanguage();
  const [stage, setStage] = useState(0);
  const steps = t('process.steps');

  return (
    <section id="process" className="relative px-5 py-24 sm:px-8 lg:py-32" aria-label={t('process.ariaLabel')}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-t border-paper/10 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
          <SectionLabel index="02">{t('process.label')}</SectionLabel>
          <motion.h2 {...reveal()} className="text-section max-w-4xl">
            {t('process.title')}
          </motion.h2>
        </div>

        <div className="mt-16 lg:mt-8 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <ol>
            {steps.map((step, index) => (
              <motion.li
                key={step.title}
                onViewportEnter={() => setStage(index)}
                viewport={{ margin: "-48% 0px -48% 0px" }}
                animate={{ opacity: stage === index ? 1 : 0.28 }}
                transition={spring}
                className="flex flex-col justify-center py-10 max-lg:!opacity-100 lg:min-h-[80vh] lg:py-0 lg:last:min-h-[112vh]"
              >
                <p className="font-mono text-sm text-saffron">
                  {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </p>
                <h3 className="text-step mt-3">{step.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-paper-muted">{step.description}</p>

                {/* On small screens each stage carries its own panel */}
                <div className="mt-8 h-[26rem] lg:hidden">
                  <ProcessPanel stage={index} />
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="sticky top-24 hidden h-[calc(100vh-7.5rem)] self-start lg:block">
            <ProcessPanel stage={stage} />
          </div>
        </div>
      </div>
    </section>
  );
}
