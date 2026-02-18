import { Toaster as Sonner } from "sonner";

import { useTheme } from "@/providers/ThemeProvider";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          description: "group-[.toast]:text-muted-foreground",
          error: "!bg-bg-error-solid border-transparent",
          info: "!bg-[#36BFFA] border-transparent",
          success: "!bg-bg-success-solid border-transparent",
          toast:
            "group toast !text-text-white group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          warning: "!bg-bg-warning-solid border-transparent",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
