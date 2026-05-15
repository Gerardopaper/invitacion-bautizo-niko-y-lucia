import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useCoarsePointer from '../hooks/useCoarsePointer';

/**
 * Per-section volumetric haloes — "light through cathedral air".
 *
 * Desktop, in view : each halo gently breathes (opacity loop).
 * Offscreen        : the loop is suspended — a section you can't see
 *                    has no reason to repaint every frame. This is the
 *                    single biggest idle-cost win across ~12 sections.
 * Mobile           : held static at midpoint; the warmth anchors the
 *                    section, constant repaints don't.
 *
 * When suspended the halo rests at its bright midpoint, so the moment
 * it scrolls into view it already looks right and simply starts to
 * breathe — visually identical to before, minus the wasted frames.
 */
export default function AmbientLight({ variant = 'top' }) {
  const coarse = useCoarsePointer();
  const { ref, inView } = useInView({
    rootMargin: '200px 0px',
    threshold: 0,
  });
  const active = inView && !coarse;

  const halo = (style, range, duration) => (
    <motion.div
      className="halo"
      style={{ ...style, opacity: active ? range[0] : range[1] }}
      animate={active ? { opacity: range } : undefined}
      transition={
        active ? { duration, repeat: Infinity, ease: 'easeInOut' } : undefined
      }
    />
  );

  if (variant === 'top') {
    return (
      <div
        ref={ref}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {halo(
          { width: 720, height: 720, top: -260, left: '50%', x: '-50%', background: 'rgba(216,194,154,0.52)' },
          [0.6, 0.86, 0.6],
          9
        )}
        {halo(
          { width: 520, height: 520, bottom: -120, right: -120, background: 'rgba(239,231,216,0.74)' },
          [0.48, 0.7, 0.48],
          11
        )}
        {/* One olive-tinted halo per section — grounding warmth,
            discovered rather than announced. */}
        {halo(
          { width: 480, height: 480, top: '40%', left: -160, background: 'rgba(140,138,98,0.6)' },
          [0.4, 0.6, 0.4],
          13
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {halo(
        { width: 540, height: 540, top: '20%', left: '60%', background: 'rgba(216,194,154,0.42)' },
        [0.42, 0.72, 0.42],
        12
      )}
      {halo(
        { width: 420, height: 420, top: '60%', left: '10%', background: 'rgba(150,148,108,0.54)' },
        [0.4, 0.6, 0.4],
        10
      )}
    </div>
  );
}
