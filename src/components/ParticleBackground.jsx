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
  const effectiveDensity = isCoarse ? Math.round(density * 0.55) : density;

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
        color: { value: ['#D8C29A', '#EFE7D8', '#FBF8F2'] },
        shape: { type: 'circle' },
        // Slightly more present, still translucent. Floor lifted so even
        // the dimmest motes are readable against ivory; ceiling raised
        // so the brightest read as gentle highlights, not dust.
        opacity: {
          value: { min: 0.22, max: 0.7 },
          animation: { enable: true, speed: 0.3, sync: false },
        },
        // A touch larger overall — keeps the cathedral-air scale
        // but lets the eye actually find them.
        size: {
          value: { min: 0.9, max: 3.2 },
        },
        // Soft warm glow around each particle so they read as light,
        // not points. Cheap because tsParticles draws this in canvas.
        shadow: {
          enable: true,
          color: '#F4E5C2',
          blur: 6,
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
            color: '#FFF6E0',
            // Slightly more frequent twinkle so the field feels alive
            frequency: 0.05,
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
