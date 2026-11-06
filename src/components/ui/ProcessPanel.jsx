import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { spring } from "../../utils/motion.ts";

const files = ["research.md", "wireframe.fig", "tokens.css", "App.jsx"];

const swatches = ["#FFB52E", "#7C4DFF", "#EFE9DD", "#26262E"];

const code = [
  ["<Screen>", "text-saffron"],
  ["  <Nav />", "text-paper"],
  ["  <Hero title={title} />", "text-paper"],
  ["  <Text>{intro}</Text>", "text-paper"],
  ["  <Button>{cta}</Button>", "text-paper"],
  ["</Screen>", "text-saffron"],
];

const notes = [
  { className: "left-[6%] top-[12%] bg-saffron text-ink", rotate: -6 },
  { className: "right-[5%] top-[30%] bg-paper text-ink", rotate: 5 },
  { className: "bottom-[12%] left-[16%] bg-iris text-paper", rotate: -3 },
];

const WireLabel = ({ visible, children }) => (
  <motion.span
    initial={false}
    animate={{ opacity: visible ? 1 : 0 }}
    className="absolute left-2 top-1 font-mono text-[0.65rem] text-paper-muted"
  >
    {children}
  </motion.span>
);

// One mock that keeps its identity across the four stages: the same blocks are first
// outlined, then styled, then shipped, instead of being swapped for a new picture.
export function ProcessPanel({ stage }) {
  const { t } = useLanguage();
  const wired = stage >= 1;
  const styled = stage >= 2;
  const shipped = stage === 3;
  const sketching = stage === 1;

  const block = (color) => ({
    backgroundColor: styled ? color : "rgba(239,233,221,0)",
    borderColor: styled ? "rgba(239,233,221,0)" : "rgba(239,233,221,0.4)",
  });

  return (
    <div aria-hidden="true" className="flex h-full min-h-[24rem] flex-col overflow-hidden rounded-3xl border border-paper/10 bg-ink-raised">
      <div className="flex overflow-hidden border-b border-paper/10 font-mono text-xs">
        {files.map((file, index) => (
          <span key={file} className={`relative shrink-0 px-4 py-3 text-paper-muted ${index === stage ? "" : "hidden sm:block"}`}>
            {index === stage && (
              <motion.span layoutId="process-tab" transition={spring} className="absolute inset-x-0 bottom-0 h-px bg-saffron" />
            )}
            <span className={index === stage ? "relative text-paper" : "relative"}>{file}</span>
          </span>
        ))}
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-6">
        <AnimatePresence>
          {!wired &&
            t('process.notes').map((note, index) => (
              <motion.span
                key={note}
                initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: notes[index].rotate }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ ...spring, delay: index * 0.06 }}
                className={`absolute rounded-lg px-6 py-7 text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-tight shadow-xl ${notes[index].className}`}
              >
                {note}
              </motion.span>
            ))}
        </AnimatePresence>

        <motion.div
          initial={false}
          animate={{
            opacity: wired ? 1 : 0,
            scale: wired ? 1 : 0.9,
            width: shipped ? "40%" : "62%",
            x: shipped ? "-56%" : styled ? "-14%" : "0%",
          }}
          transition={spring}
          className="flex aspect-[4/5] max-h-full min-w-[9.5rem] flex-col gap-2.5 rounded-2xl"
        >
          {/* Navigation */}
          <motion.div initial={false} animate={block("#26262E")} transition={spring} className="relative flex h-[10%] items-center gap-2 rounded-lg border border-dashed px-3">
            <WireLabel visible={sketching}>nav</WireLabel>
            <motion.span initial={false} animate={{ opacity: styled ? 1 : 0 }} className="h-3 w-3 rounded-full bg-saffron" />
            <motion.span initial={false} animate={{ opacity: styled ? 1 : 0 }} className="ml-auto h-1 w-8 rounded-full bg-paper/50" />
            <motion.span initial={false} animate={{ opacity: styled ? 1 : 0 }} className="h-1 w-5 rounded-full bg-paper/50" />
          </motion.div>

          {/* Hero: the classic crossed box of a wireframe, then a real title */}
          <motion.div initial={false} animate={block("#7C4DFF")} transition={spring} className="relative flex flex-1 items-end overflow-hidden rounded-lg border border-dashed p-3">
            <WireLabel visible={sketching}>hero</WireLabel>
            <motion.svg
              initial={false}
              animate={{ opacity: sketching ? 0.35 : 0 }}
              className="absolute inset-0 h-full w-full text-paper"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path d="M0 0 100 100M100 0 0 100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </motion.svg>
            <motion.span initial={false} animate={{ opacity: styled ? 1 : 0, y: styled ? 0 : 8 }} transition={spring} className="text-[clamp(1.25rem,2.4vw,2.25rem)] font-semibold leading-none tracking-tight text-paper">
              {t('process.mockTitle')}
            </motion.span>
          </motion.div>

          {/* Text */}
          <motion.div initial={false} animate={block("#EFE9DD")} transition={spring} className="h-2.5 w-4/5 rounded-full border border-dashed" />
          <motion.div initial={false} animate={block("#A9A59A")} transition={spring} className="h-2.5 w-3/5 rounded-full border border-dashed" />

          {/* Button */}
          <motion.div initial={false} animate={block("#FFB52E")} transition={spring} className="relative flex h-[13%] items-center justify-center rounded-lg border border-dashed">
            <WireLabel visible={sketching}>button</WireLabel>
            <motion.span initial={false} animate={{ opacity: styled ? 1 : 0 }} className="text-sm font-semibold text-ink">
              {t('process.mockCta')}
            </motion.span>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {stage === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 16, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, x: 16, y: "-50%" }}
              transition={spring}
              className="absolute right-5 top-1/2 flex flex-col gap-2"
            >
              {swatches.map((swatch) => (
                <span key={swatch} className="flex items-center gap-2 font-mono text-[0.7rem] text-paper-muted">
                  <span className="h-8 w-8 rounded-md border border-paper/20" style={{ backgroundColor: swatch }} />
                  <span className="hidden sm:inline">{swatch}</span>
                </span>
              ))}
            </motion.div>
          )}

          {shipped && (
            <motion.div
              initial={{ opacity: 0, x: 16, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, x: 16, y: "-50%" }}
              transition={spring}
              className="absolute left-[50%] right-3 top-1/2 flex flex-col gap-3"
            >
              <pre className="overflow-hidden font-mono text-[clamp(0.55rem,0.95vw,0.82rem)] leading-relaxed">
                {code.map(([line, color], index) => (
                  <motion.span
                    key={line}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.08 }}
                    className={`block ${color}`}
                  >
                    {line}
                  </motion.span>
                ))}
              </pre>
              <span className="flex w-fit items-center gap-2 rounded-full border border-saffron/40 px-3 py-1 font-mono text-[0.7rem] text-saffron">
                <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                {t('process.deployed')}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
