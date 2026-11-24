export type TrackEvent =
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "availability_check"
  | "video_play";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Vendor-neutral analytics: pushes to window.dataLayer (GTM-compatible). Wire a vendor later. */
export function track(event: TrackEvent, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...props });
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, props);
}
