import { motion } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import GlowingCross from '../components/GlowingCross';
import ParticleBackground from '../components/ParticleBackground';
import AscendingLight from '../components/AscendingLight';
import { fadeUp, stagger } from '../animations/variants';
import { event } from '../config/event';

export default function FinalBlessing() {
  const [a, b] = event.babies;

  return (
    <SectionFrame id="blessing" lightVariant="top" className="!py-[18vh]">
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <ParticleBackground density={22} />
      </div>
      <AscendingLight />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div variants={fadeUp}>
          <GlowingCross size={48} />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="italic-display mt-12 text-[clamp(1.6rem,3.6vw,2.6rem)] leading-relaxed text-ink/75 max-w-3xl"
        >
          “Que el Señor los bendiga y los guarde; haga resplandecer su rostro
          sobre ellos y les conceda la paz.”
        </motion.p>

        <motion.span
          variants={fadeUp}
          className="eyebrow mt-6 text-mutedgold"
        >
          Números 6:24–26
        </motion.span>

        <motion.div variants={fadeUp} className="gold-divider mt-16" style={{ width: 140 }} />

        <motion.h3
          variants={fadeUp}
          className="font-display mt-12 text-[clamp(2.8rem,7vw,5rem)] leading-[1] text-ink"
        >
          {a}{' '}
          <span className="italic-display text-ink/55 text-[0.6em] align-middle px-3">
            &amp;
          </span>{' '}
          {b}
        </motion.h3>

        <motion.p
          variants={fadeUp}
          className="mt-8 text-xs sm:text-sm tracking-[0.36em] uppercase text-ink/45"
        >
          Con amor · {event.dateLabel}
        </motion.p>
      </motion.div>
    </SectionFrame>
  );
}
