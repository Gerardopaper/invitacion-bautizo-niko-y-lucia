import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Subtle emotional easter egg.
 *
 * When the FinalBlessing comes into view, a single luminous point
 * ascends very slowly from below, dims, and dissolves into the air
 * — a quiet "amen". Plays only once per visit, rewards attentive
 * users without ever calling attention to itself.
 */
export default function AscendingLight() {
  const ref = useRef(null);
  const [played, setPlayed] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (played || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            setPlayed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [played]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      <AnimatePresence>
        {active && (
          <motion.span
            key="ascend"
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              bottom: 0,
              width: 6,
              height: 6,
              background:
                'radial-gradient(circle, #FFF7E8 0%, rgba(255,247,232,0.85) 35%, rgba(216,194,154,0) 70%)',
              boxShadow:
                '0 0 18px rgba(255,247,232,0.85), 0 0 60px rgba(216,194,154,0.55)',
            }}
            initial={{ y: 0, opacity: 0, scale: 0.9 }}
            animate={{
              y: '-95vh',
              opacity: [0, 0.85, 0.85, 0],
              scale: [0.9, 1, 1.04, 1.2],
            }}
            transition={{
              duration: 9,
              ease: [0.32, 0.72, 0.18, 1],
              times: [0, 0.18, 0.78, 1],
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
