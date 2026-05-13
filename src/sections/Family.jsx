import { motion } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import Divider from '../components/Divider';
import { fadeUp, stagger } from '../animations/variants';
import { event } from '../config/event';

function NameBlock({ eyebrow, names }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center text-center"
    >
      <span className="eyebrow">{eyebrow}</span>
      <span className="gold-divider mt-5" style={{ width: 56 }} />
      <div className="mt-7 space-y-2">
        {names.map((n) => (
          <p
            key={n}
            className="font-display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight text-ink"
          >
            {n}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export default function Family() {
  return (
    <SectionFrame id="family" lightVariant="mid">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15%' }}
        className="flex flex-col items-center text-center"
      >
        <motion.div variants={fadeUp}>
          <Divider label="Familia" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display mt-10 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] text-ink max-w-3xl"
        >
          Quienes los acompañarán <span className="italic-display gold-text">en este camino.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12"
      >
        <NameBlock eyebrow="Padres" names={event.parents} />
        <NameBlock eyebrow="Padrinos" names={event.godparents} />
      </motion.div>
    </SectionFrame>
  );
}
