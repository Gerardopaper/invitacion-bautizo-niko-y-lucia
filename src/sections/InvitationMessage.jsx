import { motion } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import { fadeUp, stagger } from '../animations/variants';

/**
 * Asymmetric editorial composition.
 * Eyebrow + verse sit left-aligned on the margin; the main statement
 * occupies the right column with luxurious whitespace.
 */
export default function InvitationMessage() {
  return (
    <SectionFrame id="invitation" lightVariant="mid">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12%' }}
        className="grid grid-cols-12 gap-y-12 sm:gap-y-0 sm:gap-x-10"
      >
        <motion.div
          variants={fadeUp}
          className="col-span-12 sm:col-span-4 sm:pt-3"
        >
          <span className="eyebrow">La Invitación</span>
          <span className="gold-divider mt-6 block" style={{ width: 48 }} />
          <p className="italic-display mt-10 text-xl sm:text-2xl text-ink/55 leading-snug balance">
            “Dejad que los niños vengan a mí.”
          </p>
          <p className="eyebrow mt-5 text-mutedgold">Mateo 19:14</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="col-span-12 sm:col-span-8 sm:pl-4"
        >
          <h2 className="font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[1.02] text-ink balance">
            La gracia ya fue dada;
            <span className="italic-display gold-text"> ahora la celebramos.</span>
          </h2>

          <p className="mt-10 max-w-xl text-base sm:text-lg leading-[1.85] text-ink/70 font-light pretty">
            El agua del bautismo ya se derramó sobre Lucia y Niko. Lo que
            sigue es la parte que se comparte: una tarde para reunirnos,
            agradecer y guardar juntos —entre los nuestros— este recuerdo
            luminoso.
          </p>
        </motion.div>
      </motion.div>
    </SectionFrame>
  );
}
