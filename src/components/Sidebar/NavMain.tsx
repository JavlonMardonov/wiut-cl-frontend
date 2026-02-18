import React from "react";

import { Collapsible } from "@/components/Collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/Sidebar";

import { cn } from "../../lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: React.ComponentType;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn("", {
                  "roudned-none border-[1px] border-border-brand-alt shadow-md":
                    item.isActive,
                })}
              >
                <a
                  href={item.url}
                  className={cn("", {
                    "border-1 bg-primary text-white": item.isActive,
                  })}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
