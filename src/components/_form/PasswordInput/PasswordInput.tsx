import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

import { Input, InputProps } from "@/components/_form/Input";
import { Button } from "@/components/Button";

export interface PasswordInputProps
  extends Omit<InputProps, "type" | "iconRight"> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...props }, ref) => {
    const [type, setType] = useState<"password" | "text">("password");

    const handleTogglerClick = () =>
      setType(type === "text" ? "password" : "text");

    return (
      <Input
        iconRight={
          <Button
            type="button"
            variant="ghost"
            className="size-5 !p-0"
            onClick={handleTogglerClick}
            aria-label="Toggle password visibility"
          >
            {type === "text" ? (
              <Eye className="size-5 cursor-pointer select-none" />
            ) : (
              <EyeOff className="size-5 cursor-pointer select-none" />
            )}
          </Button>
        }
        type={type}
        ref={ref}
        {...props}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";
