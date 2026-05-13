import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    const id = setInterval(() => setTime(diff(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const items = [
    { label: 'Días', value: time.days },
    { label: 'Horas', value: time.hours },
    { label: 'Minutos', value: time.minutes },
    { label: 'Segundos', value: time.seconds },
  ];

  return (
    <motion.div
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
          <span className="eyebrow mt-3 text-[0.6rem] sm:text-[0.65rem]">
            {item.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
