"use client";
import { useEffect, useRef } from "react";

/**
 * Scroll fix: after a form is submitted, the tall form is replaced by a
 * short confirmation panel, so the page shrinks and the browser clamps
 * the scroll position to the new bottom — the footer. The visitor then
 * misses the confirmation entirely. When `active` turns true, bring the
 * result panel back to the top of the viewport (below the sticky header)
 * so the confirmation is what the visitor actually sees.
 */
export function useScrollToResult<T extends HTMLElement = HTMLDivElement>(active: boolean) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const y = ref.current.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }, [active]);
  return ref;
}
