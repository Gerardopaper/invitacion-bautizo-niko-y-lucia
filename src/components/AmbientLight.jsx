import { motion } from 'framer-motion';

/**
 * Layered volumetric haloes — gives the page that "light through cathedral air" feel.
 */
export default function AmbientLight({ variant = 'top' }) {
  if (variant === 'top') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="halo bg-champagne/40"
          style={{ width: 720, height: 720, top: -260, left: '50%', x: '-50%' }}
          animate={{ opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="halo bg-pearl/60"
          style={{ width: 520, height: 520, bottom: -120, right: -120 }}
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="halo bg-warmwhite/70"
          style={{ width: 480, height: 480, top: '40%', left: -160 }}
          animate={{ opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="halo bg-champagne/30"
        style={{ width: 540, height: 540, top: '20%', left: '60%' }}
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="halo bg-pearl/60"
        style={{ width: 420, height: 420, top: '60%', left: '10%' }}
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
