import { motion } from 'framer-motion';
import { EASE_CINE } from '../animations/variants';

/**
 * A breath between scenes.
 *
 * Used sparingly to break the rhythm of stacked content sections —
 * a single italic line on negative space. No headings, no CTA, no
 * decoration except a hairline gold mark. Pure visual silence.
 */
export default function Interlude({ children, mark = true }) {
  return (
    <section
      aria-hidden="true"
      className="relative flex items-center justify-center px-6"
      style={{
        paddingTop: 'clamp(5rem, 12vh, 9rem)',
        paddingBottom: 'clamp(5rem, 12vh, 9rem)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 2.2, ease: EASE_CINE }}
        className="relative max-w-2xl text-center"
      >
        {mark && (
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1.6, ease: EASE_CINE, delay: 0.2 }}
            className="mx-auto block h-px w-16 origin-center bg-mutedgold/45"
          />
        )}
        <p className="italic-display mt-10 text-[clamp(1.25rem,2.6vw,1.85rem)] leading-[1.6] text-ink/65">
          {children}
        </p>
      </motion.div>
    </section>
  );
}
