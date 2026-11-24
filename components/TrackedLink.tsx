"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track } from "@/lib/track";

type Props = ComponentProps<typeof Link> & { location: string; label?: string };

/** Link that records a cta_click event. */
export function TrackedLink({ location, label, onClick, children, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        track("cta_click", { location, label: label ?? (typeof children === "string" ? children : String(rest.href)) });
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
