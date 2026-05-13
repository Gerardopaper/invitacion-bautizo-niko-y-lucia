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
        opacity: {
          value: { min: 0.08, max: 0.45 },
          animation: { enable: true, speed: 0.25, sync: false },
        },
        size: {
          value: { min: 0.6, max: 2.4 },
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
            color: '#FBF8F2',
            frequency: 0.025,
            opacity: 0.85,
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
