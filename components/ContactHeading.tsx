"use client";

import { useSearchParams } from "next/navigation";

const cls = "text-4xl font-bold tracking-tight md:text-5xl";

/** "Talk to Sales" heading when ?intent=sales, otherwise "Get a Quote". */
export function ContactHeading() {
  const sales = useSearchParams().get("intent") === "sales";
  return <h1 className={cls}>{sales ? "Talk to Sales" : "Get a Quote"}</h1>;
}
