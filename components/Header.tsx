"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { TrackedLink } from "./TrackedLink";
import { btn } from "./buttons";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu on navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-ink" aria-label="GoFIBER home">
          Go<span className="text-brand-purple">FIBER</span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-ink">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="transition hover:text-brand-purple aria-[current=page]:text-brand-purple"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <TrackedLink href="/contact" location="header" label="Get a Quote" className={`${btn.primary} hidden sm:inline-flex`}>
            Get a Quote
          </TrackedLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-black/5 bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-6 py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-muted">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <TrackedLink href="/contact" location="mobile-menu" label="Get a Quote" className={`${btn.primary} w-full`}>
                Get a Quote
              </TrackedLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
