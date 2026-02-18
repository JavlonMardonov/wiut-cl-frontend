import { cva } from "class-variance-authority";
import { FC } from "react";

import { cn } from "@/lib/utils";

const titleVariants = cva("", {
  defaultVariants: {
    size: "default",
  },
  variants: {
    size: {
      default: "text-md",
      lg: "text-xl",
      md: "text-lg",
    },
  },
});

const descriptionVariants = cva("", {
  defaultVariants: {
    size: "default",
  },
  variants: {
    size: {
      default: "text-sm mt-1",
      lg: "text-md mt-2",
      md: "text-sm mt-2",
    },
  },
});

interface EmptyProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  showDescription?: boolean;
  className?: string;
  size?: "default" | "md" | "lg";
}
export const Empty: FC<EmptyProps> = ({
  icon,
  title,
  description,
  className,
  showDescription = true,
  size,
}) => {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {icon === undefined ? <img src="/not-found.svg" alt="not-found" /> : icon}
      <p className={cn("mt-4 font-semibold", titleVariants({ size }))}>
        {title === undefined ? "Not Found" : title}
      </p>
      {showDescription === true && (
        <p className={cn("text-text-tertiary", descriptionVariants({ size }))}>
          {description === undefined
            ? "Your search “Landing page design” did not match any projects. Please try again.!"
            : description}
        </p>
      )}
    </div>
  );
};
