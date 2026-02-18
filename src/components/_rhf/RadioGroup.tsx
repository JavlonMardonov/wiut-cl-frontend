import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { RadioGroup, RadioGroupItem } from "@/components/_form/RadioGroup";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface IProps {
  name: string;
  label?: ReactNode;
  data: { label: string; value: string }[];
  required?: boolean;
}

export function RadioGroupField({ name, data, label, required }: IProps) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && (
            <FormLabel>
              {label} {required && <RequiredIndicator />}
            </FormLabel>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {data.map((item) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={item.value}
                >
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
