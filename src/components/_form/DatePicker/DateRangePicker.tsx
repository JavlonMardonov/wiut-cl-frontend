import { VariantProps } from "class-variance-authority";
import { endOfMonth, startOfDay, endOfDay } from "date-fns";
import { toDate } from "date-fns-tz";
import { CalendarIcon } from "lucide-react";
import { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

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

import { dateRanges, months } from "./constants";

export interface DateRangePickerProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  id?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  date: DateRange;
  closeOnSelect?: boolean;
  numberOfMonths?: 1 | 2;
  yearsRange?: number;
  minDate?: Date;
  maxDate?: Date;
  onDateSelect: (range: { from: Date; to: Date }) => void;
}

export const DateRangePicker = forwardRef<
  HTMLButtonElement,
  DateRangePickerProps
>(
  (
    {
      id = "calendar-date-picker",
      className,
      date,
      closeOnSelect = false,
      numberOfMonths = 2,
      yearsRange = 10,
      onDateSelect,
      variant,
      disabled,
      placeholder,
      minDate,
      maxDate,
      ...props
    },
    ref,
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState<string | null>(
      numberOfMonths === 2 ? "This Year" : "Today",
    );
    const [monthFrom, setMonthFrom] = useState<Date | undefined>(date?.from);
    const [yearFrom, setYearFrom] = useState<number | undefined>(
      date?.from?.getFullYear(),
    );
    const [monthTo, setMonthTo] = useState<Date | undefined>(
      numberOfMonths === 2 ? date?.to : date?.from,
    );
    const [yearTo, setYearTo] = useState<number | undefined>(
      numberOfMonths === 2
        ? date?.to?.getFullYear()
        : date?.from?.getFullYear(),
    );

    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const years = Array.from(
      { length: yearsRange + 1 },
      (_, i) => new Date().getFullYear() - yearsRange / 2 + i,
    );

    const handleTogglePopover = () => setIsPopoverOpen((prev) => !prev);
    const handleClose = () => setIsPopoverOpen(false);

    const selectDateRange = (from: Date, to: Date, range: string) => {
      onDateSelect({
        from: startOfDay(toDate(from, { timeZone })),
        to: endOfDay(toDate(to, { timeZone })),
      });
      setSelectedRange(range);
      setMonthFrom(from);
      setYearFrom(from.getFullYear());
      setMonthTo(to);
      setYearTo(to.getFullYear());
      if (closeOnSelect) handleClose();
    };

    const handleDateSelect = (range: DateRange | undefined) => {
      if (range) {
        const from = startOfDay(toDate(range.from as Date, { timeZone }));
        const to = range.to ? endOfDay(toDate(range.to, { timeZone })) : from;
        onDateSelect({ from, to });
        setMonthFrom(from);
        setYearFrom(from.getFullYear());
        setMonthTo(to);
        setYearTo(to.getFullYear());
      }
      setSelectedRange(null);
    };

    const handleMonthChange = (newMonthIndex: number, part: string) => {
      setSelectedRange(null);
      const year = part === "from" ? yearFrom : yearTo;
      if (year !== undefined) {
        const newMonth = new Date(year, newMonthIndex, 1);
        const from = startOfDay(toDate(newMonth, { timeZone }));
        const to =
          numberOfMonths === 2
            ? endOfMonth(toDate(newMonth, { timeZone }))
            : from;
        if (part === "from") {
          setMonthFrom(newMonth);
          setYearFrom(year);
          onDateSelect({ from, to });
        } else {
          setMonthTo(newMonth);
          setYearTo(year);
          onDateSelect({ from: date.from!, to });
        }
      }
    };

    const handleYearChange = (newYear: number, part: string) => {
      setSelectedRange(null);
      if (years.includes(newYear)) {
        const month = part === "from" ? monthFrom : monthTo;
        const newDate = new Date(newYear, month ? month.getMonth() : 0, 1);
        const from = startOfDay(toDate(newDate, { timeZone }));
        const to =
          numberOfMonths === 2
            ? endOfMonth(toDate(newDate, { timeZone }))
            : from;
        if (part === "from") {
          setMonthFrom(newDate);
          setYearFrom(newYear);
          onDateSelect({ from, to });
        } else {
          setMonthTo(newDate);
          setYearTo(newYear);
          onDateSelect({ from: date.from!, to });
        }
      }
    };

    useEffect(() => {
      const addPassiveEventListener = (element: HTMLElement | null) => {
        if (element)
          element.addEventListener("wheel", (e) => e.preventDefault(), {
            passive: false,
          });
      };
      const elements = [
        "firstDay",
        "firstMonth",
        "firstYear",
        "secondDay",
        "secondMonth",
        "secondYear",
      ].map((part) => document.getElementById(`${part}-${id}`));
      elements.forEach(addPassiveEventListener);
      return () =>
        elements.forEach((element) =>
          element?.removeEventListener("wheel", (e) => e.preventDefault()),
        );
    }, [date]);

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            disabled={disabled}
            className={cn("w-auto", buttonVariants({ variant, className }))}
            onClick={handleTogglePopover}
            suppressHydrationWarning
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {date.from && date.to
                ? `${date.from.toDateString()} - ${date.to.toDateString()}`
                : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        {isPopoverOpen && (
          <PopoverContent
            className="w-auto"
            align="center"
            avoidCollisions={false}
            onInteractOutside={handleClose}
            onEscapeKeyDown={handleClose}
          >
            <div className="flex">
              {numberOfMonths === 2 && (
                <div className="hidden flex-col gap-1 border-r border-foreground/10 pr-4 text-left md:flex">
                  {dateRanges.map(({ label, start, end }) => (
                    <Button
                      key={label}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "justify-start",
                        selectedRange === label && "bg-primary text-background",
                      )}
                      onClick={() => selectDateRange(start, end, label)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <div className="ml-3 flex gap-2">
                    <Select
                      value={
                        monthFrom ? months[monthFrom.getMonth()] : undefined
                      }
                      onValueChange={(value) =>
                        handleMonthChange(months.indexOf(value), "from")
                      }
                    >
                      <SelectTrigger className="w-[122px] font-medium focus:ring-0 focus:ring-offset-0 sm:flex">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={yearFrom ? yearFrom.toString() : undefined}
                      onValueChange={(value) =>
                        handleYearChange(Number(value), "from")
                      }
                    >
                      <SelectTrigger className="w-[122px] font-medium focus:ring-0 focus:ring-offset-0 sm:flex">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {numberOfMonths === 2 && (
                    <div className="flex gap-2">
                      <Select
                        value={monthTo ? months[monthTo.getMonth()] : undefined}
                        onValueChange={(value) =>
                          handleMonthChange(months.indexOf(value), "to")
                        }
                      >
                        <SelectTrigger className="w-[122px] font-medium focus:ring-0 focus:ring-offset-0 sm:flex">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={yearTo ? yearTo.toString() : undefined}
                        onValueChange={(value) =>
                          handleYearChange(Number(value), "to")
                        }
                      >
                        <SelectTrigger className="w-[122px] font-medium focus:ring-0 focus:ring-offset-0 sm:flex">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <Calendar
                  mode="range"
                  defaultMonth={monthFrom}
                  month={monthFrom}
                  onMonthChange={setMonthFrom}
                  selected={date}
                  onSelect={handleDateSelect}
                  numberOfMonths={numberOfMonths}
                  showOutsideDays={false}
                  minDate={minDate}
                  maxDate={maxDate}
                  className={className}
                />
              </div>
            </div>
          </PopoverContent>
        )}
      </Popover>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";
