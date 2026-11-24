import { placeholders } from "@/content/site";

/** Stylised Southern California service-area illustration. Not to scale; real map data pending. */
export function CoverageMap() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <svg viewBox="0 0 600 420" role="img" aria-labelledby="map-title map-desc" className="h-auto w-full">
        <title id="map-title">GoFIBER service area illustration</title>
        <desc id="map-desc">A stylised map of coastal Southern California marking Long Beach and Irvine. Not to scale.</desc>
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6e44b0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e3874b" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {/* Ocean */}
        <rect width="600" height="420" fill="#eef1f7" />
        {/* Land */}
        <path d="M0 0 H600 V420 H470 C440 360 400 330 350 300 C300 270 250 262 205 240 C160 218 120 200 80 205 C50 208 20 200 0 190 Z" fill="#f8f7fb" stroke="#d9d5e6" strokeWidth="2" />
        {/* Service area */}
        <path d="M120 120 C190 80 330 90 420 150 C470 185 480 250 445 285 C400 300 330 280 280 262 C230 245 180 225 140 210 C100 190 85 150 120 120 Z" fill="url(#area)" stroke="#6e44b0" strokeWidth="2" strokeDasharray="6 5" />
        {/* Cities */}
        {[
          { x: 215, y: 222, label: "Long Beach", hq: true },
          { x: 380, y: 250, label: "Irvine" },
        ].map((c) => (
          <g key={c.label}>
            <circle cx={c.x} cy={c.y} r={c.hq ? 10 : 8} fill="#5b3fa8" />
            <circle cx={c.x} cy={c.y} r={c.hq ? 18 : 14} fill="none" stroke="#5b3fa8" strokeOpacity="0.35" strokeWidth="2" />
            <text x={c.x} y={c.y - 24} textAnchor="middle" fontSize="16" fontWeight="700" fill="#14121a">
              {c.label}
            </text>
            {c.hq && (
              <text x={c.x} y={c.y + 34} textAnchor="middle" fontSize="12" fill="#5c5870">
                Headquarters
              </text>
            )}
          </g>
        ))}
        <text x="40" y="380" fontSize="14" fill="#5c5870" fontStyle="italic">
          Pacific Ocean
        </text>
      </svg>
      <figcaption className="border-t border-black/5 px-6 py-4 text-sm text-text-muted">
        Service area map: {placeholders.mapData}. Illustration only, not to scale.
      </figcaption>
    </figure>
  );
}
