import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/_form/Calendar/CheckBox/Checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface IProps {
  name: string;
  label?: ReactNode;
  required?: boolean;
  data: { label: string; value: string }[];
  listClassName?: string;
}

export const CheckboxGroupField = ({
  name,
  label,
  required,
  data,
  listClassName,
}: IProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {required && <RequiredIndicator />}
            </FormLabel>
          )}
          <div className={listClassName}>
            {data.map((item) => {
              return (
                <FormField
                  control={control}
                  key={item.value}
                  name={name}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.value,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{item.label}</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
