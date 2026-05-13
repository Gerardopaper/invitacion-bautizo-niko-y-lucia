import { motion } from 'framer-motion';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import SectionFrame from '../components/SectionFrame';
import Divider from '../components/Divider';
import { fadeUp, stagger } from '../animations/variants';
import { event } from '../config/event';

export default function RSVP() {
  const waLink = `https://wa.me/${event.whatsapp.phone}?text=${encodeURIComponent(
    event.whatsapp.message
  )}`;

  return (
    <SectionFrame id="rsvp" lightVariant="top">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15%' }}
        className="flex flex-col items-center text-center"
      >
        <motion.div variants={fadeUp}>
          <Divider label="Confirma tu Presencia" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display mt-10 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] text-ink max-w-2xl"
        >
          Tu presencia será nuestro <span className="italic-display gold-text">mayor regalo.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-ink/65 font-light"
        >
          Te pedimos confirmar tu asistencia para preparar con cariño cada
          detalle de la celebración.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="relative mt-14"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <motion.span
            aria-hidden
            className="absolute -inset-6 rounded-full bg-radial-warm"
            animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="btn-luxe group relative"
          >
            <MessageCircle size={18} strokeWidth={1.2} />
            <span>Confirmar por WhatsApp</span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.2}
              className="transition-transform duration-700 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-10 text-xs tracking-[0.32em] uppercase text-ink/45"
        >
          Antes del {event.dateLabel}
        </motion.p>
      </motion.div>
    </SectionFrame>
  );
}
