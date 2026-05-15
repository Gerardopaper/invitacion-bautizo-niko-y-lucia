import { motion } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import { fadeUp, stagger } from '../animations/variants';
import { event } from '../config/event';

/**
 * Godparents only. There is no ceremony block anymore — this section
 * simply honors the padrinos who accompany Lucia and Niko in faith.
 */
export default function Family() {
  return (
    <SectionFrame id="family" lightVariant="mid">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12%' }}
        className="grid grid-cols-12 items-center gap-y-14 sm:gap-x-16"
      >
        <motion.div variants={fadeUp} className="col-span-12 sm:col-span-5">
          <span className="eyebrow">Padrinos</span>
          <h2 className="font-display mt-6 text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-ink balance">
            Quienes los acompañan{' '}
            <span className="italic-display gold-text">en la fe.</span>
          </h2>
          <p className="mt-7 max-w-sm text-sm sm:text-base leading-[1.85] text-ink/60 font-light pretty">
            Manos elegidas para guiar, cuidar y rezar por ellos a lo largo
            del camino.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="col-span-12 flex flex-col gap-10 sm:col-span-7 sm:items-end sm:text-right"
        >
          <span className="gold-divider block" style={{ width: 56 }} />
          <div className="space-y-7">
            {event.godparents.map((name) => (
              <p
                key={name}
                className="font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.15] text-ink balance"
              >
                {name}
              </p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionFrame>
  );
}
