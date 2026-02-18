import { X } from "lucide-react";
import * as React from "react";

import { IconButton } from "@/components/Button/IconButton";
import { cn } from "@/lib/utils";

import { Input, InputProps } from "../Input";

export interface ClearableInputProps extends Omit<InputProps, "onChange"> {
  onClear?: () => void;
  onChange?: (value: string) => void;
}

const ClearableInput = React.forwardRef<HTMLInputElement, ClearableInputProps>(
  ({ onClear, onChange, iconRight, size, ...props }, ref) => {
    return (
      <Input
        iconRight={
          <IconButton
            type="button"
            onClick={() => {
              onClear?.();
              onChange?.("");
            }}
            className={cn("size-6 p-1", {
              "size-8 p-1.5": size === "lg",
            })}
            variant="ghost"
          >
            <X size={16} />
          </IconButton>
        }
        onChange={(e) => onChange?.(e.target.value)}
        ref={ref}
        {...props}
      />
    );
  },
);

ClearableInput.displayName = "ClearableInput";

export { ClearableInput };
