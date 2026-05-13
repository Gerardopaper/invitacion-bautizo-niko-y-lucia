import { forwardRef } from 'react';
import AmbientLight from './AmbientLight';
import SectionBridge from './SectionBridge';

/**
 * Wraps every section with consistent atmospheric layering and
 * invisible bridges that blend each section into the next so the
 * page reads as one cinematic composition instead of stacked blocks.
 *
 * `bridge` controls which seams bleed:
 *   "both" (default), "top", "bottom", "none"
 */
const SectionFrame = forwardRef(function SectionFrame(
  {
    id,
    children,
    className = '',
    lightVariant = 'mid',
    withVeil = true,
    bridge = 'both',
  },
  ref
) {
  const wantTop = bridge === 'top' || bridge === 'both';
  const wantBottom = bridge === 'bottom' || bridge === 'both';

  return (
    <section
      id={id}
      ref={ref}
      className={`section relative ${className}`}
      style={{ overflow: 'visible' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <AmbientLight variant={lightVariant} />
        {withVeil && <div className="cathedral-veil" />}
      </div>
      {wantTop && <SectionBridge side="top" />}
      {wantBottom && <SectionBridge side="bottom" />}
      <div className="relative z-10 mx-auto max-w-6xl">{children}</div>
    </section>
  );
});

export default SectionFrame;
