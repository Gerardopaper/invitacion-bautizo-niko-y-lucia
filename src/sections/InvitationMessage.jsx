import { motion } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import Divider from '../components/Divider';
import { fadeUp, stagger } from '../animations/variants';

export default function InvitationMessage() {
  return (
    <SectionFrame id="invitation" lightVariant="mid">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15%' }}
        className="flex flex-col items-center text-center"
      >
        <motion.div variants={fadeUp}>
          <Divider label="La Invitación" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-display mt-10 text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.05] text-ink max-w-3xl"
        >
          Hay momentos que el alma{' '}
          <span className="italic-display gold-text">recuerda para siempre.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-10 max-w-xl text-base sm:text-lg leading-relaxed text-ink/70 font-light"
        >
          Será un honor compartir contigo el día en que nuestros pequeños reciban
          el sacramento del bautismo —un instante íntimo, sagrado y luminoso,
          tejido entre familia, fe y agradecimiento.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="italic-display mt-10 text-xl sm:text-2xl text-ink/55"
        >
          “Dejad que los niños vengan a mí.”
          <span className="block eyebrow mt-4 text-mutedgold">Mateo 19:14</span>
        </motion.p>
      </motion.div>
    </SectionFrame>
  );
}
