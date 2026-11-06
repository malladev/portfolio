import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { navlinks } from "./Navbar.jsx";

const WORDMARK = "MALLADEV".split("");
const REACH = 260; // px around the cursor that the letters respond to

// A letter reaches up towards the cursor. Only scaleY changes, so the layout never moves.
function Letter({ char, pointerX }) {
  const ref = useRef(null);
  const distance = useTransform(pointerX, (x) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? x - (box.left + box.width / 2) : Infinity;
  });
  const stretch = useTransform(distance, [-REACH, 0, REACH], [1, 1.24, 1]);
  const scaleY = useSpring(stretch, { stiffness: 260, damping: 22 });

  return (
    <motion.span ref={ref} style={{ scaleY, originY: 1 }} className="inline-block">
      {char}
    </motion.span>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(Infinity);

  const handlePointerMove = (e) => {
    if (e.pointerType === "mouse" && !reduceMotion) pointerX.set(e.clientX);
  };

  return (
    <footer className="relative overflow-hidden px-5 pt-16 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between gap-6 border-t border-paper/10 pt-8">
        <p className="text-sm leading-6 text-paper-muted">
          &copy; {new Date().getFullYear()} Mohamed Lamine KONE. {t('footer.copyright')}
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 text-sm">
          {navlinks.map((nav) => (
            <li key={nav.href}>
              <a href={nav.href} className="pressable flex min-h-11 items-center text-paper-muted hover:text-paper">
                {t(nav.nameKey)}
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="pressable flex min-h-11 items-center text-saffron">
              {t('footer.backToTop')} ↑
            </a>
          </li>
        </ul>
      </div>

      <div
        aria-hidden="true"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => pointerX.set(Infinity)}
        className="mx-auto mt-16 flex max-w-[100rem] justify-between pt-[3vw] text-[clamp(3.25rem,18.4vw,19.5rem)] font-bold leading-[0.74] tracking-[-0.05em] text-paper"
      >
        {WORDMARK.map((char, index) => (
          <Letter key={index} char={char} pointerX={pointerX} />
        ))}
      </div>
    </footer>
  );
}
