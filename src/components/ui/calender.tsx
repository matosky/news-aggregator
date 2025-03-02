import type * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "../../lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 bg-background text-foreground", className)}
      classNames={{
        months: "space-y-4",
        month: "",
        caption: "flex justify-between items-center h-10",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: "p-1 opacity-70 hover:opacity-100",
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse",
        head_row: "flex w-full",
        head_cell: "w-10 text-xs text-muted-foreground/50 font-normal",
        row: "flex w-full mt-2",
        cell: "w-10 h-10 text-center text-sm p-0 relative hover:bg-transparent focus-within:relative focus-within:z-20",
        day: "h-10 w-10 p-0 font-normal hover:bg-transparent",
        day_selected: "text-primary",
        day_today: "text-foreground",
        day_outside: "opacity-50",
        day_disabled: "opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      footer={<div className="mt-4 text-sm text-muted-foreground/50">Pick a day.</div>}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

