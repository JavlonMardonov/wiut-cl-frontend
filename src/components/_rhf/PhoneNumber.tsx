import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import {
  PhoneInput,
  PhoneInputProps,
} from "@/components/_form/PhoneNumberInput";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface PhoneNumberFieldProps
  extends Omit<PhoneInputProps, "value" | "onChange"> {
  name: string;
  label?: ReactNode;
  extraLabel?: ReactNode;
  required?: boolean;
}

export function PhoneNumberField({
  required,
  name,
  label,
  extraLabel,
  ...props
}: PhoneNumberFieldProps) {
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
            <PhoneInput {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
