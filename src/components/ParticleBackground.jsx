import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

/**
 * Ambient cathedral-air particles. Sparse, slow, translucent.
 * Designed for atmosphere, not spectacle.
 */
export default function ParticleBackground({ density = 28 }) {
  const [ready, setReady] = useState(false);
  // Mobile/GPU-constrained devices receive a quieter sky
  const isCoarse =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;
  const effectiveDensity = isCoarse ? Math.round(density * 0.72) : density;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: effectiveDensity, density: { enable: true, area: 1100 } },
        // Dropped the near-ivory white (it vanished against the
        // background) for deeper champagne tones — more contrast,
        // still warm and elegant, kinder to low-vision guests.
        color: { value: ['#C9AE78', '#D8C29A', '#E7D6B0'] },
        shape: { type: 'circle' },
        // More present and readable. Floor raised so even the dimmest
        // motes register; ceiling near-solid so the brightest read
        // clearly as points of light without looking like confetti.
        opacity: {
          value: { min: 0.42, max: 0.95 },
          animation: { enable: true, speed: 0.3, sync: false },
        },
        // Larger overall so they're easy to find, while the slow
        // drift keeps the cathedral-air feeling intact.
        size: {
          value: { min: 1.4, max: 4.4 },
        },
        // Stronger warm halo so each mote reads as glowing light
        // rather than a faint dot — improves perceptibility.
        shadow: {
          enable: true,
          color: '#EAD6A4',
          blur: 9,
          offset: { x: 0, y: 0 },
        },
        move: {
          enable: true,
          direction: 'top',
          speed: { min: 0.12, max: 0.45 },
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
        twinkle: {
          particles: {
            enable: true,
            color: '#FFF1CF',
            // A little more twinkle so the field stays alive and
            // catches a wandering eye, without becoming sparkly.
            frequency: 0.07,
            opacity: 1,
          },
        },
      },
      interactivity: {
        events: { onHover: { enable: false }, onClick: { enable: false } },
      },
    }),
    [effectiveDensity]
  );

  if (!ready) return null;

  return (
    <Particles
      id="ambient-particles"
      options={options}
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
