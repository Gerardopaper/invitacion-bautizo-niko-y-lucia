import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import SectionFrame from '../components/SectionFrame';
import Divider from '../components/Divider';
import { fadeUp, stagger } from '../animations/variants';
import { event } from '../config/event';

export default function Location() {
  return (
    <SectionFrame id="location" lightVariant="mid">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15%' }}
        className="flex flex-col items-center text-center"
      >
        <motion.div variants={fadeUp}>
          <Divider label="Ubicación" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display mt-10 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] text-ink max-w-2xl"
        >
          {event.church.name}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-4 text-sm tracking-[0.2em] uppercase text-ink/55"
        >
          {event.church.address}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative mt-16"
      >
        <div className="glass-card overflow-hidden p-2 sm:p-3">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px]">
            <iframe
              title="Mapa de la iglesia"
              src={event.church.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[0.95] saturate-[0.85]"
              style={{ border: 0, filter: 'sepia(0.18) brightness(1.02)' }}
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory/15 via-transparent to-ivory/25" />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={event.church.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-luxe group"
          >
            <MapPin size={16} strokeWidth={1.2} />
            <span>Abrir en Google Maps</span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.2}
              className="transition-transform duration-700 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
