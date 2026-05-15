import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useCoarsePointer from '../hooks/useCoarsePointer';

/**
 * Volumetric, scroll-reactive lighting layered behind everything.
 *
 * Desktop  — three haloes, large blur radii, slow breathing scale loops.
 * Mobile   — two haloes, half the blur radius, no scale animation.
 *            (large `filter: blur()` regions and concurrent animated
 *            transforms are the heaviest part of this layer on phones.)
 *
 * Pure CSS radial-gradients, GPU-friendly. The drift is still tied to
 * scroll so the cathedral-light feeling holds even after simplification.
 */
export default function CinematicLighting() {
  const coarse = useCoarsePointer();

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

  const aX = useTransform(smoothProgress, [0, 1], ['38%', '62%']);
  const aY = useTransform(smoothProgress, [0, 1], ['-8%', '18%']);
  const aOp = useTransform(smoothProgress, [0, 0.5, 1], [0.55, 0.7, 0.4]);

  const bX = useTransform(smoothProgress, [0, 1], ['78%', '42%']);
  const bY = useTransform(smoothProgress, [0, 1], ['30%', '80%']);
  const bOp = useTransform(smoothProgress, [0, 0.5, 1], [0.4, 0.55, 0.65]);

  const cX = useTransform(smoothProgress, [0, 1], ['12%', '28%']);
  const cY = useTransform(smoothProgress, [0, 1], ['110%', '70%']);

  // Mobile-tuned blur radii. Phones pay roughly O(blur²) on these
  // because the fragments cover most of the viewport.
  const blurA = coarse ? 22 : 40;
  const blurB = coarse ? 24 : 50;
  const blurC = coarse ? 28 : 60;

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
          filter: `blur(${blurA}px)`,
        }}
        // Breathing scale loop is the costliest animation here. Keep it
        // on desktop only — mobile gets the drift, not the breath.
        animate={coarse ? undefined : { scale: [1, 1.04, 1] }}
        transition={
          coarse
            ? undefined
            : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
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
          filter: `blur(${blurB}px)`,
        }}
        animate={coarse ? undefined : { scale: [1, 1.05, 1] }}
        transition={
          coarse
            ? undefined
            : { duration: 17, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      {/* Third halo: desktop only. This is the lone olive-tinted
          light — a grounding, low anchor glow that gives the
          atmosphere subtle organic depth without reading green. */}
      {!coarse && (
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
              'radial-gradient(circle, rgba(130,128,90,0.26) 0%, rgba(130,128,90,0.09) 32%, rgba(251,248,242,0) 66%)',
            filter: `blur(${blurC}px)`,
          }}
          animate={{ opacity: [0.4, 0.65, 0.4], scale: [1, 1.06, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}
