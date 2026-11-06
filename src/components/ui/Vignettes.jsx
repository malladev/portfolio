import React from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { spring } from "../../utils/motion.ts";

const inView = { once: true, margin: "0px -10% 0px -10%" };

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
const DIALLED = ["*", "1", "2", "3", "#"];

// A USSD code being dialled, key by key
export function DialVignette() {
  return (
    <motion.div
      aria-hidden="true"
      initial="idle"
      whileInView="dial"
      viewport={inView}
      className="mx-auto flex w-full max-w-[17rem] flex-col gap-3 rounded-[2rem] border border-paper/15 bg-ink p-4"
    >
      <div className="flex h-12 items-center justify-center gap-0.5 rounded-xl bg-paper/5 font-mono text-xl">
        {DIALLED.map((key, index) => (
          <motion.span
            key={index}
            variants={{ idle: { opacity: 0 }, dial: { opacity: 1 } }}
            transition={{ delay: 0.4 + index * 0.22, duration: 0.01 }}
          >
            {key}
          </motion.span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {KEYS.map((key) => {
          const position = DIALLED.indexOf(key);
          return (
            <motion.span
              key={key}
              variants={
                position < 0
                  ? undefined
                  : {
                      idle: { backgroundColor: "rgba(239,233,221,0.05)", color: "#EFE9DD", scale: 1 },
                      dial: {
                        backgroundColor: ["rgba(239,233,221,0.05)", "#FFB52E", "rgba(255,181,46,0.16)"],
                        color: ["#EFE9DD", "#0B0B0F", "#FFB52E"],
                        scale: [1, 0.9, 1],
                      },
                    }
              }
              transition={{ delay: 0.4 + position * 0.22, duration: 0.3 }}
              className="flex aspect-square items-center justify-center rounded-xl bg-paper/5 font-mono text-lg"
            >
              {key}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}

// A ticket passing under the scanner
export function TicketVignette() {
  const { t } = useLanguage();
  return (
    <motion.div
      aria-hidden="true"
      initial="idle"
      whileInView="scan"
      viewport={inView}
      className="relative mx-auto w-full max-w-[20rem] -rotate-3 overflow-hidden rounded-2xl bg-paper text-ink"
    >
      <div className="p-6">
        <p className="font-mono text-xs opacity-60">EVIMO / PASS</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight">N° 0042</p>
      </div>
      <div className="relative border-t-2 border-dashed border-ink/25">
        <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-ink-raised" />
        <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-ink-raised" />
      </div>
      <div className="relative p-6">
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 48 }, (_, index) => (
            <span
              key={index}
              className={`aspect-square ${(index * 7 + (index % 5)) % 3 === 0 ? "bg-transparent" : "bg-ink"}`}
            />
          ))}
        </div>
        <motion.span
          variants={{ idle: { top: "0%", opacity: 0 }, scan: { top: ["0%", "100%"], opacity: [1, 1, 0] } }}
          transition={{ duration: 1.1, delay: 0.4, ease: "easeInOut" }}
          className="absolute inset-x-4 h-0.5 bg-iris"
        />
      </div>
      <motion.div
        variants={{ idle: { opacity: 0, y: 8 }, scan: { opacity: 1, y: 0 } }}
        transition={{ ...spring, delay: 1.5 }}
        className="flex items-center gap-2 bg-iris px-6 py-3 font-medium text-paper"
      >
        <CheckIcon className="h-5 w-5" />
        {t('projects.evimo.scan')}
      </motion.div>
    </motion.div>
  );
}

// A file coming together, step by step
export function ChecklistVignette() {
  const { t } = useLanguage();
  const steps = t('projects.documali.steps');
  return (
    <motion.div
      aria-hidden="true"
      initial="idle"
      whileInView="done"
      viewport={inView}
      className="mx-auto w-full max-w-[20rem] rounded-2xl border border-paper/15 bg-ink p-5"
    >
      <div className="h-1.5 overflow-hidden rounded-full bg-paper/10">
        <motion.div
          variants={{ idle: { scaleX: 0 }, done: { scaleX: 1 } }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
          style={{ originX: 0 }}
          className="h-full bg-saffron"
        />
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-3 rounded-xl bg-paper/5 p-3">
            <motion.span
              variants={{
                idle: { backgroundColor: "rgba(239,233,221,0)", scale: 1 },
                done: { backgroundColor: "#FFB52E", scale: [1, 1.15, 1] },
              }}
              transition={{ delay: 0.5 + index * 0.45, duration: 0.3 }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-paper/25 text-ink"
            >
              <motion.span
                variants={{ idle: { opacity: 0 }, done: { opacity: 1 } }}
                transition={{ delay: 0.55 + index * 0.45 }}
              >
                <CheckIcon className="h-4 w-4" />
              </motion.span>
            </motion.span>
            {step}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
