import React, { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const GRID_PAPER =
  "linear-gradient(rgba(255,181,46,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,181,46,0.1) 1px, transparent 1px)";

// A real capture in a browser window. A sheet of drafting paper slides off it the first time
// it is seen, and only once it has loaded, so the frame never reveals an empty box.
// The image itself is never clipped: a fully clipped element counts as out of view,
// which would stop both lazy loading and the trigger from ever firing.
export function BrowserFrame({ image, host }) {
  const frameRef = useRef(null);
  const inView = useInView(frameRef, { once: true, margin: "0px -8% 0px -8%" });
  const reduceMotion = useReducedMotion();
  const [settled, setSettled] = useState(false);
  const ready = inView && settled;

  return (
    <figure ref={frameRef} className="w-full overflow-hidden rounded-xl border border-paper/15 bg-ink shadow-2xl">
      <figcaption className="flex items-center gap-1.5 border-b border-paper/10 px-3 py-2.5">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        <span className="ml-2 truncate font-mono text-xs text-paper-muted">{host}</span>
      </figcaption>
      <div className="relative overflow-hidden" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          onLoad={() => setSettled(true)}
          onError={() => setSettled(true)}
          className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ x: ready ? "101%" : "0%" }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            style={{ backgroundImage: GRID_PAPER, backgroundSize: "24px 24px" }}
            className="absolute inset-0 bg-ink"
          />
        )}
      </div>
    </figure>
  );
}
