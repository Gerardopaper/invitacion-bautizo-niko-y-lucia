import { motion, AnimatePresence } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import useGuest from '../hooks/useGuest';
import { fadeUp, stagger, EASE_CINE } from '../animations/variants';

function spotsLine(n) {
  if (!n || n < 1) return 'Hemos preparado un lugar para ustedes.';
  if (n === 1) return 'Hemos preparado un lugar para ti.';
  return `Hemos guardado ${n} lugares para ustedes.`;
}

/**
 * Personalized "Invitados" — a quiet, prepared-for-you moment.
 *
 * Reads the resolved guest record and presents the family name and
 * the people invited as an editorial composition: no tables, no
 * grids, no counters. The reserved places are phrased as warmth,
 * never as tickets. Missing/unknown links fall back to an elegant
 * private state with the same atmosphere.
 */
export default function Guests() {
  const { status, guest } = useGuest();

  // Some records carry only a family name and a number of places —
  // the individual guest names may be unknown. Keep only real,
  // non-empty strings; if none, the names block is omitted entirely
  // and the rest of the section (family, message, places) stays.
  const names =
    guest && Array.isArray(guest.guests)
      ? guest.guests
          .filter((n) => typeof n === 'string' && n.trim() !== '')
          .map((n) => n.trim())
      : [];

  return (
    <SectionFrame id="guests" lightVariant="mid">
      <div className="mx-auto flex min-h-[42vh] max-w-3xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {status === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: EASE_CINE }}
            >
              <span className="eyebrow text-ink/65">Preparando tu invitación</span>
            </motion.div>
          )}

          {status === 'private' && (
            <motion.div
              key="private"
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.span variants={fadeUp} className="eyebrow">
                Invitación privada
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-8 text-[clamp(2rem,5vw,3.4rem)] leading-[1.1] text-ink balance"
              >
                Esta invitación es <span className="italic-display gold-text">personal.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-md text-base sm:text-lg leading-[1.85] text-ink/75 font-light pretty"
              >
                Por favor utiliza el enlace que compartimos contigo.
              </motion.p>
            </motion.div>
          )}

          {status === 'found' && guest && (
            <motion.div
              key="found"
              variants={stagger}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.span variants={fadeUp} className="eyebrow">
                Reservado para
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="font-display mt-8 text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[1.05] text-ink balance"
              >
                {guest.family_name}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-md text-base sm:text-lg leading-[1.85] text-ink/75 font-light pretty"
              >
                Con cariño hemos pensado en ustedes para esta tarde.
              </motion.p>

              {names.length > 0 && (
                <>
                  <motion.span
                    variants={fadeUp}
                    className="gold-divider mt-14 block"
                    style={{ width: 56 }}
                  />
                  <motion.ul
                    variants={stagger}
                    className="mt-12 flex flex-col items-center gap-5"
                  >
                    {names.map((name) => (
                      <motion.li
                        key={name}
                        variants={fadeUp}
                        className="font-display text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.15] text-ink/90"
                      >
                        {name}
                      </motion.li>
                    ))}
                  </motion.ul>
                </>
              )}

              <motion.p
                variants={fadeUp}
                className="font-display mt-16 text-[clamp(1.3rem,3.4vw,1.9rem)] leading-snug text-ink/80 balance"
              >
                {spotsLine(guest.reserved_spots)}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionFrame>
  );
}
