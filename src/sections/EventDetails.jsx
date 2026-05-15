import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import SectionFrame from '../components/SectionFrame';
import Divider from '../components/Divider';
import CountdownTimer from '../components/CountdownTimer';
import { fadeUp, stagger } from '../animations/variants';
import { event } from '../config/event';

const items = [
  {
    icon: Calendar,
    label: 'Fecha',
    value: event.dateLabel,
  },
  {
    icon: Clock,
    label: 'Hora',
    value: event.timeLabel,
  },
  {
    icon: MapPin,
    label: 'Lugar',
    value: event.venue.name,
  },
];

export default function EventDetails() {
  return (
    <SectionFrame id="details" lightVariant="top">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15%' }}
        className="flex flex-col items-center text-center"
      >
        <motion.div variants={fadeUp}>
          <Divider label="La Celebración" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display mt-10 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] text-ink max-w-2xl"
        >
          Una tarde <span className="italic-display gold-text">para celebrarlos.</span>
        </motion.h2>

        <motion.div variants={fadeUp} className="mt-14 w-full">
          <CountdownTimer targetDate={event.date} />
        </motion.div>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3"
      >
        {items.map(({ icon: Icon, label, value }, i) => (
          <motion.div
            key={label}
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -6, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }}
            className="glass-card group relative flex flex-col items-start gap-4 p-8 sm:p-10"
          >
            <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-radial-warm" />
            <Icon size={22} strokeWidth={1.3} className="text-mutedgoldDeep" />
            <span className="eyebrow">{label}</span>
            <p className="font-display text-2xl sm:text-3xl text-ink leading-tight">
              {value}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionFrame>
  );
}
