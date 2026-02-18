import { Plus, Trash2 } from "lucide-react";
import { InputHTMLAttributes, ReactNode } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { Input } from "@/components/_form/Input";
import { Button } from "@/components/Button";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";
import { cn } from "@/lib/utils";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  addBtnTitle: string;
  className?: string;
  label?: ReactNode;
  description?: string;
  required?: boolean;
}

export function MultiTextField({
  name,
  label,
  description,
  className,
  required,
  addBtnTitle,
  ...props
}: IProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name, control });

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <FormLabel>
          {label} {required && <RequiredIndicator />}
        </FormLabel>
      )}
      <FormDescription>{description}</FormDescription>
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          control={control}
          name={`${name}[${index}]`}
          render={({ field: prop }) => (
            <FormItem className="mb-4">
              <div className="relative flex items-center">
                <FormControl className="w-full">
                  <Input {...prop} {...props} size="default" />
                </FormControl>
                {fields.length >= 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                    className="absolute right-2 p-1 text-fg-error-primary hover:text-fg-error-primary"
                  >
                    <Trash2 className="size-5" />
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        variant="ghost"
        type="button"
        onClick={() => append("")}
        className="flex items-center"
      >
        <Plus className="mr-2 size-5" />
        {addBtnTitle}
      </Button>
    </div>
  );
}
