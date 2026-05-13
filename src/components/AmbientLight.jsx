import { motion } from 'framer-motion';
import useCoarsePointer from '../hooks/useCoarsePointer';

/**
 * Per-section volumetric haloes — "light through cathedral air".
 *
 * Desktop: each halo gently breathes (opacity loop).
 * Mobile : haloes are held static at their midpoint opacity. The
 *          warmth still anchors the section; constant repaints don't.
 */
export default function AmbientLight({ variant = 'top' }) {
  const coarse = useCoarsePointer();

  const halo = (style, range, duration) => (
    <motion.div
      className="halo"
      style={{ ...style, opacity: coarse ? range[1] : range[0] }}
      animate={coarse ? undefined : { opacity: range }}
      transition={
        coarse
          ? undefined
          : { duration, repeat: Infinity, ease: 'easeInOut' }
      }
    />
  );

  if (variant === 'top') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {halo(
          { width: 720, height: 720, top: -260, left: '50%', x: '-50%', background: 'rgba(216,194,154,0.4)' },
          [0.45, 0.7, 0.45],
          9
        )}
        {halo(
          { width: 520, height: 520, bottom: -120, right: -120, background: 'rgba(239,231,216,0.6)' },
          [0.35, 0.55, 0.35],
          11
        )}
        {halo(
          { width: 480, height: 480, top: '40%', left: -160, background: 'rgba(247,242,233,0.7)' },
          [0.35, 0.55, 0.35],
          13
        )}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {halo(
        { width: 540, height: 540, top: '20%', left: '60%', background: 'rgba(216,194,154,0.3)' },
        [0.3, 0.55, 0.3],
        12
      )}
      {halo(
        { width: 420, height: 420, top: '60%', left: '10%', background: 'rgba(239,231,216,0.6)' },
        [0.35, 0.55, 0.35],
        10
      )}
    </div>
  );
}
