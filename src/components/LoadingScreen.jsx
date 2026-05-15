import { AnimatePresence, motion } from 'framer-motion';
import GlowingCross from './GlowingCross';
import { EASE_CINE } from '../animations/variants';

/**
 * Calm sacred loader. No progress bar, no spinner.
 * A glowing cross breathes against ivory while fonts/assets settle,
 * then dissolves into the page.
 */
export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 1.6, ease: EASE_CINE }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ivory"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: EASE_CINE }}
            className="flex flex-col items-center"
          >
            <GlowingCross size={40} />
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 0.7, 0.45, 0.7] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.4,
              }}
              className="eyebrow mt-10 text-mutedgoldDeep"
            >
              In Nomine Patris
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
