import { VariantProps } from "class-variance-authority";
import { isAfter, isBefore, startOfDay } from "date-fns";
import { toDate } from "date-fns-tz";
import { CalendarIcon } from "lucide-react";
import { forwardRef, HTMLAttributes, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_form/Select";
import { Button, buttonVariants } from "@/components/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Popover/Popover";
import { cn } from "@/lib/utils";

import { Calendar } from "../Calendar";

import { months } from "./constants";

export interface DatePickerProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  id?: string;
  date: Date;
  onDateSelect: (date: Date) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  closeOnSelect?: boolean;
  yearsRange?: number;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      id = "calendar-date-picker",
      className,
      disabled,
      placeholder,
      date,
      closeOnSelect = false,
      yearsRange = 10,
      onDateSelect,
      minDate,
      maxDate,
      variant,
      ...props
    },
    ref,
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(date);
    const [month, setMonth] = useState<number>(
      date ? date.getMonth() : new Date().getMonth(),
    );
    const [year, setYear] = useState<number>(
      date ? date.getFullYear() : new Date().getFullYear(),
    );

    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const years = Array.from(
      { length: yearsRange + 1 },
      (_, i) => new Date().getFullYear() - Math.floor(yearsRange / 2) + i,
    );

    const handleTogglePopover = () => setIsPopoverOpen((prev) => !prev);
    const handleClose = () => setIsPopoverOpen(false);

    const handleDateSelect = (now: Date | undefined) => {
      if (now) {
        const selected = startOfDay(toDate(now, { timeZone }));

        if (minDate && isBefore(selected, startOfDay(minDate))) return;
        if (maxDate && isAfter(selected, startOfDay(maxDate))) return;

        onDateSelect(selected);
        setSelectedDate(selected);
        setMonth(selected.getMonth());
        setYear(selected.getFullYear());
        if (closeOnSelect) handleClose();
      }
    };

    const handleMonthChange = (newMonthIndex: number) => {
      const newDate = new Date(year, newMonthIndex, 1);

      if (minDate && isBefore(newDate, minDate)) return;
      if (maxDate && isAfter(newDate, maxDate)) return;

      setMonth(newMonthIndex);
      setSelectedDate(newDate);
      onDateSelect(newDate);
    };

    const handleYearChange = (newYear: number) => {
      const newDate = new Date(newYear, month, 1);

      if (minDate && isBefore(newDate, minDate)) return;
      if (maxDate && isAfter(newDate, maxDate)) return;

      setYear(newYear);
      setSelectedDate(newDate);
      onDateSelect(newDate);
    };

    useEffect(() => {
      const element = document.getElementById(`calendar-${id}`);
      if (element) {
        element.addEventListener("wheel", (e) => e.preventDefault(), {
          passive: false,
        });
      }
      return () => {
        if (element) {
          element.removeEventListener("wheel", (e) => e.preventDefault());
        }
      };
    }, [id]);

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            disabled={disabled}
            {...props}
            className={cn(
              "w-auto rounded-xl",
              buttonVariants({ variant, className }),
            )}
            variant="primary"
            onClick={handleTogglePopover}
            suppressHydrationWarning
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="">
              {selectedDate ? selectedDate.toDateString() : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        {isPopoverOpen && (
          <PopoverContent
            className="w-auto rounded-xl"
            align="center"
            avoidCollisions={false}
            onInteractOutside={handleClose}
            onEscapeKeyDown={handleClose}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <div className="ml-3 flex gap-2">
                  <Select
                    value={months[month]}
                    onValueChange={(value) =>
                      handleMonthChange(months.indexOf(value))
                    }
                  >
                    <SelectTrigger className="w-[122px] font-medium focus:ring-0 focus:ring-offset-0 sm:flex">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((monthName) => (
                        <SelectItem key={monthName} value={monthName}>
                          {monthName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={year.toString()}
                    onValueChange={(value) => handleYearChange(Number(value))}
                  >
                    <SelectTrigger className="w-[122px] font-medium focus:ring-0 focus:ring-offset-0 sm:flex">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((yearOption) => (
                        <SelectItem
                          key={yearOption}
                          value={yearOption.toString()}
                        >
                          {yearOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                month={new Date(year, month)}
                onMonthChange={(time) => {
                  setMonth(time.getMonth());
                  setYear(time.getFullYear());
                }}
                showOutsideDays={false}
                className={className}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
          </PopoverContent>
        )}
      </Popover>
    );
  },
);

DatePicker.displayName = "DatePicker";
