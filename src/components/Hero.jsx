import React, { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { riseLine, reveal } from "../utils/motion.ts";

const LENS_RADIUS = 170;
const GRID_PAPER =
  "linear-gradient(rgba(255,181,46,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,181,46,0.09) 1px, transparent 1px)";
const lensSpring = { stiffness: 320, damping: 32, mass: 0.6 };

const socials = [
  { Icon: IconBrandGithub, href: "https://github.com/malladev", labelKey: "hero.visitGithub" },
  {
    Icon: IconBrandLinkedin,
    href: "https://www.linkedin.com/in/mohamed-lamine-kon%C3%A9-b51999193/",
    labelKey: "hero.visitLinkedin",
  },
];

const ANNOTATIONS = ["2%", "32%", "62%"];

// What sits under the finished title: outlines, line boxes and the tags that produce it.
function Blueprint({ line1, line2 }) {
  return (
    <div aria-hidden="true" className="relative">
      <p className="absolute -top-7 left-0 font-mono text-xs tracking-normal text-saffron">
        {'<h1 className="text-hero">'}
      </p>
      <span className="relative block border border-dashed border-saffron/60 pb-[0.06em]">
        <span className="text-outline block">{line1}</span>
        {ANNOTATIONS.map((left) => (
          <span key={left} style={{ left }} className="absolute top-1 font-mono text-[0.7rem] leading-none tracking-normal text-saffron">
            font-weight: 600
          </span>
        ))}
      </span>
      <span className="relative mt-[-1px] block border border-dashed border-saffron/60 pb-[0.06em]">
        <span className="text-outline block font-serif font-normal italic tracking-[-0.02em]">{line2}</span>
        {ANNOTATIONS.map((left) => (
          <span key={left} style={{ left }} className="absolute bottom-1 font-mono text-[0.7rem] not-italic leading-none tracking-normal text-saffron">
            font-family: serif
          </span>
        ))}
      </span>
      <p className="absolute -bottom-7 left-0 font-mono text-xs tracking-normal text-saffron">{'</h1>'}</p>
    </div>
  );
}

function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // The lens: a circular window onto the blueprint, following a spring so it trails the hand
  const pointerX = useMotionValue(-LENS_RADIUS);
  const pointerY = useMotionValue(0);
  const radius = useMotionValue(0);
  const x = useSpring(pointerX, lensSpring);
  const y = useSpring(pointerY, lensSpring);
  const r = useSpring(radius, { stiffness: 260, damping: 30 });
  const lens = useMotionTemplate`radial-gradient(circle ${r}px at ${x}px ${y}px, #000 99%, transparent 100%)`;
  // The rim of the lens, so it reads as an object rather than a glitch in the title
  const rimX = useTransform([x, r], ([cx, radiusNow]) => cx - radiusNow);
  const rimY = useTransform([y, r], ([cy, radiusNow]) => cy - radiusNow);
  const rimSize = useTransform(r, (radiusNow) => radiusNow * 2);
  const rimOpacity = useTransform(r, [0, 40], [0, 1]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.9], [1, 0]);

  // One sweep across the title on arrival, so the idea reads even without a mouse
  useEffect(() => {
    if (reduceMotion || !titleRef.current) return undefined;
    const { width, height } = titleRef.current.getBoundingClientRect();
    pointerY.jump(height / 2);
    pointerX.jump(-LENS_RADIUS);

    const open = setTimeout(() => radius.set(height * 0.6), 900);
    const sweep = animate(pointerX, width + LENS_RADIUS, { duration: 1.6, delay: 0.9, ease: [0.45, 0, 0.55, 1] });
    const close = setTimeout(() => radius.set(0), 2500);

    return () => {
      clearTimeout(open);
      clearTimeout(close);
      sweep.stop();
    };
  }, [reduceMotion, pointerX, pointerY, radius]);

  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const rect = titleRef.current.getBoundingClientRect();
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
    radius.set(LENS_RADIUS);
  };

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Aurora: drawn from the logo's violet, it only moves with the scroll */}
      <motion.div
        aria-hidden="true"
        style={{ y: auroraY }}
        className="pointer-events-none absolute inset-x-0 -top-1/4 h-[130%] bg-[radial-gradient(60%_50%_at_78%_22%,rgba(124,77,255,0.34),transparent_70%),radial-gradient(45%_40%_at_12%_8%,rgba(255,181,46,0.10),transparent_70%)]"
      />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-5 pb-10 pt-28 sm:px-8 lg:pt-32"
      >
        <motion.div {...reveal()} className="flex flex-wrap items-start justify-between gap-4 font-mono text-sm text-paper-muted">
          <p>
            {t('hero.greeting')} <span className="text-paper">{t('hero.name')}</span>
          </p>
          <p className="sm:text-right">
            {t('hero.roleDev')}
            <br />
            {t('hero.roleDesign')}
          </p>
        </motion.div>

        <div className="py-16 lg:py-10">
          <div ref={titleRef} onPointerMove={handlePointerMove} onPointerLeave={() => radius.set(0)} className="relative">
            <h1 className="text-hero">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span {...riseLine(0)} animate={{ y: 0 }} className="block">
                  {t('hero.line1')}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  {...riseLine(1)}
                  animate={{ y: 0 }}
                  className="block font-serif font-normal italic tracking-[-0.02em] text-saffron"
                >
                  {t('hero.line2')}
                  <span aria-hidden="true" className="caret ml-2 inline-block h-[0.74em] w-[0.05em] translate-y-[0.06em] bg-saffron" />
                </motion.span>
              </span>
            </h1>

            {!reduceMotion && (
              <motion.div
                style={{
                  WebkitMaskImage: lens,
                  maskImage: lens,
                  backgroundImage: GRID_PAPER,
                  backgroundSize: "24px 24px",
                }}
                className="text-hero pointer-events-none absolute inset-0 bg-ink"
              >
                <Blueprint line1={t('hero.line1')} line2={t('hero.line2')} />
              </motion.div>
            )}
            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                style={{ x: rimX, y: rimY, width: rimSize, height: rimSize, opacity: rimOpacity }}
                className="pointer-events-none absolute left-0 top-0 rounded-full border border-saffron/70"
              />
            )}
          </div>
          <p className="mt-5 hidden font-mono text-xs text-paper-muted lg:block">{t('hero.lensHint')}</p>
        </div>

        <motion.div
          {...reveal(2)}
          className="grid items-end gap-8 border-t border-paper/10 pt-6 lg:grid-cols-[minmax(0,1fr)_auto]"
        >
          <p className="max-w-xl text-lg leading-relaxed text-paper-muted">{t('hero.description')}</p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#project"
              className="pressable group flex min-h-12 items-center gap-2 rounded-full bg-saffron px-6 font-semibold text-ink hover:bg-paper"
            >
              {t('hero.ctaProjects')}
              <ArrowDownIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="pressable group flex min-h-12 items-center gap-2 rounded-full border border-paper/20 px-6 font-medium hover:border-paper"
            >
              {t('hero.ctaContact')}
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            {socials.map(({ Icon, href, labelKey }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(labelKey)}
                title={t(labelKey)}
                className="pressable flex h-12 w-12 items-center justify-center rounded-full border border-paper/20 hover:border-paper"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
