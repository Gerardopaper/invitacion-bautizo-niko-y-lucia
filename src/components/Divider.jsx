import { motion } from 'framer-motion';

export default function Divider({ label, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
      className={`flex items-center justify-center gap-5 ${className}`}
    >
      <span className="gold-divider" />
      {label && (
        <span className="eyebrow whitespace-nowrap">{label}</span>
      )}
      <span className="gold-divider" />
    </motion.div>
  );
}
