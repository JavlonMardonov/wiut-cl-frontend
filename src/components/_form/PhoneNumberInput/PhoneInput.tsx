import { VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import RPNInput, {
  FlagProps,
  Country as RPNInputCountry,
  Value as RPNInputValue,
  Props as RPNInputProps,
  getCountryCallingCode,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Input, InputProps, inputVariants } from "@/components/_form/Input";
import { Button } from "@/components/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/Command/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Popover/Popover";
import { ScrollArea } from "@/components/ScrollArea/ScrollArea";
import { cn } from "@/lib/utils";

const FlagComponent = ({ country, countryName }: FlagProps) => {
  const Flag = flags[country];
  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = "FlagComponent";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn("w-[340px] rounded-s-none", className)}
      {...props}
      ref={ref}
    />
  ),
);

export type PhoneInputProps = Omit<InputProps, "onChange" | "value"> &
  Omit<RPNInputProps<typeof RPNInput>, "onChange"> & {
    onChange: (value: RPNInputValue) => void;
  };

type CountrySelectOption = { label: string; value: RPNInputCountry };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInputCountry;
  onChange: (value: RPNInputCountry) => void;
  options: CountrySelectOption[];
  size?: VariantProps<typeof inputVariants>["size"];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
  size = "default",
}: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInputCountry) => {
      onChange(country);
    },
    [onChange],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "flex !w-[60px] gap-1 !rounded-e-none rounded-s-lg border !border-r-0 bg-background shadow-sm",
            inputVariants({ size }),
          )}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronsUpDown
            className={cn(
              "-mr-2 h-4 w-4 opacity-50",
              disabled ? "hidden" : "opacity-100",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className="gap-2"
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className="flex-1 text-sm">{option.label}</span>
                      {option.value && (
                        <span className="text-sm text-foreground/50">
                          {`+${getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {
      return (
        <RPNInput
          ref={ref}
          className={cn("flex", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={(countrySelectProps) => (
            <CountrySelect {...countrySelectProps} size={props.size} />
          )}
          inputComponent={InputComponent}
          smartCaret={false}
          onChange={(value: RPNInputValue) => onChange(value)}
          {...props}
        />
      );
    },
  );

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
