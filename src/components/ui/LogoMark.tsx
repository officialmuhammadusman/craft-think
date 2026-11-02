"use client";
import { useState } from "react";
import Image from "next/image";

/**
 * LogoMark — flat brand mark (logo-mark.webp: bold C + rising thinking
 * path + one small teal AI dot), with the wordmark in flat indigo beside
 * it. The gradient v2 mark from the cancelled gradient theme is NOT
 * used here — the flat accent rule allows teal only as the tiny dot
 * inside this artwork, never as gradient styling in layout chrome.
 * Never renders a broken-image icon: on failure it renders nothing,
 * leaving the wordmark alone.
 */
export function LogoMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <Image
      src="/images/brand/logo-mark.webp"
      alt=""
      width={size}
      height={size}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
