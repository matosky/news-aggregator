import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { Button } from "../../ui/button"
import { cn } from "../../../lib/utils"
import { Calendar } from "../../ui/calender"

interface DateFilterProps {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

export const DateFilter = ({ date, onDateChange }: DateFilterProps)=> {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Calendar className="w-full" mode="single" selected={date} onSelect={onDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

