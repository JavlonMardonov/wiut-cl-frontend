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
  PasswordInput,
  PasswordInputProps,
} from "@/components/_form/PasswordInput";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface IProps extends Omit<PasswordInputProps, "value" | "onChange"> {
  name: string;
  label?: ReactNode;
  extraLabel?: ReactNode;
  required?: boolean;
}

export function PasswordField({
  required,
  name,
  label,
  extraLabel,
  ...props
}: IProps) {
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
            <PasswordInput {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
