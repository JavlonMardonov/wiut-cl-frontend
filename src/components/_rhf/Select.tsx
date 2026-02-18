import { SelectProps } from "@radix-ui/react-select";
import { Tooltip } from "@radix-ui/react-tooltip";
import { CircleHelp } from "lucide-react";
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
  Select,
  SelectContent,
  SelectContentProps,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_form/Select/Select";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip/Tooltip";

export interface IOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
}

interface IProps {
  name: string;
  placeholder?: string;
  data: IOption[];
  helperText?: string;
  helpTooltip?: string;
  label?: ReactNode;
  leftIcon?: ReactNode;
  required?: boolean;
  clearable?: boolean;
  selectProps?: Omit<
    SelectProps,
    "value" | "onValueChange" | "defaultValue" | "name"
  >;
  contentProps?: SelectContentProps;
}

export function SelectField({
  name,
  data,
  placeholder,
  label,
  required,
  leftIcon,
  clearable,
  helperText,
  helpTooltip,
  selectProps = {},
  contentProps = {},
}: IProps) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {label && (
            <FormLabel className="flex flex-row">
              {label} {required && <RequiredIndicator />}
              {helpTooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild className="ml-1 text-gray">
                      <CircleHelp size="16" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{helpTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) =>
                field.onChange({
                  target: {
                    value,
                  },
                })
              }
              {...selectProps}
            >
              <SelectTrigger
                clearable={clearable && !!field.value}
                onClear={() => field.onChange({ target: { value: "" } })}
                helperText={helperText}
                iconLeft={leftIcon}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent {...contentProps}>
                {data.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    iconLeft={item.icon}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
