import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { EASE_CINE } from '../animations/variants';

/**
 * Optional ambient sound. User-controlled only — never autoplay.
 *
 * The audio file is intentionally kept out of the repo. Drop a seamless
 * loop at `public/audio/ambience.mp3` (cathedral air, distant choir,
 * soft bells — extremely subtle, ~ -24 dBFS). The toggle gracefully
 * no-ops if the file is missing.
 *
 * Volume is held very low and fades smoothly on mute/unmute so it never
 * draws attention to itself.
 */
const TARGET_VOLUME = 0.16;
const FADE_MS = 1400;

export default function AmbientAudio({ active = true }) {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Resolve against Vite's configured base URL so the file loads
    // correctly whether we're at "/" or at "/invitacion-bautizo-niko-y-lucia/"
    const a = new Audio(`${import.meta.env.BASE_URL}audio/ambience.mp3`);
    a.loop = true;
    a.preload = 'auto';
    a.volume = 0;
    a.addEventListener('canplaythrough', () => setReady(true), { once: true });
    a.addEventListener('error', () => setReady(false));
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const fadeTo = (target) => {
    const a = audioRef.current;
    if (!a) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const start = a.volume;
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / FADE_MS);
      // ease-in-out cubic
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      a.volume = start + (target - start) * eased;
      if (t < 1) fadeRef.current = requestAnimationFrame(step);
      else if (target === 0) a.pause();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (!enabled) {
      try {
        await a.play();
        setEnabled(true);
        fadeTo(TARGET_VOLUME);
      } catch {
        // playback blocked — stay off
      }
    } else {
      setEnabled(false);
      fadeTo(0);
    }
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.button
          key="audio-toggle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: EASE_CINE, delay: 1.2 }}
          onClick={toggle}
          aria-label={enabled ? 'Silenciar atmósfera' : 'Activar atmósfera sonora'}
          className="glass-card fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-full px-4 py-3 sm:bottom-7 sm:right-7"
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
        >
          <motion.span
            aria-hidden
            className="absolute -inset-2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(216,194,154,0.25) 0%, rgba(216,194,154,0) 70%)',
            }}
            animate={
              enabled
                ? { opacity: [0.4, 0.85, 0.4], scale: [1, 1.05, 1] }
                : { opacity: 0 }
            }
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="relative flex items-center gap-2 text-mutedgold">
            {enabled ? (
              <Volume2 size={14} strokeWidth={1.2} />
            ) : (
              <VolumeX size={14} strokeWidth={1.2} />
            )}
            <span className="eyebrow text-[0.55rem] text-ink/65">
              {enabled ? 'Atmósfera' : 'Silencio'}
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
