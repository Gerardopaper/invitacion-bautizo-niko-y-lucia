/**
 * Cinematic color grading — a top-of-stack global wash that pushes the
 * whole composition toward warm highlights, creamy whites, and lifted
 * blacks. Inspired by Malick / editorial film stock.
 *
 * Two layers:
 *  - warmth wash (soft-light) — lifts midtones toward ivory/champagne
 *  - vignette (multiply, very low) — anchors the edges, focuses the eye
 *
 * Sits above content but below paper texture so grain still feels
 * embedded in the image rather than floating on top of a filter.
 */
export default function ColorGrading() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{ contain: 'strict' }}
    >
      <div
        className="absolute inset-0"
        style={{
          mixBlendMode: 'soft-light',
          opacity: 0.55,
          background:
            'linear-gradient(180deg, rgba(255,239,210,0.55) 0%, rgba(255,247,232,0.25) 40%, rgba(232,219,194,0.35) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          mixBlendMode: 'multiply',
          opacity: 0.18,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(75,55,30,0.35) 100%)',
        }}
      />
    </div>
  );
}
