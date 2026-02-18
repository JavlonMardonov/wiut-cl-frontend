import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import {
  FileUploader,
  type FileUploaderProps,
} from "@/components/_form/FileUpload";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { RequiredIndicator } from "@/components/RequiredIndicator/RequiredIndicator";

interface IProps extends FileUploaderProps {
  name: string;
  label?: ReactNode;
  required?: boolean;
}

export function FileField({ name, label, required, ...props }: IProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {required && <RequiredIndicator />}
            </FormLabel>
          )}
          <FormControl>
            <FileUploader onValueChange={onChange} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
