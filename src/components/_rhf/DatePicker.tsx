import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  DatePicker,
  type DatePickerProps,
} from "@/components/_form/DatePicker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface IProps extends Omit<DatePickerProps, "date" | "onDateSelect"> {
  name: string;
  label?: ReactNode;
  required?: boolean;
}

export function DatePickerField({ required, name, label, ...props }: IProps) {
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
            <DatePicker
              date={field.value}
              onDateSelect={field.onChange}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
