import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import useCoarsePointer from '../hooks/useCoarsePointer';
import { portraits } from '../config/event';
import { EASE_CINE, EASE_SOFT } from '../animations/variants';

/**
 * Two real portraits, each given its own cinematic moment.
 *
 * This is deliberately NOT a gallery grid. It reads as a luxury
 * editorial spread: a portrait on one side, the child's name set
 * large on the other, a hairline rule and a single intimate line.
 * The two moments alternate sides and interlace vertically so the
 * page never feels like "two images in a row".
 *
 * The dreamlike treatment (feathered plate, atmospheric veil, soft
 * bloom) is preserved on desktop and automatically simplified on
 * coarse-pointer devices via the global mobile CSS pass.
 */
function PortraitMoment({ portrait, index, coarse }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const enableParallax = !coarse && !reduce;

  const { scrollYProgress } = useScroll({
    target: enableParallax ? ref : { current: null },
    offset: ['start end', 'end start'],
  });
  // Gentle, slow vertical drift — opposite directions per portrait
  const plateY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax
      ? portrait.side === 'left'
        ? ['5%', '-5%']
        : ['-5%', '5%']
      : ['0%', '0%']
  );
  // The name drifts a touch slower than the image — quiet depth
  const nameY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? ['18%', '-18%'] : ['0%', '0%']
  );

  // Image is always first in the DOM (best emotional impact on mobile
  // where everything stacks). On desktop, a right-side portrait flips
  // visually via fl/grid order — no duplicated DOM, single ref.
  const imageOrder = portrait.side === 'left' ? 'sm:order-1' : 'sm:order-2';
  const textOrder = portrait.side === 'left' ? 'sm:order-2' : 'sm:order-1';

  const ImageCol = (
    <motion.figure
      ref={ref}
      initial={
        coarse
          ? { opacity: 0, y: 26 }
          : { opacity: 0, y: 60, filter: 'blur(14px)' }
      }
      whileInView={
        coarse
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: coarse ? 1.2 : 2.4, ease: EASE_CINE }}
      className={`editorial-image ${portrait.aspect} ${imageOrder} relative col-span-12 w-full sm:col-span-7`}
    >
      {!coarse && <div className="editorial-image__veil" />}
      <motion.div
        className="editorial-image__plate"
        style={enableParallax ? { y: plateY } : undefined}
        transition={{ ease: EASE_SOFT }}
      >
        <img
          src={portrait.src}
          alt={portrait.alt}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          sizes="(max-width: 640px) 92vw, 56vw"
        />
        {!coarse && <div className="editorial-image__bloom" />}
      </motion.div>
    </motion.figure>
  );

  const TextCol = (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{
        duration: coarse ? 1.2 : 2,
        ease: EASE_CINE,
        delay: coarse ? 0.05 : 0.2,
      }}
      className={`col-span-12 flex flex-col justify-center sm:col-span-5 ${textOrder} ${
        portrait.side === 'left'
          ? 'sm:items-start sm:text-left'
          : 'sm:items-end sm:text-right'
      } items-center text-center`}
    >
      <motion.h3
        style={enableParallax ? { y: nameY } : undefined}
        className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] text-ink"
      >
        {portrait.name}
      </motion.h3>
      <span
        className={`gold-divider mt-8 block ${
          portrait.side === 'right' ? 'sm:ml-auto' : ''
        }`}
        style={{ width: 56 }}
      />
    </motion.div>
  );

  return (
    <div
      className={
        // Interlace the two moments vertically so the spread breathes
        index === 1 ? 'mt-24 sm:mt-40 lg:mt-52' : ''
      }
    >
      <div className="grid grid-cols-12 items-center gap-y-10 sm:gap-x-12 lg:gap-x-20">
        {ImageCol}
        {TextCol}
      </div>
    </div>
  );
}

export default function Gallery() {
  const coarse = useCoarsePointer();

  return (
    <SectionFrame id="gallery" lightVariant="mid">
      {/* Opening of the spread */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: coarse ? 1.2 : 2, ease: EASE_CINE }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="eyebrow">Retratos</span>
        <span className="gold-divider mx-auto mt-6 block" style={{ width: 56 }} />
        <h2 className="font-display mt-8 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] text-ink balance">
          Lucia <span className="italic-display gold-text">&amp;</span> Niko
        </h2>
        <p className="mx-auto mt-8 max-w-md text-sm sm:text-base leading-[1.85] text-ink/60 font-light pretty">
          Dos retratos de estos días, para mirar con calma.
        </p>
      </motion.div>

      {/* Two cinematic portrait moments */}
      <div className="mt-24 sm:mt-32 lg:mt-40">
        {portraits.map((portrait, i) => (
          <PortraitMoment
            key={portrait.name}
            portrait={portrait}
            index={i}
            coarse={coarse}
          />
        ))}
      </div>
    </SectionFrame>
  );
}
