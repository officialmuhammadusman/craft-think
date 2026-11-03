"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION_EASE, MOTION_PAGE_DURATION } from "@/lib/motion";

/**
 * App Router page transition: a short fade + 8px rise (180–250ms)
 * on every navigation, on the shared motion tokens. The min-height
 * reserve avoids layout shift while the next page mounts. Reduced
 * motion renders a static wrapper.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className="min-h-[60vh]">{children}</div>;
  return (
    <motion.div
      className="min-h-[60vh]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: MOTION_PAGE_DURATION, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}
