import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { Input, InputProps } from "@/components/_form/Input";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface IProps extends Omit<InputProps, "value" | "onChange"> {
  name: string;
  label?: ReactNode;
  extraLabel?: ReactNode;
  required?: boolean;
}

export function TextField({
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
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
