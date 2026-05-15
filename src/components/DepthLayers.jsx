import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useCoarsePointer from '../hooks/useCoarsePointer';

/**
 * Three parallax depth layers that establish atmospheric dimensionality
 * without obvious parallax gimmicks.
 *
 *   • Distant — barely-perceptible warm glow far behind everything
 *   • Mid — soft cathedral haze (large diffused gradient)
 *   • Foreground — a few slow floating dust motes drifting in front
 *
 * Each layer moves at a different fraction of scroll, creating depth
 * separation while staying restrained. All elements respect reduced-motion.
 */
const DUST = [
  { x: '12%', size: 5, delay: 0, dur: 22, opacity: 0.62 },
  { x: '28%', size: 3, delay: 4, dur: 28, opacity: 0.5 },
  { x: '47%', size: 4, delay: 8, dur: 26, opacity: 0.56 },
  { x: '64%', size: 3, delay: 2, dur: 30, opacity: 0.44 },
  { x: '82%', size: 5, delay: 6, dur: 24, opacity: 0.68 },
  { x: '92%', size: 3, delay: 10, dur: 28, opacity: 0.5 },
];

export default function DepthLayers() {
  const coarse = useCoarsePointer();
  // Mobile: 3 motes instead of 6. Concurrent infinite animations are
  // a major cause of stutter during scroll; halving them is invisible.
  const motes = coarse ? DUST.filter((_, i) => i % 2 === 0) : DUST;
  // Mobile: drop the foreground dust scroll-parallax binding (kept
  // for desktop). The drifting Y on each mote is the work that
  // matters; the layer-level Y just doubles cost without showing.

  const scroll = useMotionValue(0);
  const smooth = useSpring(scroll, { stiffness: 40, damping: 26, mass: 0.9 });

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.set(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [scroll]);

  const distantY = useTransform(smooth, [0, 1], ['0%', '-6%']);
  const midY = useTransform(smooth, [0, 1], ['0%', '-14%']);
  const dustY = useTransform(smooth, [0, 1], ['0%', '-22%']);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {/* Distant — soft warm halo deep behind */}
      <motion.div
        className="absolute -inset-x-[10%] top-[-8%] h-[60%]"
        style={{
          y: distantY,
          background:
            'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(216,194,154,0.26) 0%, rgba(216,194,154,0) 70%)',
          filter: coarse ? 'blur(10px)' : 'blur(20px)',
        }}
      />
      {/* Mid — cathedral haze, with a barely-there olive undertone
          so the depth between layers feels organic, not just warm. */}
      <motion.div
        className="absolute -inset-x-[5%] top-[30%] h-[70%]"
        style={{
          y: midY,
          background:
            'radial-gradient(ellipse 60% 50% at 60% 40%, rgba(239,231,216,0.44) 0%, rgba(160,158,120,0.17) 45%, rgba(239,231,216,0) 72%)',
          filter: coarse ? 'blur(14px)' : 'blur(28px)',
        }}
      />
      {/* Foreground — slow drifting dust motes */}
      <motion.div
        className="absolute inset-0"
        style={coarse ? undefined : { y: dustY }}
      >
        {motes.map((d, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: d.x,
              top: '100%',
              width: d.size,
              height: d.size,
              background: 'rgba(255,247,232,0.85)',
              boxShadow: '0 0 8px rgba(216,194,154,0.6)',
              opacity: d.opacity,
            }}
            animate={{
              y: ['0vh', '-120vh'],
              opacity: [0, d.opacity, d.opacity, 0],
            }}
            transition={{
              duration: d.dur,
              repeat: Infinity,
              ease: 'linear',
              delay: d.delay,
              times: [0, 0.15, 0.85, 1],
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
