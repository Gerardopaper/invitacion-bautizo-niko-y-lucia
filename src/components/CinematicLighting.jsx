import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Volumetric, scroll-reactive lighting layered behind everything.
 * Three soft haloes drift and breathe; their position and opacity
 * shift slowly as the page scrolls — like sunlight moving across
 * a cathedral throughout the day.
 *
 * Pure CSS radial-gradients. No images, no canvas, GPU-friendly.
 */
export default function CinematicLighting() {
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: 40,
    damping: 22,
    mass: 0.8,
  });

  useEffect(() => {
    const handler = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(max > 0 ? window.scrollY / max : 0);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [progress]);

  // Halo A — warm overhead light, drifts down-right as you scroll
  const aX = useTransform(smoothProgress, [0, 1], ['38%', '62%']);
  const aY = useTransform(smoothProgress, [0, 1], ['-8%', '18%']);
  const aOp = useTransform(smoothProgress, [0, 0.5, 1], [0.55, 0.7, 0.4]);

  // Halo B — counter-drift, slightly cooler ivory
  const bX = useTransform(smoothProgress, [0, 1], ['78%', '42%']);
  const bY = useTransform(smoothProgress, [0, 1], ['30%', '80%']);
  const bOp = useTransform(smoothProgress, [0, 0.5, 1], [0.4, 0.55, 0.65]);

  // Halo C — anchor light, low and warm, rises slightly
  const cX = useTransform(smoothProgress, [0, 1], ['12%', '28%']);
  const cY = useTransform(smoothProgress, [0, 1], ['110%', '70%']);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <motion.div
        className="absolute"
        style={{
          left: aX,
          top: aY,
          width: 'min(1200px, 110vw)',
          height: 'min(1200px, 110vw)',
          translateX: '-50%',
          translateY: '-50%',
          opacity: aOp,
          background:
            'radial-gradient(circle, rgba(216,194,154,0.42) 0%, rgba(216,194,154,0.18) 28%, rgba(251,248,242,0) 65%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{
          left: bX,
          top: bY,
          width: 'min(900px, 90vw)',
          height: 'min(900px, 90vw)',
          translateX: '-50%',
          translateY: '-50%',
          opacity: bOp,
          background:
            'radial-gradient(circle, rgba(239,231,216,0.55) 0%, rgba(239,231,216,0.18) 35%, rgba(251,248,242,0) 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{
          left: cX,
          top: cY,
          width: 'min(800px, 80vw)',
          height: 'min(800px, 80vw)',
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(216,194,154,0.32) 0%, rgba(216,194,154,0.1) 30%, rgba(251,248,242,0) 65%)',
          filter: 'blur(60px)',
        }}
        animate={{ opacity: [0.4, 0.65, 0.4], scale: [1, 1.06, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
