import { motion } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import { fadeUp, stagger } from '../animations/variants';
import { event } from '../config/event';

function NameColumn({ eyebrow, names, align = 'left' }) {
  const alignClass = align === 'right' ? 'sm:items-end sm:text-right' : 'sm:items-start sm:text-left';
  return (
    <motion.div
      variants={fadeUp}
      className={`flex flex-col items-center text-center ${alignClass}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <span className="gold-divider mt-5 block" style={{ width: 48 }} />
      <div className="mt-8 space-y-3">
        {names.map((n) => (
          <p
            key={n}
            className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.15] text-ink balance"
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
        viewport={{ once: true, margin: '-12%' }}
        className="grid grid-cols-12 gap-y-14 sm:gap-x-16"
      >
        <motion.div variants={fadeUp} className="col-span-12 sm:col-span-5">
          <span className="eyebrow">Familia</span>
          <h2 className="font-display mt-6 text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-ink balance">
            Quienes los acompañarán <span className="italic-display gold-text">en este camino.</span>
          </h2>
        </motion.div>

        <div className="col-span-12 sm:col-span-7 sm:pt-6 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
          <NameColumn eyebrow="Padres" names={event.parents} align="left" />
          <NameColumn eyebrow="Padrinos" names={event.godparents} align="right" />
        </div>
      </motion.div>
    </SectionFrame>
  );
}
