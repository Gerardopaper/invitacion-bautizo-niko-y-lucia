import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function diff(targetDate) {
  const total = Math.max(0, targetDate.getTime() - Date.now());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds, total };
}

export default function CountdownTimer({ targetDate }) {
  const [time, setTime] = useState(() => diff(targetDate));
  const { ref, inView } = useInView({ rootMargin: '120px 0px', threshold: 0 });

  // Only tick (and re-render every second) while the timer is on
  // screen. Off-screen it freezes; it re-syncs the instant it returns.
  useEffect(() => {
    if (!inView) return;
    setTime(diff(targetDate));
    const id = setInterval(() => setTime(diff(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate, inView]);

  const items = [
    { label: 'Días', value: time.days },
    { label: 'Horas', value: time.hours },
    { label: 'Minutos', value: time.minutes },
    { label: 'Segundos', value: time.seconds },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-5"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="glass-card flex min-w-[78px] flex-col items-center justify-center px-5 py-5 sm:min-w-[110px] sm:px-7 sm:py-6"
        >
          <span className="font-display text-4xl sm:text-5xl text-ink leading-none tabular-nums">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="eyebrow mt-3 text-[0.66rem] sm:text-[0.72rem]">
            {item.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
