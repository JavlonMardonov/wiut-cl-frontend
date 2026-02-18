import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { NumberInput, NumberInputProps } from "@/components/_form/NumberInput";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface NumberFieldProps
  extends Omit<NumberInputProps, "value" | "onChange"> {
  name: string;
  label?: ReactNode;
  extraLabel?: ReactNode;
  required?: boolean;
}

export function NumberField({
  required,
  name,
  label,
  extraLabel,
  ...props
}: NumberFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel extraLabel={extraLabel}>
              {label} {required && <RequiredIndicator />}
            </FormLabel>
          )}
          <FormControl>
            <NumberInput {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
