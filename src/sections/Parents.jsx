import { motion } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import { fadeUp, stagger } from '../animations/variants';
import { event } from '../config/event';

/**
 * A quiet pause for the family at the center of the celebration.
 *
 * Deliberately not a "parents card": the heading sits low and to the
 * left while the two names drift large and airy toward the opposite
 * margin — an asymmetric editorial breath, no boxes, no heavy rules.
 * The names carry the emotion; the words stay few.
 */
export default function Parents() {
  const [first, second] = event.parents;

  return (
    <SectionFrame id="parents" lightVariant="top">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15%' }}
        className="mx-auto max-w-4xl"
      >
        <motion.div variants={fadeUp} className="max-w-md">
          <span className="eyebrow">Sus padres</span>
          <h2 className="font-display mt-7 text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.12] text-ink balance">
            Esta alegría <span className="italic-display gold-text">empieza en casa.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-[1.85] text-ink/75 font-light pretty">
            Y hoy queremos compartirla contigo.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-24 flex flex-col items-center gap-6 text-center sm:mt-32 sm:items-end sm:pl-[12%] sm:text-right"
        >
          <p className="font-display text-[clamp(2.1rem,5.4vw,3.6rem)] leading-[1.1] text-ink balance">
            {first}
          </p>
          <span className="italic-display text-xl text-ink/35">y</span>
          <p className="font-display text-[clamp(2.1rem,5.4vw,3.6rem)] leading-[1.1] text-ink balance">
            {second}
          </p>
        </motion.div>
      </motion.div>
    </SectionFrame>
  );
}
