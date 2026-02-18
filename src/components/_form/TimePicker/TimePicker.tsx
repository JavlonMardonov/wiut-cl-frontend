import { Clock } from "lucide-react";
import { useRef } from "react";

import { Label } from "@/components/_form/Label";

import TimePickerInput from "./TimePickerInput";

interface IProps {
  date: Date | undefined;
  onTimeChange: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function TimePicker({ date, onTimeChange, disabled = false }: IProps) {
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Soat
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={onTimeChange}
          ref={hourRef}
          onRightFocus={() => !disabled && minuteRef.current?.focus()}
          disabled={disabled}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minut
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={onTimeChange}
          ref={minuteRef}
          onLeftFocus={() => !disabled && hourRef.current?.focus()}
          onRightFocus={() => !disabled && secondRef.current?.focus()}
          disabled={disabled}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          Soniya
        </Label>
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={onTimeChange}
          ref={secondRef}
          onLeftFocus={() => !disabled && minuteRef.current?.focus()}
          disabled={disabled}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}
