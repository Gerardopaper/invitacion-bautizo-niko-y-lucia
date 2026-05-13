import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
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
function EditorialPhotograph({ image, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Alternate direction & soften range for editorial drift
  const plateY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ['0%', '0%'] : index % 2 === 0 ? ['6%', '-6%'] : ['-4%', '4%']
  );

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 56, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{
        duration: 2.2,
        ease: EASE_CINE,
        delay: index * 0.12,
      }}
      className={`editorial-image ${image.aspect} relative w-full`}
    >
      <div className="editorial-image__veil" />
      <motion.div
        className="editorial-image__plate"
        style={{ y: plateY }}
        transition={{ ease: EASE_SOFT }}
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
        />
        <div className="editorial-image__bloom" />
      </motion.div>
    </motion.figure>
  );
}

export default function Gallery() {
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
                <EditorialPhotograph image={image} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
