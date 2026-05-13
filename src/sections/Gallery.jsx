import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import useCoarsePointer from '../hooks/useCoarsePointer';
import { galleryImages } from '../config/event';
import { EASE_CINE, EASE_SOFT } from '../animations/variants';

/**
 * Each photograph is composed in three pieces:
 *
 *   1. an atmospheric haze veil behind it (blends it into the scene)
 *   2. the feathered plate carrying the cinematic color grade
 *   3. a warm filmic bloom layer on top
 *
 * Plus a slow parallax on the plate and a barely-visible breathing
 * scale at the container level. The photo never feels like a placed
 * rectangle — it feels suspended in the same light as the page.
 */
function EditorialPhotograph({ image, index, coarse }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Skip the useScroll subscription entirely on mobile — every active
  // useScroll adds a scroll listener and per-frame work. Worth avoiding.
  const enableParallax = !coarse && !reduce;
  const { scrollYProgress } = useScroll({
    target: enableParallax ? ref : { current: null },
    offset: ['start end', 'end start'],
  });
  const plateY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax
      ? index % 2 === 0
        ? ['6%', '-6%']
        : ['-4%', '4%']
      : ['0%', '0%']
  );

  // Lighter entrance reveal on mobile (no blur — animated blur is
  // the single most expensive filter on mobile GPUs).
  const initial = coarse
    ? { opacity: 0, y: 28 }
    : { opacity: 0, y: 56, filter: 'blur(14px)' };
  const whileInView = coarse
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <motion.figure
      ref={ref}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: '-12%' }}
      transition={{
        duration: coarse ? 1.2 : 2.2,
        ease: EASE_CINE,
        delay: index * (coarse ? 0.05 : 0.12),
      }}
      className={`editorial-image ${image.aspect} relative w-full`}
    >
      {!coarse && <div className="editorial-image__veil" />}
      <motion.div
        className="editorial-image__plate"
        style={enableParallax ? { y: plateY } : undefined}
        transition={{ ease: EASE_SOFT }}
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          // Gallery images are never above-the-fold; deprioritize.
          fetchpriority="low"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 600px"
        />
        {!coarse && <div className="editorial-image__bloom" />}
      </motion.div>
    </motion.figure>
  );
}

export default function Gallery() {
  const coarse = useCoarsePointer();
  return (
    <SectionFrame id="gallery" lightVariant="mid">
      <div className="grid grid-cols-12 gap-y-10 sm:gap-y-0 sm:gap-x-10">
        <div className="col-span-12 sm:col-span-4 sm:pt-6">
          <span className="eyebrow">Retratos</span>
          <span className="gold-divider mt-6 block" style={{ width: 48 }} />
          <h2 className="font-display mt-8 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] text-ink balance">
            Pequeños rostros, <span className="italic-display gold-text">luz infinita.</span>
          </h2>
          <p className="mt-8 max-w-sm text-sm sm:text-base leading-[1.85] text-ink/60 font-light pretty">
            Fragmentos de luz suspendidos en el tiempo —miradas, gestos,
            ternura— que hoy queremos guardar como una oración.
          </p>
        </div>

        <div className="col-span-12 sm:col-span-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:gap-x-12 lg:gap-y-16">
            {galleryImages.map((image, i) => (
              <div
                key={image.src}
                className={
                  // Vertical offsets create editorial cadence on desktop
                  i % 4 === 1
                    ? 'sm:mt-20 lg:mt-28'
                    : i % 4 === 2
                    ? 'sm:-mt-4 lg:-mt-6'
                    : i % 4 === 3
                    ? 'sm:mt-12 lg:mt-20'
                    : ''
                }
              >
                <EditorialPhotograph image={image} index={i} coarse={coarse} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
