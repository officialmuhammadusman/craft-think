"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION_EASE, MOTION_ENTER_DURATION, MOTION_STAGGER_GAP } from "@/lib/motion";

/**
 * Stagger — parent-owned stagger for grids (services, projects).
 * Children enter in sequence (0.06s apart) instead of all at once.
 * Transform/opacity only; respects prefers-reduced-motion (renders
 * plain divs, no movement). Use StaggerItem as the direct child of
 * each grid item, with className="h-full" where the card must fill.
 */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: MOTION_STAGGER_GAP } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: MOTION_ENTER_DURATION, ease: MOTION_EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
