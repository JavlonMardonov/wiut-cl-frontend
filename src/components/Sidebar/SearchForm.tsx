import { t } from "i18next";

import { Label } from "@/components/_form/Label";
import { SidebarInput } from "@/components/Sidebar";

import { SearchIcon } from "../../assets/icons/Search";
import { Badge } from "../Badge";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          {t("search", { ns: "commons" })}
        </Label>
        <SidebarInput
          iconLeft={
            <SearchIcon className="pointer-events-none size-4 select-none text-fg-quaternary" />
          }
          iconRight={
            <Badge
              variant="outline"
              className="pointer-events-none rounded-xs px-0.5 py-[1px] text-xs"
            >
              ⌘K
            </Badge>
          }
          id="search"
          placeholder={t("search", { ns: "commons" })}
          className="h-10 rounded-md text-md"
        />
      </div>
    </form>
  );
}
