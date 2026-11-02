"use client";
import { useSearchParams } from "next/navigation";
import { AiGuide } from "@/components/ai/AiGuide";

export function GuideClient() {
  const q = useSearchParams().get("q") || "";
  return <AiGuide initial={q} />;
}
