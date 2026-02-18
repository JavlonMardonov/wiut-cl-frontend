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
import { MultiSelect } from "@/components/_form/MultiSelect";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Tooltip/Tooltip";

interface IProps {
  name: string;
  label?: ReactNode;
  placeholder: string;
  required?: boolean;
  helperText?: string;
  iconLeft?: ReactNode;
  popoverClassName?: string;
  helpTooltip?: string;
  data: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function MultiSelectField({
  data,
  name,
  label,
  iconLeft,
  placeholder,
  helpTooltip,
  popoverClassName,
  helperText,
  required,
}: IProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="flex flex-row">
              {label} {required && <RequiredIndicator />}
              {helpTooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild className="ml-1 text-fg-quinary">
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
            <MultiSelect
              options={data}
              defaultValue={field.value}
              onValueChange={field.onChange}
              placeholder={placeholder}
              variant="default"
              helperText={helperText}
              iconLeft={iconLeft}
              popoverClassName={popoverClassName}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
