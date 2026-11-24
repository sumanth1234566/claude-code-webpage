/** Shared button class names (kept out of client modules so server components can import them). */
export const btn = {
  onDark:
    "inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-purple shadow-sm transition hover:bg-white/90",
  onDarkGhost:
    "inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10",
  primary:
    "inline-flex items-center justify-center rounded-full bg-brand-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-violet disabled:opacity-60",
  ghost:
    "inline-flex items-center justify-center rounded-full border border-brand-purple px-6 py-3 text-sm font-semibold text-brand-purple transition hover:bg-brand-purple/5",
};
