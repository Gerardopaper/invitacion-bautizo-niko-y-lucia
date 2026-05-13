/**
 * Invisible mortar between sections.
 *
 * Two extremely soft vertical gradient bands (top and bottom) bleed
 * the ivory/champagne atmosphere across the seam where one section
 * ends and the next begins. They sit *outside* each section box,
 * suppressing the perceived edge so the page reads as a single
 * cinematic composition.
 *
 * No color shift, no movement, no cost — just continuity.
 */
export default function SectionBridge({ side = 'bottom', height = 180 }) {
  const isBottom = side === 'bottom';
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-[1]"
      style={{
        height,
        [isBottom ? 'bottom' : 'top']: -height / 2,
        background: isBottom
          ? 'linear-gradient(180deg, rgba(251,248,242,0) 0%, rgba(247,242,233,0.55) 55%, rgba(239,231,216,0.45) 100%)'
          : 'linear-gradient(0deg, rgba(251,248,242,0) 0%, rgba(247,242,233,0.55) 55%, rgba(239,231,216,0.45) 100%)',
        maskImage:
          'linear-gradient(180deg, transparent 0%, black 35%, black 65%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(180deg, transparent 0%, black 35%, black 65%, transparent 100%)',
      }}
    />
  );
}
