import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GlowingCross from './GlowingCross';
import { EASE_CINE } from '../animations/variants';
import { event } from '../config/event';

/**
 * Cinematic opening interaction.
 *
 *  - The veil sits above everything in a calm ivory atmosphere.
 *  - A refined invocation invites the user to "open" the invitation.
 *  - On tap, two horizontal half-veils part outward (silk-curtain feel),
 *    revealing the page beneath. Scroll is locked until opened.
 *
 * No spectacle — just a slow, intentional unveiling.
 */
export default function OpeningVeil({ open, onOpen }) {
  // Lock body scroll while the veil is closed
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const [a, b] = event.babies;

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="veil-root"
          className="fixed inset-0 z-[100]"
          exit={{ opacity: 0, transition: { duration: 1.4, ease: EASE_CINE, delay: 1.4 } }}
        >
          {/* Two parting halves */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 origin-left"
            style={{
              background:
                'linear-gradient(110deg, #FBF8F2 0%, #F7F2E9 60%, #EFE7D8 100%)',
              boxShadow:
                'inset -1px 0 0 rgba(168,138,79,0.18), 30px 0 80px -30px rgba(75,55,30,0.18)',
            }}
            initial={{ x: 0 }}
            exit={{ x: '-100%', transition: { duration: 1.8, ease: EASE_CINE, delay: 0.1 } }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 origin-right"
            style={{
              background:
                'linear-gradient(250deg, #FBF8F2 0%, #F7F2E9 60%, #EFE7D8 100%)',
              boxShadow:
                'inset 1px 0 0 rgba(168,138,79,0.18), -30px 0 80px -30px rgba(75,55,30,0.18)',
            }}
            initial={{ x: 0 }}
            exit={{ x: '100%', transition: { duration: 1.8, ease: EASE_CINE, delay: 0.1 } }}
          />

          {/* Veil content (fades before halves part) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9, ease: EASE_CINE } }}
            transition={{ duration: 1.8, ease: EASE_CINE, delay: 0.4 }}
          >
            <div className="flex flex-col items-center text-center">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, ease: EASE_CINE, delay: 0.5 }}
                className="eyebrow"
              >
                Una celebración para recordar
              </motion.span>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.4, ease: EASE_CINE, delay: 0.8 }}
                className="gold-divider mt-7"
                style={{ width: 120 }}
              />

              <motion.h1
                initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 2, ease: EASE_CINE, delay: 1 }}
                className="font-display mt-10 text-[clamp(2.8rem,7vw,5rem)] leading-[0.98] text-ink"
              >
                {a}
                <span className="italic-display text-ink/55 text-[0.55em] tracking-[0.32em] px-4 align-middle">
                  &amp;
                </span>
                {b}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: EASE_CINE, delay: 1.6 }}
                className="mt-14"
              >
                <GlowingCross size={32} />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: EASE_CINE, delay: 2 }}
                onClick={onOpen}
                className="btn-luxe mt-14 group"
                aria-label="Abrir la invitación"
              >
                <span>Abrir la invitación</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
