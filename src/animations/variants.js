// Centralized Framer Motion variants — cinematic, weightless, restrained.
// Easing follows a longer "exponential-like" curve to feel organic and slow-burning.

// Reference curves (Material expressive / cine-style)
export const EASE_CINE = [0.16, 0.84, 0.24, 1]; // long out
export const EASE_SOFT = [0.32, 0.72, 0.18, 1]; // gentle drift
export const EASE_INOUT = [0.65, 0, 0.35, 1];   // continuity between sections

export const DURATIONS = {
  micro: 0.6,
  short: 1.1,
  base: 1.6,
  long: 2.2,
  hero: 2.6,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 42, filter: 'blur(10px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATIONS.base,
      delay: 0.06 * i,
      ease: EASE_CINE,
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATIONS.long, ease: EASE_CINE } },
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.18,
    },
  },
};

export const letterReveal = {
  hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATIONS.base, ease: EASE_CINE },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.965 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATIONS.long, ease: EASE_CINE },
  },
};

export const driftIn = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.long, ease: EASE_SOFT },
  },
};
