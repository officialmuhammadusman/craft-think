/**
 * utils.ts — Shared utility helpers for the CraftThink site.
 * Import clsx here so we only have one import across the codebase.
 */
import { clsx, type ClassValue } from "clsx";

/**
 * cn — Merge Tailwind class names conditionally.
 * Usage: cn("base-class", condition && "conditional-class", { "object-class": bool })
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
