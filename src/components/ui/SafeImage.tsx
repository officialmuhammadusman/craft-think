"use client";
import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * SafeImage — resilient image for a site whose binary images may be
 * missing on a deployment (e.g. GitHub text-only push without
 * public/images/). If the file 404s, the <img> hides itself instead of
 * showing a broken-image icon + overlapping alt text, leaving the
 * solid placeholder background of its container visible.
 */
export function SafeImage({ alt, ...rest }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <Image alt={alt ?? ""} {...rest} onError={() => setFailed(true)} />;
}
