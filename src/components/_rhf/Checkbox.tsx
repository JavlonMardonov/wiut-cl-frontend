import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  Checkbox,
  type CheckboxProps,
} from "@/components/_form/Calendar/CheckBox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface IProps extends Omit<CheckboxProps, "checked" | "onCheckedChange"> {
  name: string;
  label?: ReactNode;
  required?: boolean;
}

export function CheckboxField({ name, label, required }: IProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-3">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            {label && (
              <FormLabel>
                {label} {required && <RequiredIndicator />}
              </FormLabel>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
