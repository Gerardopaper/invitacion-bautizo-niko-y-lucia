import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import ParticleBackground from '../components/ParticleBackground';
import AmbientLight from '../components/AmbientLight';
import GlowingCross from '../components/GlowingCross';
import useMouseParallax from '../hooks/useMouseParallax';
import { event } from '../config/event';

export default function Hero() {
  const ref = useRef(null);
  const eyebrowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const parallax = useMouseParallax(10);

  // GSAP letter-by-letter reveal for the names
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-letter',
        { yPercent: 110, opacity: 0, filter: 'blur(10px)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.6,
          ease: 'expo.out',
          stagger: 0.06,
          delay: 1.2,
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const [a, b] = event.babies;

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <AmbientLight variant="top" />
      <ParticleBackground density={32} />
      <div className="cathedral-veil" />
      <div className="grain" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center"
      >
        <motion.div style={{ x: parallax.x, y: parallax.y }} className="flex flex-col items-center">
          <motion.p
            ref={eyebrowRef}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="eyebrow"
          >
            Sacramento del Bautismo
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="gold-divider mt-8"
            style={{ width: 120 }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, delay: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="italic-display mt-10 text-2xl sm:text-3xl text-ink/75"
          >
            Con la bendición de Dios
          </motion.h2>

          <GlowingCross size={44} className="mt-10" />

          <h1 className="font-display mt-10 text-[clamp(3.6rem,11vw,9rem)] leading-[0.95] text-ink">
            <HeroName text={a} />
            <span className="block italic-display text-ink/55 text-[0.42em] tracking-[0.36em] my-3 sm:my-5">
              &amp;
            </span>
            <HeroName text={b} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 2.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="mt-12 max-w-md text-xs sm:text-sm tracking-[0.3em] uppercase text-ink/55"
          >
            {event.dateLabel}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <span className="eyebrow text-[0.55rem]">Desliza</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-mutedgold/70 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function HeroName({ text }) {
  return (
    <span className="block overflow-hidden">
      <span className="inline-block">
        {text.split('').map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className="hero-letter inline-block will-change-transform"
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
