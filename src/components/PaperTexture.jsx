/**
 * Two-layer tactile depth, applied globally above content.
 *
 * Layer A — paper fibers: low-frequency SVG turbulence warmed toward ivory.
 *           Mimics photographed editorial stock paper.
 * Layer B — film grain: higher-frequency, very low opacity, cinematic analog softness.
 *
 * Both layers use mix-blend so they integrate with the warm palette
 * instead of looking like dirty noise on top.
 */
export default function PaperTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ contain: 'strict' }}
    >
      {/* Paper fibers — soft, organic, almost imperceptible */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.07,
          mixBlendMode: 'multiply',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='420' height='420'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='1' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.42  0 0 0 0 0.34  0 0 0 0 0.22  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23p)'/></svg>\")",
          backgroundSize: '420px 420px',
        }}
      />
      {/* Film grain — finer, lighter */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.05,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.96  0 0 0 0 0.88  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>\")",
          backgroundSize: '240px 240px',
        }}
      />
    </div>
  );
}
