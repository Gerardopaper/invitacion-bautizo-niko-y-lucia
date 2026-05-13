import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionFrame from '../components/SectionFrame';
import Divider from '../components/Divider';
import { galleryImages } from '../config/event';

function ParallaxCard({ image, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Alternate parallax direction by index for editorial layout
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [60, -60] : [-40, 40]
  );

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.08 }}
      style={{ y }}
      className={`editorial-image ${image.aspect} w-full`}
    >
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory/30 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 hairline" />
    </motion.figure>
  );
}

export default function Gallery() {
  return (
    <SectionFrame id="gallery" lightVariant="mid">
      <div className="flex flex-col items-center text-center">
        <Divider label="Retratos" />
        <h2 className="font-display mt-10 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] text-ink max-w-2xl">
          Pequeños rostros, <span className="italic-display gold-text">luz infinita.</span>
        </h2>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-12">
        {galleryImages.map((image, i) => (
          <div
            key={image.src}
            className={
              i % 4 === 1 || i % 4 === 2
                ? 'sm:mt-16 lg:mt-24'
                : ''
            }
          >
            <ParallaxCard image={image} index={i} />
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}
