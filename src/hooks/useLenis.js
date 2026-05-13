import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Cinematic smooth scroll. When `paused` is true (e.g. during opening veil),
 * the instance is destroyed and scroll restored to native so wheel/touch
 * events don't accumulate.
 */
export default function useLenis(paused = false) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || paused) return;

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out quart
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.95,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [paused]);
}
