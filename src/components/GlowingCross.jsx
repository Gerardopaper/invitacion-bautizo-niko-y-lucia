import { motion } from 'framer-motion';
import useCoarsePointer from '../hooks/useCoarsePointer';

export default function GlowingCross({ size = 56, className = '' }) {
  const coarse = useCoarsePointer();
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
      style={{ width: size, height: size * 1.5 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(216,194,154,0.55) 0%, rgba(216,194,154,0) 70%)',
          opacity: coarse ? 0.75 : undefined,
        }}
        animate={coarse ? undefined : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={
          coarse
            ? undefined
            : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <svg
        viewBox="0 0 24 36"
        width={size}
        height={size * 1.5}
        className="relative"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="crossGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8C29A" />
            <stop offset="50%" stopColor="#B89A66" />
            <stop offset="100%" stopColor="#A88A4F" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>
        <g filter="url(#softGlow)">
          <rect
            x="10.6"
            y="2"
            width="2.8"
            height="32"
            rx="1"
            fill="url(#crossGrad)"
          />
          <rect
            x="4"
            y="10.6"
            width="16"
            height="2.8"
            rx="1"
            fill="url(#crossGrad)"
          />
        </g>
      </svg>
    </motion.div>
  );
}
