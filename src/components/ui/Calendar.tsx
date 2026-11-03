"use client";

/**
 * Calendar.tsx — Proper shadcn-style Calendar component for CraftThink,
 * built on react-day-picker (single-date mode). CraftThink theme: flat
 * indigo #4F46E5 for the selected day, dark navy #0B1220 text, white
 * background, no gradients. Day buttons are 48px so they are comfortable
 * tap targets on phones. Disabled days are dimmed, not hidden.
 *
 * The parent passes `disabled` matchers (past dates, Sundays) and handles
 * selection; this component only renders the calendar.
 */
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full bg-white p-3 text-[#0B1220]", className)}
      classNames={{
        root: "w-full",
        months: "w-full",
        month: "w-full",
        month_caption: "flex items-center justify-between px-1 pb-3",
        caption_label: "text-base font-bold text-[#0B1220]",
        nav: "flex items-center gap-1",
        button_previous:
          "flex h-11 w-11 items-center justify-center rounded-full border border-[#E7E9F2] bg-white text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5] disabled:opacity-40",
        button_next:
          "flex h-11 w-11 items-center justify-center rounded-full border border-[#E7E9F2] bg-white text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5] disabled:opacity-40",
        month_grid: "w-full border-collapse",
        weekdays: "w-full",
        weekday: "pb-2 text-center text-sm font-semibold text-[#64748B]",
        week: "w-full",
        day: "p-0.5 text-center text-[#0B1220]",
        day_button:
          "mx-auto flex h-12 w-12 items-center justify-center rounded-full text-base font-medium hover:bg-[#EEF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]",
        today: "font-bold text-[#4F46E5]",
        selected: "[&>button]:bg-[#4F46E5] [&>button]:text-white [&>button]:hover:bg-[#4F46E5]",
        disabled: "opacity-40",
        outside: "opacity-40",
        ...classNames,
      }}
      {...props}
    />
  );
}
