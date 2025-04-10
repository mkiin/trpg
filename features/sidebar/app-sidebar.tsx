"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { AppIcon, PlusIcon, UserSettingsIcon } from "@/components/icons";

import { SidebarToggle } from "./sidebar-toggle";

import React from "react";
import { NavMain } from "./nav-main";

const items = [
  {
    title: "CharacterSheet",
    url: "/character-sheet",
    icon: UserSettingsIcon,
  },
];

function PureAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-between items-center w-full space-x-2">
          <div className="h-8 w-8 flex-shrink-0">
            <AppIcon />
          </div>
          <div className="group-[[data-state=collapsed]]:opacity-0 h-8 w-8">
            <SidebarToggle className="h-8 w-8" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
        <SidebarSeparator />
        {/* <SidebarGroup>
          <SidebarGroupLabel>最新のチャット</SidebarGroupLabel>
        </SidebarGroup> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export const AppSidebar = React.memo(PureAppSidebar);
