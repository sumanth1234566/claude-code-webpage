"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";
import { FiberLines } from "./FiberLines";

/**
 * Scroll-reveal video section. The video src is attached only when the section
 * nears the viewport; it plays while ≥35% visible and pauses when scrolled away.
 * Reduced motion: poster only, no autoplay or transform; the play button still works.
 */
export function ScrollVideo({
  src = "/media/animation.mp4",
  poster = "/media/animation-poster.jpg",
  title = "Built on our own fiber",
  body = "Every connection runs over fiber GoFIBER owns and operates across Southern California.",
}: {
  src?: string;
  poster?: string;
  title?: string;
  body?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);
  const reducedMotion = useRef(false);
  const tracked = useRef(false);
  const inView = useRef(false);

  const tryPlay = () => {
    const v = videoRef.current;
    if (v && v.getAttribute("src") && inView.current && !reducedMotion.current && !userPaused.current) v.play().catch(() => {});
  };

  // The src is attached asynchronously; start playback once it exists if the section is already in view.
  useEffect(() => {
    if (loaded) tryPlay();
  }, [loaded]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Load the video shortly before it scrolls into view.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          loader.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    // Reveal + play/pause on visibility.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (entry.intersectionRatio >= 0.35) {
          inView.current = true;
          setRevealed(true);
          setLoaded(true);
          tryPlay();
        } else {
          inView.current = false;
          if (v && !v.paused) v.pause();
        }
      },
      { threshold: [0, 0.35, 0.6] },
    );

    loader.observe(el);
    visibility.observe(el);
    return () => {
      loader.disconnect();
      visibility.disconnect();
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!loaded) setLoaded(true);
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <section ref={sectionRef} aria-labelledby="scroll-video-title" className="on-dark relative isolate overflow-hidden bg-fiber text-white">
      <div className="bg-fiber-scrim absolute inset-0 -z-10" aria-hidden="true" />
      <FiberLines className="-z-10 opacity-60" />
      <div
        data-revealed={revealed}
        className="mx-auto max-w-7xl translate-y-8 scale-95 px-6 py-20 opacity-0 transition duration-700 ease-out data-[revealed=true]:translate-y-0 data-[revealed=true]:scale-100 data-[revealed=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100 md:py-28"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="scroll-video-title" className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-white/95">{body}</p>
        </div>
        <div className="relative mx-auto mt-12 aspect-video max-w-5xl overflow-hidden rounded-2xl bg-black/30 shadow-2xl ring-1 ring-white/20">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            poster={loaded ? poster : undefined}
            aria-label="GoFIBER fiber network animation"
            src={loaded ? src : undefined}
            onPlay={() => {
              setPlaying(true);
              if (!tracked.current) {
                tracked.current = true;
                track("video_play", { video: "animation" });
              }
            }}
            onPause={() => setPlaying(false)}
          />
          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? "Pause video" : "Play video"}
            className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/75"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
