"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION_EASE, MOTION_ENTER_DURATION } from "@/lib/motion";

/** Premium fade-up reveal, on the shared motion tokens. Respects prefers-reduced-motion (no movement then). */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: MOTION_ENTER_DURATION, delay, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}
