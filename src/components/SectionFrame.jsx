import { forwardRef } from 'react';
import AmbientLight from './AmbientLight';

/**
 * Wraps every section with the same atmospheric layering: ambient halos,
 * a soft cathedral veil, and grain texture. Keeps section components clean.
 */
const SectionFrame = forwardRef(function SectionFrame(
  { id, children, className = '', lightVariant = 'mid', withVeil = true },
  ref
) {
  return (
    <section
      id={id}
      ref={ref}
      className={`section relative overflow-hidden ${className}`}
    >
      <AmbientLight variant={lightVariant} />
      {withVeil && <div className="cathedral-veil" />}
      <div className="relative z-10 mx-auto max-w-6xl">{children}</div>
    </section>
  );
});

export default SectionFrame;
