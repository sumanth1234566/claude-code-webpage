/**
 * Thin flowing "fiber" lines, after style.png. Decorative only.
 * Each line is a few cubic Bézier segments (cheap to paint). The drift animation is
 * applied to a wrapper div so the browser can composite it; only set `animated` on
 * one instance per page (the hero) to keep main-thread work low.
 */
export function FiberLines({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  const W = 1200; // one wavelength; the SVG holds two so it can loop seamlessly
  const k = 0.3642; // Bézier control-point factor for a sine half-wave
  const lines = Array.from({ length: 11 }, (_, i) => {
    const amp = (40 + i * 6) * (i % 2 ? 1 : -1);
    const y = 200 + (i - 5) * 6;
    const shift = i * 22; // phase offset per line
    const half = W / 2;
    let d = `M${-shift} ${y}`;
    for (let n = 0; n < 5; n++) {
      const x0 = -shift + n * half;
      const a = n % 2 ? amp : -amp;
      d += ` C${x0 + half * k} ${y + a}, ${x0 + half * (1 - k)} ${y + a}, ${x0 + half} ${y}`;
    }
    return { d, opacity: 0.22 + (i % 4) * 0.05 };
  });

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className={`absolute left-0 top-1/2 h-[400px] w-[200%] -translate-y-1/2 ${animated ? "fiber-drift" : ""}`}>
        <svg className="h-full w-full" viewBox={`0 0 ${W * 2} 400`} preserveAspectRatio="none">
          {lines.map((l, i) => (
            <path key={i} d={l.d} fill="none" stroke="white" strokeOpacity={l.opacity} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      </div>
    </div>
  );
}
