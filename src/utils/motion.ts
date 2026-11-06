// Shared motion language (apple-design §4): critically damped springs by default.
// A spring has no scripted end: it starts from the current value, so it can be interrupted.
export const spring = { type: "spring", bounce: 0, duration: 0.5 };

// Sections reveal once, quickly, over a short distance. The stagger is capped so a long
// list never makes people wait for content they could already be reading.
export const reveal = (index = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { ...spring, delay: Math.min(index, 5) * 0.05 },
});

// A line of display type rising out of its own baseline.
export const riseLine = (index = 0, delay = 0) => ({
    initial: { y: "108%" },
    transition: { ...spring, duration: 0.8, delay: delay + index * 0.08 },
});
