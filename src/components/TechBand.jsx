import React, { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext.jsx";

const tech = [
  { picture: "./assets/tech/react.png", name: "React" },
  { picture: "./assets/tech/next.png", name: "Next.js" },
  { picture: "./assets/tech/angular.png", name: "Angular" },
  { picture: "./assets/tech/typescript.png", name: "TypeScript" },
  { picture: "./assets/tech/tailwind.png", name: "Tailwind CSS" },
  { picture: "./assets/tech/flutter.png", name: "Flutter" },
  { picture: "./assets/tech/springboot.png", name: "Spring Boot" },
  { picture: "./assets/tech/figma.png", name: "Figma" },
  { picture: "./assets/tech/photoshop.png", name: "Photoshop" },
];

const BASE_SPEED = 1.4; // percent of the band per second

const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

const Items = ({ hidden }) =>
  tech.map((item) => (
    <li key={item.name} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-14">
      <img
        src={item.picture}
        alt=""
        width="28"
        height="28"
        loading="lazy"
        className="h-7 w-7 object-contain [filter:brightness(0)_invert(0.92)_sepia(0.1)]"
      />
      <span className="text-3xl font-medium tracking-tight text-paper">{item.name}</span>
    </li>
  ));

// Runs on its own, and follows the scroll: faster as you scroll, reversing when you scroll back.
function TechBand() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const hovered = useRef(false);
  const direction = useRef(-1);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1200, 0, 1200], [-5, 0, 5], { clamp: false });
  const skewX = useTransform(velocity, [-2400, 2400], [5, -5]);
  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || paused || hovered.current) return;
    const factor = boost.get();
    if (factor < 0) direction.current = 1;
    else if (factor > 0) direction.current = -1;
    const move = direction.current * BASE_SPEED * (delta / 1000);
    baseX.set(baseX.get() + move * (1 + Math.abs(factor)));
  });

  const label = t(paused ? 'common.playAnimation' : 'common.pauseAnimation');
  const Icon = paused ? PlayIcon : PauseIcon;

  if (reduceMotion) {
    return (
      <div className="relative border-y border-paper/10 py-6">
        <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-y-4 px-5">
          <Items />
        </ul>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center overflow-hidden border-y border-paper/10 py-5"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hovered.current = true;
      }}
      onPointerLeave={() => {
        hovered.current = false;
      }}
    >
      <motion.ul style={{ x, skewX }} className="flex w-max flex-nowrap">
        <Items />
        <Items hidden />
      </motion.ul>
      <button
        onClick={() => setPaused((value) => !value)}
        aria-label={label}
        title={label}
        className="pressable absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper-muted hover:text-paper"
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export default TechBand;
