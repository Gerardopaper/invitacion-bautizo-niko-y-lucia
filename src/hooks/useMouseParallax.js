import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Subtle depth-response hook.
 *  - Desktop: pointer movement
 *  - Mobile: device tilt (gyroscope), with touch-move fallback
 *
 * Returns spring-smoothed x/y motion values for layered translation.
 * Reduced-motion users get a frozen origin (no movement).
 */
export default function useMouseParallax(strength = 12) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 38, damping: 22, mass: 0.9 });
  const sy = useSpring(y, { stiffness: 38, damping: 22, mass: 0.9 });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    const setNorm = (nx, ny) => {
      // Clamp to [-1, 1] then scale
      const cx = Math.max(-1, Math.min(1, nx));
      const cy = Math.max(-1, Math.min(1, ny));
      x.set(cx * strength);
      y.set(cy * strength);
    };

    let cleanup = () => {};

    if (!isCoarse) {
      const onMove = (e) => {
        const cxCenter = window.innerWidth / 2;
        const cyCenter = window.innerHeight / 2;
        setNorm(
          (e.clientX - cxCenter) / cxCenter,
          (e.clientY - cyCenter) / cyCenter
        );
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      cleanup = () => window.removeEventListener('mousemove', onMove);
    } else {
      // Mobile: prefer device orientation for ambient tilt
      const onOrient = (e) => {
        // beta: front-back (-180..180), gamma: left-right (-90..90)
        const gx = (e.gamma ?? 0) / 25; // tighter range = smaller motion
        const gy = ((e.beta ?? 0) - 45) / 35; // bias toward typical hold angle
        setNorm(gx, gy);
      };
      const onTouchMove = (e) => {
        const t = e.touches?.[0];
        if (!t) return;
        const cxCenter = window.innerWidth / 2;
        const cyCenter = window.innerHeight / 2;
        setNorm(
          (t.clientX - cxCenter) / cxCenter,
          (t.clientY - cyCenter) / cyCenter
        );
      };

      window.addEventListener('deviceorientation', onOrient, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      cleanup = () => {
        window.removeEventListener('deviceorientation', onOrient);
        window.removeEventListener('touchmove', onTouchMove);
      };
    }

    return cleanup;
  }, [x, y, strength]);

  return { x: sx, y: sy };
}
