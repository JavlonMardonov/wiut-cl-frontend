import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDown, XIcon } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/Badge/Badge";
import { Button } from "@/components/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/Command/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Popover/Popover";
import { cn } from "@/lib/utils";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-border-primary text-text-secondary bg-card hover:bg-card/80",
        outline:
          "border border-border-secondary bg-bg-secondary text-fg-secondary hover:bg-bg-secondary-hover",
        ghost:
          "bg-transparent text-fg-primary hover:bg-bg-primary-hover hover:text-fg-primary-hover",
        error:
          "border-transparent bg-bg-error-primary text-text-primary hover:bg-bg-error-primary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  asChild?: boolean;
  options: {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  defaultValue?: string[];
  disabled?: boolean;
  placeholder: string;
  className?: string;
  popoverClassName?: string;
  helperText?: string;
  iconLeft?: React.ReactNode;
  onValueChange: (value: string[]) => void;
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      className,
      variant,
      options,
      defaultValue,
      onValueChange,
      placeholder,
      iconLeft,
      popoverClassName,
      helperText,

      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      defaultValue || [],
    );
    const selectedValuesSet = React.useRef(new Set(selectedValues));
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    React.useEffect(() => {
      setSelectedValues(defaultValue || []);
      selectedValuesSet.current = new Set(defaultValue);
    }, [defaultValue]);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        selectedValues.pop();
        setSelectedValues([...selectedValues]);
        selectedValuesSet.current.delete(
          selectedValues[selectedValues.length - 1],
        );
        onValueChange([...selectedValues]);
      }
    };

    const toggleOption = (value: string) => {
      if (selectedValuesSet.current.has(value)) {
        selectedValuesSet.current.delete(value);
        setSelectedValues(selectedValues.filter((v) => v !== value));
      } else {
        selectedValuesSet.current.add(value);
        setSelectedValues([...selectedValues, value]);
      }
      onValueChange(Array.from(selectedValuesSet.current));
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 hover:bg-card"
          >
            <div className="text-fg-quinary">{iconLeft}</div>
            {selectedValues.length >= 1 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center">
                  {selectedValues.map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        key={value}
                        className={cn(
                          "rounded-sm",
                          multiSelectVariants({ variant, className }),
                        )}
                      >
                        {IconComponent && (
                          <IconComponent className="mr-2 size-4" />
                        )}
                        {option?.label}
                        <XIcon
                          className="ml-2 size-3 cursor-pointer text-fg-quinary"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Badge>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="h-4 cursor-pointer text-fg-quinary"
                    onClick={(event) => {
                      setSelectedValues([]);
                      selectedValuesSet.current.clear();
                      onValueChange([]);
                      event.stopPropagation();
                    }}
                  />

                  <ChevronDown className="h-4 cursor-pointer text-fg-quinary" />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full items-center justify-between">
                <span className="mx-3 text-sm text-text-placeholder">
                  {placeholder}
                </span>
                <ChevronDown className="mx-2 h-4 cursor-pointer text-fg-quinary" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        {helperText && (
          <p className="text-xs text-text-tertiary">{helperText}</p>
        )}

        <PopoverContent
          className={cn("p-0 drop-shadow-sm", popoverClassName)}
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command className="w-full">
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValuesSet.current.has(
                    option.value,
                  );
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      style={{
                        pointerEvents: "auto",
                        opacity: 1,
                      }}
                      className={cn(
                        "flex cursor-pointer flex-row justify-between hover:bg-bg-active",
                        { "bg-bg-active": isSelected },
                      )}
                    >
                      <span className="flex flex-row">
                        {option.icon && (
                          <option.icon className="mr-1 size-4 text-fg-quinary" />
                        )}
                        <span>{option.label}</span>
                      </span>
                      {isSelected && <CheckIcon className="size-4" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <CommandItem
                      onSelect={() => {
                        setSelectedValues([]);
                        selectedValuesSet.current.clear();
                        onValueChange([]);
                      }}
                      style={{
                        pointerEvents: "auto",
                        opacity: 1,
                      }}
                      className="flex-1 cursor-pointer justify-center"
                    >
                      Clear
                    </CommandItem>
                  )}
                  <CommandSeparator />
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    style={{
                      pointerEvents: "auto",
                      opacity: 1,
                    }}
                    className="flex-1 cursor-pointer justify-center"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
