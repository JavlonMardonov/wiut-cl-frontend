import { Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, ReactNode } from "react";

import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

import { Input, InputProps } from "../Input";

type IconStyle = "plus-minus" | "chevron";

interface ControlButtonsProps {
  iconStyle: IconStyle;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
}

type IconComponents = {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

const createControlButtons = ({
  iconStyle,
  onIncrement,
  onDecrement,
  disabled,
}: ControlButtonsProps): IconComponents => {
  const icons = {
    "plus-minus": {
      iconLeft: (
        <Button
          type="button"
          onClick={onDecrement}
          className="absolute bottom-[1px] left-[1px] top-[1px] h-[calc(100%-2px)] text-fg-quinary disabled:bg-transparent disabled:text-fg-disabled-subtle"
          variant="ghost"
          disabled={disabled}
        >
          <Minus width={16} height={16} />
        </Button>
      ),
      iconRight: (
        <Button
          type="button"
          onClick={onIncrement}
          className="absolute bottom-[1px] right-[1px] top-[1px] h-[calc(100%-2px)] text-fg-quinary"
          variant="ghost"
        >
          <Plus width={16} height={16} />
        </Button>
      ),
    },
    chevron: {
      iconRight: (
        <div className="flex flex-col justify-center">
          <Button
            type="button"
            variant="ghost"
            className="size-4 !p-0"
            onClick={onIncrement}
          >
            <ChevronUp className="size-3.5 cursor-pointer select-none" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="size-4 !p-0"
            onClick={onDecrement}
            disabled={disabled}
          >
            <ChevronDown className="size-3.5 cursor-pointer select-none" />
          </Button>
        </div>
      ),
    },
  };

  return icons[iconStyle];
};

export interface NumberInputProps extends Omit<InputProps, "onChange"> {
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
  locale?: string;
  iconStyle?: IconStyle;
}

export const NumberInput = ({
  className,
  value,
  min = 1,
  max = 10,
  onChange,
  locale = navigator.language,
  iconStyle = "plus-minus",
}: NumberInputProps) => {
  const formatter = new Intl.NumberFormat(locale);

  const incrementCount = () => {
    onChange(value < max ? value + 1 : max);
  };

  const decrementCount = () => {
    onChange(value > min ? value - 1 : min);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value.replace(/[^\d.-]/g, ""), 10);
    const clampedValue = Math.min(
      Math.max(Number.isNaN(parsedValue) ? min : parsedValue, min),
      max,
    );
    onChange(clampedValue);
  };

  const formattedValue = formatter.format(value);

  const controlButtons = useMemo(
    () =>
      createControlButtons({
        iconStyle,
        onIncrement: incrementCount,
        onDecrement: decrementCount,
        disabled: value <= min && value >= max,
      }),
    [iconStyle, incrementCount, decrementCount, value, min, max],
  );

  return (
    <div className={cn("relative", className)}>
      <Input
        value={formattedValue}
        onChange={handleChange}
        className={cn({ "!pr-1": iconStyle === "chevron" })}
        inputClassName="text-center"
        iconLeft={controlButtons.iconLeft}
        iconRight={controlButtons.iconRight}
      />
    </div>
  );
};
