import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { TimePicker } from "@/components/_form/TimePicker";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface IProps {
  name: string;
  label?: ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export function DatePickerField({ required, disabled, name, label }: IProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          {label && (
            <FormLabel>
              {label} {required && <RequiredIndicator />}
            </FormLabel>
          )}
          <FormControl>
            <TimePicker
              date={field.value || 0}
              onTimeChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
