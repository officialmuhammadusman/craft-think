/**
 * Shared motion tokens for CraftThink — one easing, two duration bands.
 * Interactive feedback (hover, chips, accordion): 100–300ms.
 * Entrances (reveals, page transition, stagger children): 300–600ms.
 * Animated properties are transform/opacity ONLY — never width, height,
 * top, left, or box-shadow per frame. All motion components in this
 * codebase must respect prefers-reduced-motion (no movement then).
 */
export const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Entrance duration in seconds (within the 300–600ms band). */
export const MOTION_ENTER_DURATION = 0.45;

/** Interactive duration in seconds (within the 100–300ms band). */
export const MOTION_INTERACTIVE_DURATION = 0.25;

/** Stagger gap between grid children in seconds (0.04–0.08s band). */
export const MOTION_STAGGER_GAP = 0.06;

/** Page-transition duration in seconds (180–250ms band). */
export const MOTION_PAGE_DURATION = 0.22;
