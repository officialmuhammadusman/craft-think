"use client";

/**
 * LenisProvider.tsx — Initialises Lenis smooth scroll for the whole site.
 * Automatically disables smooth scroll when the user prefers reduced motion.
 * Framer Motion is imported here to ensure it is tree-shaken correctly.
 *
 * This component must be a Client Component because it runs browser APIs.
 */
import { useEffect } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // Respect prefers-reduced-motion — do not enable smooth scroll if set
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Lenis requires its RAF loop to run every frame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
